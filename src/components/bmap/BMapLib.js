/**
 * @fileoverview 百度地图的轨迹跟随类，对外开放。
 * 用户可以在地图上自定义轨迹运动
 * 可以自定义路过某个点的图片，文字介绍等。
 * 主入口类是<a href="symbols/BMapLib.LuShu.html">LuShu</a>，
 * 基于Baidu Map API 1.2。.
 *
 * @author Baidu Map Api Group
 * @version 1.2
 */

/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};

(function() {
  //声明baidu包
  var T, baidu = T = baidu || { version: '1.5.0' };
  baidu.guid = '$BAIDU$';
  //以下方法为百度Tangram框架中的方法，请到http://tangram.baidu.com 查看文档
  (function() {
    window[baidu.guid] = window[baidu.guid] || {};
    baidu.dom = baidu.dom || {};
    baidu.dom.g = function(id) {
      if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
      } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
      }
      return null;
    };
    baidu.g = baidu.G = baidu.dom.g;
    baidu.lang = baidu.lang || {};
    baidu.lang.isString = function(source) {
      return '[object String]' == Object.prototype.toString.call(source);
    };
    baidu.isString = baidu.lang.isString;
    baidu.dom._g = function(id) {
      if (baidu.lang.isString(id)) {
        return document.getElementById(id);
      }
      return id;
    };
    baidu._g = baidu.dom._g;
    baidu.dom.getDocument = function(element) {
      element = baidu.dom.g(element);
      return element.nodeType == 9 ? element : element.ownerDocument || element.document;
    };
    baidu.browser = baidu.browser || {};
    baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp['\x241']) : undefined;
    baidu.dom.getComputedStyle = function(element, key) {
      element = baidu.dom._g(element);
      var doc = baidu.dom.getDocument(element),
        styles;
      if (doc.defaultView && doc.defaultView.getComputedStyle) {
        styles = doc.defaultView.getComputedStyle(element, null);
        if (styles) {
          return styles[key] || styles.getPropertyValue(key);
        }
      }
      return '';
    };
    baidu.dom._styleFixer = baidu.dom._styleFixer || {};
    baidu.dom._styleFilter = baidu.dom._styleFilter || [];
    baidu.dom._styleFilter.filter = function(key, value, method) {
      for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
        if (filter = filter[method]) {
          value = filter(key, value);
        }
      }
      return value;
    };
    baidu.string = baidu.string || {};


    baidu.string.toCamelCase = function(source) {

      if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
        return source;
      }
      return source.replace(/[-_][^-_]/g, function(match) {
        return match.charAt(1).toUpperCase();
      });
    };
    baidu.dom.getStyle = function(element, key) {
      var dom = baidu.dom;
      element = dom.g(element);
      key = baidu.string.toCamelCase(key);

      var value = element.style[key] ||
        (element.currentStyle ? element.currentStyle[key] : '') ||
        dom.getComputedStyle(element, key);

      if (!value) {
        var fixer = dom._styleFixer[key];
        if (fixer) {
          value = fixer.get ? fixer.get(element) : baidu.dom.getStyle(element, fixer);
        }
      }

      if (fixer = dom._styleFilter) {
        value = fixer.filter(key, value, 'get');
      }
      return value;
    };
    baidu.getStyle = baidu.dom.getStyle;
    baidu.dom._NAME_ATTRS = (function() {
      var result = {
        'cellpadding': 'cellPadding',
        'cellspacing': 'cellSpacing',
        'colspan': 'colSpan',
        'rowspan': 'rowSpan',
        'valign': 'vAlign',
        'usemap': 'useMap',
        'frameborder': 'frameBorder'
      };

      if (baidu.browser.ie < 8) {
        result['for'] = 'htmlFor';
        result['class'] = 'className';
      } else {
        result['htmlFor'] = 'for';
        result['className'] = 'class';
      }

      return result;
    })();
    baidu.dom.setAttr = function(element, key, value) {
      element = baidu.dom.g(element);
      if ('style' == key) {
        element.style.cssText = value;
      } else {
        key = baidu.dom._NAME_ATTRS[key] || key;
        element.setAttribute(key, value);
      }
      return element;
    };
    baidu.setAttr = baidu.dom.setAttr;
    baidu.dom.setAttrs = function(element, attributes) {
      element = baidu.dom.g(element);
      for (var key in attributes) {
        baidu.dom.setAttr(element, key, attributes[key]);
      }
      return element;
    };
    baidu.setAttrs = baidu.dom.setAttrs;
    baidu.dom.create = function(tagName, opt_attributes) {
      var el = document.createElement(tagName),
        attributes = opt_attributes || {};
      return baidu.dom.setAttrs(el, attributes);
    };
    baidu.object = baidu.object || {};
    baidu.extend =
      baidu.object.extend = function(target, source) {
        for (var p in source) {
          if (source.hasOwnProperty(p)) {
            target[p] = source[p];
          }
        }
        return target;
      };
  })();

  /**
   * @exports LuShu as BMapLib.LuShu
   */
  var LuShu =
    /**
     * LuShu类的构造函数
     * @class LuShu <b>入口</b>。
     * 实例化该类后，可调用,start,end,pause等方法控制覆盖物的运动。

     * @constructor
         * @param {Map} map Baidu map的实例对象.
         * @param {Array} path 构成路线的point的数组.
         * @param {Json Object} opts 可选的输入参数，非必填项。可输入选项包括：<br />
         * {<br />"<b>landmarkPois</b>" : {Array} 要在覆盖物移动过程中，显示的特殊点。格式如下:landmarkPois:[<br />
         *      {lng:116.314782,lat:39.913508,html:'加油站',pauseTime:2},<br />
         *      {lng:116.315391,lat:39.964429,html:'高速公路收费站,pauseTime:3}]<br />
         * <br />"<b>icon</b>" : {Icon} 覆盖物的icon,
         * <br />"<b>speed</b>" : {Number} 覆盖物移动速度，单位米/秒    <br />
         * <br />"<b>defaultContent</b>" : {String} 覆盖物中的内容    <br />
         * }<br />.
         * @example <b>参考示例：</b><br />
         * var lushu = new BMapLib.LuShu(map,arrPois,{defaultContent:"从北京到天津",landmarkPois:[]});
     */
    BMapLib.LuShu = function(map, path, opts) {
      if (!path || path.length < 1) {
        return;
      }
      this._map = map;
      //存储一条路线
      this._path = path;
      //移动到当前点的索引
      this.i = 0;
      //控制暂停后开始移动的队列的数组
      this._setTimeoutQuene = [];
      //进行坐标转换的类
      this._projection = this._map.getMapType().getProjection();
      this._opts = {
        icon: null,
        //默认速度 米/秒
        speed: 4000,
        defaultContent: ''
      };
      this._setOptions(opts);
      this._rotation = 0; //小车转动的角度

      //如果不是默认实例，则使用默认的icon
      if (!this._opts.icon instanceof BMap.Icon) {
        this._opts.icon = defaultIcon;
      }
    }
  /**
   * 根据用户输入的opts，修改默认参数_opts
   * @param {Json Object} opts 用户输入的修改参数.
   * @return 无返回值.
   */
  LuShu.prototype._setOptions = function(opts) {
    if (!opts) {
      return;
    }
    for (var p in opts) {
      if (opts.hasOwnProperty(p)) {
        this._opts[p] = opts[p];
      }
    }
  }

  /**
   * @description 开始运动
   * @param none
   * @return 无返回值.
   *
   * @example <b>参考示例：</b><br />
   * lushu.start();
   */
  LuShu.prototype.start = function(f) {
      var me = this,
        len = me._path.length;
      //不是第一次点击开始,并且小车还没到达终点
      if (me.i && me.i < len - 1) {
        //没按pause再按start不做处理
        if (!me._fromPause) {
          return;
        } else if (!me._fromStop) {
          //按了pause按钮,并且再按start，直接移动到下一点
          //并且此过程中，没有按stop按钮
          //防止先stop，再pause，然后连续不停的start的异常
          me._moveNext(++me.i, f);
        }
      } else {
        //第一次点击开始，或者点了stop之后点开始
        me._addMarker();
        //等待marker动画完毕再加载infowindow
        me._timeoutFlag = setTimeout(function() {
          me._addInfoWin();
          if (me._opts.defaultContent == "") {
            me.hideInfoWindow();
          }
          me._moveNext(me.i, f);
        }, 400);
      }
      //重置状态
      this._fromPause = false;
      this._fromStop = false;
    },
    /**
     * 结束运动
     * @return 无返回值.
     *
     * @example <b>参考示例：</b><br />
     * lushu.stop();
     */
    LuShu.prototype.stop = function(f) {
      var me = this;
      me.i = 0;
      me._fromStop = true;
      clearInterval(me._intervalFlag);
      me._clearTimeout();
      //重置landmark里边的poi为未显示状态
      for (var i = 0, t = me._opts.landmarkPois, len = t.length; i < len; i++) {
        t[i].bShow = false;
      }
      f ? f() : ''
    };
  /**
   * 暂停运动
   * @return 无返回值.
   */
  LuShu.prototype.pause = function() {
    clearInterval(this._intervalFlag);

    //标识是否是按过pause按钮
    this._fromPause = true;
    this._clearTimeout();
  };
  /**
   * 隐藏上方overlay
   * @return 无返回值.
   *
   * @example <b>参考示例：</b><br />
   * lushu.hideInfoWindow();
   */
  LuShu.prototype.hideInfoWindow = function() {
    this._overlay._div.style.visibility = 'hidden';
  };
  /**
   * 显示上方overlay
   * @return 无返回值.
   *
   * @example <b>参考示例：</b><br />
   * lushu.showInfoWindow();
   */
  LuShu.prototype.showInfoWindow = function() {
    this._overlay._div.style.visibility = 'visible';
  };
  //Lushu私有方法
  baidu.object.extend(LuShu.prototype, {
    /**
     * 添加marker到地图上
     * @param {Function} 回调函数.
     * @return 无返回值.
     */
    _addMarker: function(callback) {
      if (this._marker) {
        this.stop();
        this._map.removeOverlay(this._marker);
        clearTimeout(this._timeoutFlag);
      }
      //移除之前的overlay
      this._overlay && this._map.removeOverlay(this._overlay);
      var marker = new BMap.Marker(this._path[0]);
      this._opts.icon && marker.setIcon(this._opts.icon);
      marker.setOffset({ width: 0, height: marker.getIcon().size.height / 2 })
      this._map.addOverlay(marker);
      marker.setAnimation(BMAP_ANIMATION_DROP);
      this._marker = marker;
    },
    /**
     * 添加上方overlay
     * @return 无返回值.
     */
    _addInfoWin: function() {
      var me = this;
      //if(me._opts.defaultContent!== ""){
      var overlay = new CustomOverlay(me._marker.getPosition(), me._opts.defaultContent);

      //将当前类的引用传给overlay。
      overlay.setRelatedClass(this);
      this._overlay = overlay;
      this._map.addOverlay(overlay);

      //}

    },
    /**
     * 获取墨卡托坐标
     * @param {Point} poi 经纬度坐标.
     * @return 无返回值.
     */
    _getMercator: function(poi) {
      return this._map.getMapType().getProjection().lngLatToPoint(poi);
    },
    /**
     * 计算两点间的距离
     * @param {Point} poi 经纬度坐标A点.
     * @param {Point} poi 经纬度坐标B点.
     * @return 无返回值.
     */
    _getDistance: function(pxA, pxB) {
      return Math.sqrt(Math.pow(pxA.x - pxB.x, 2) + Math.pow(pxA.y - pxB.y, 2));
    },
    //目标点的  当前的步长,position,总的步长,动画效果,回调
    /**
     * 移动小车
     * @param {Number} poi 当前的步长.
     * @param {Point} initPos 经纬度坐标初始点.
     * @param {Point} targetPos 经纬度坐标目标点.
     * @param {Function} effect 缓动效果.
     * @return 无返回值.
     */
    _move: function(initPos, targetPos, effect, f) {
      var me = this,
        //当前的帧数
        currentCount = 0,
        //步长，米/秒
        timer = 10,
        step = this._opts.speed / (1000 / timer),
        //初始坐标
        init_pos = this._projection.lngLatToPoint(initPos),
        //获取结束点的(x,y)坐标
        target_pos = this._projection.lngLatToPoint(targetPos),
        //总的步长
        count = Math.round(me._getDistance(init_pos, target_pos) / step);

      //如果小于1直接移动到下一点
      if (count < 1) {
        me._moveNext(++me.i, f);
        return;
      }
      //两点之间匀速移动
      me._intervalFlag = setInterval(function() {
        //两点之间当前帧数大于总帧数的时候，则说明已经完成移动
        if (currentCount >= count) {
          clearInterval(me._intervalFlag);
          //移动的点已经超过总的长度
          if (me.i > me._path.length) {
            return;
          }
          //运行下一个点
          me._moveNext(++me.i, f);
        } else {
          currentCount++;
          var x = effect(init_pos.x, target_pos.x, currentCount, count),
            y = effect(init_pos.y, target_pos.y, currentCount, count),
            pos = me._projection.pointToLngLat(new BMap.Pixel(x, y));
          //设置marker
          if (currentCount == 1) {
            var proPos = null;
            if (me.i - 1 >= 0) {
              proPos = me._path[me.i - 1];
            }
            if (me._opts.enableRotation == true) {
              me.setRotation(proPos, initPos, targetPos);
            }
            if (me._opts.autoView) {
              if (!me._map.getBounds().containsPoint(pos)) {
                me._map.setCenter(pos);
              }
            }
          }
          //正在移动

          me._marker.setPosition(pos);
          //设置自定义overlay的位置
          me._setInfoWin(pos);

        }
      }, timer);
    },
    /**
     *在每个点的真实步骤中设置小车转动的角度
     *轨迹有待优化
     */
    setRotation: function(prePos, curPos, targetPos) {
      var me = this;
      var deg = 0;
      //start!
      curPos = me._map.pointToPixel(curPos);
      targetPos = me._map.pointToPixel(targetPos);

      if (targetPos.x != curPos.x) {
        var tan = (targetPos.y - curPos.y) / (targetPos.x - curPos.x),
          atan = Math.atan(tan);
        deg = atan * 360 / (2 * Math.PI);
        //degree  correction;
        if (targetPos.x < curPos.x) {
          deg = -deg + 90 + 90;

        } else {
          deg = -deg;
        }
        me._marker.setRotation(-deg)
      } else {
        var disy = targetPos.y - curPos.y;
        var bias = 0;
        if (disy > 0)
          bias = -1
        else
          bias = 1
        me._marker.setRotation(-bias * 90);
      }
      return;

    },

    linePixellength: function(from, to) {
      return Math.sqrt(Math.abs(from.x - to.x) * Math.abs(from.x - to.x) + Math.abs(from.y - to.y) * Math.abs(from.y - to.y));

    },
    pointToPoint: function(from, to) {
      return Math.abs(from.x - to.x) * Math.abs(from.x - to.x) + Math.abs(from.y - to.y) * Math.abs(from.y - to.y)

    },
    /**
     * 移动到下一个点
     * @param {Number} index 当前点的索引.
     * @return 无返回值.
     */
    _moveNext: function(index, f) {
      var me = this;
      if (index < this._path.length - 1) {
        me._move(me._path[index], me._path[index + 1], me._tween.linear, f);
      } else {
        f ? f() : ''
      }
    },
    /**
     * 设置小车上方infowindow的内容，位置等
     * @param {Point} pos 经纬度坐标点.
     * @return 无返回值.
     */
    _setInfoWin: function(pos) {
      //设置上方overlay的position
      var me = this;
      if (!me._overlay) {
        return;
      }
      me._overlay.setPosition(pos, me._marker.getIcon().size);
      var index = me._troughPointIndex(pos);
      if (index != -1) {
        clearInterval(me._intervalFlag);
        me._overlay.setHtml(me._opts.landmarkPois[index].html);
        me._overlay.setPosition(pos, me._marker.getIcon().size);
        me._pauseForView(index);
      } else {
        me._overlay.setHtml(me._opts.defaultContent);
      }
    },
    /**
     * 在某个点暂停的时间
     * @param {Number} index 点的索引.
     * @return 无返回值.
     */
    _pauseForView: function(index) {
      var me = this;
      var t = setTimeout(function() {
        //运行下一个点
        me._moveNext(++me.i);
      }, me._opts.landmarkPois[index].pauseTime * 1000);
      me._setTimeoutQuene.push(t);
    },
    //清除暂停后再开始运行的timeout
    _clearTimeout: function() {
      for (var i in this._setTimeoutQuene) {
        clearTimeout(this._setTimeoutQuene[i]);
      }
      this._setTimeoutQuene.length = 0;
    },
    //缓动效果
    _tween: {
      //初始坐标，目标坐标，当前的步长，总的步长
      linear: function(initPos, targetPos, currentCount, count) {
        var b = initPos,
          c = targetPos - initPos,
          t = currentCount,
          d = count;
        return c * t / d + b;
      }
    },

    /**
     * 否经过某个点的index
     * @param {Point} markerPoi 当前小车的坐标点.
     * @return 无返回值.
     */
    _troughPointIndex: function(markerPoi) {
      var t = this._opts.landmarkPois,
        distance;
      for (var i = 0, len = t.length; i < len; i++) {
        //landmarkPois中的点没有出现过的话
        if (!t[i].bShow) {
          distance = this._map.getDistance(new BMap.Point(t[i].lng, t[i].lat), markerPoi);
          //两点距离小于10米，认为是同一个点
          if (distance < 10) {
            t[i].bShow = true;
            return i;
          }
        }
      }
      return -1;
    }
  });
  /**
   * 自定义的overlay，显示在小车的上方
   * @param {Point} Point 要定位的点.
   * @param {String} html overlay中要显示的东西.
   * @return 无返回值.
   */
  function CustomOverlay(point, html) {
    this._point = point;
    this._html = html;
  }
  CustomOverlay.prototype = new BMap.Overlay();
  CustomOverlay.prototype.initialize = function(map) {
    var div = this._div = baidu.dom.create('div', { style: 'border:solid 1px #ccc;width:auto;min-width:50px;text-align:center;position:absolute;background:#fff;color:#000;font-size:12px;border-radius: 10px;padding:5px;white-space: nowrap;' });
    div.innerHTML = this._html;
    map.getPanes().floatPane.appendChild(div);
    this._map = map;
    return div;
  }
  CustomOverlay.prototype.draw = function() {
    this.setPosition(this.lushuMain._marker.getPosition(), this.lushuMain._marker.getIcon().size);
  }
  baidu.object.extend(CustomOverlay.prototype, {
    //设置overlay的position
    setPosition: function(poi, markerSize) {
      // 此处的bug已修复，感谢 苗冬(diligentcat@gmail.com) 的细心查看和认真指出
      var px = this._map.pointToOverlayPixel(poi),
        styleW = baidu.dom.getStyle(this._div, 'width'),
        styleH = baidu.dom.getStyle(this._div, 'height');
      var overlayW = parseInt(this._div.clientWidth || styleW, 10),
        overlayH = parseInt(this._div.clientHeight || styleH, 10);
      this._div.style.left = px.x - overlayW / 2 + 'px';
      this._div.style.bottom = -(px.y - markerSize.height) + 'px';
    },
    //设置overlay的内容
    setHtml: function(html) {
      this._div.innerHTML = html;
    },
    //跟customoverlay相关的实例的引用
    setRelatedClass: function(lushuMain) {
      this.lushuMain = lushuMain;
    }
  });
})();


(function() {
  /**
   * BMAP_ZOOM_IN 拉框后执行放大操作
   * @type {int}
   */
  var BMAP_ZOOM_IN = 0;

  /**
   * BMAP_ZOOM_OUT 拉框后执行缩小操作
   * @type {int}
   */
  var BMAP_ZOOM_OUT = 1;

  /** 
   * @exports RectangleZoom as BMapLib.RectangleZoom 
   */
  var RectangleZoom =
    /**
     * RectangleZoom类的构造函数
     * @class 拉框缩放类，实现拉框缩放效果的<b>入口</b>。
     * 实例化该类后，即可调用该类提供的open
     * 方法开启拉框缩放状态。
     * 
     * @constructor
     * @param {Map} map Baidu map的实例对象
     * @param {Json Object} opts 可选的输入参数，非必填项。可输入选项包括：<br />
     * {"<b>zoomType</b>" : {Number} 拉框后放大还是缩小的设置,
     * <br />"<b>followText</b>" : {String} 开启拉框缩放状态后，鼠标跟随的文字,
     * <br />"<b>strokeWeight</b>" : {Number} 遮盖层外框的线宽,
     * <br />"<b>strokeColor</b>" : {String} 遮盖层外框的颜色,
     * <br />"<b>style</b>" : {String} 遮盖层外框的样式,
     * <br />"<b>opacity</b>" : {Number} 遮盖层的透明度,
     * <br />"<b>cursor</b>" : {String} 鼠标样式,
     * <br />"<b>autoClose</b>" : {Boolean} 是否在每次操作后，自动关闭拉框缩放状态}
     *
     * @example <b>参考示例：</b><br />
     * var map = new BMap.Map("container");<br />map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);<br />var myRectangleZoomObject = new BMapLib.RectangleZoom(map, {strokeWeight : 2});
     */
    BMapLib.RectangleZoom = function(map, opts) {
      if (!map) {
        return;
      }

      /**
       * map对象
       * @private
       * @type {Map}
       */
      this._map = map;

      /**
       * 各种状态的默认参数
       * @private
       * @param {Json Object} 
       */
      this._opts = {
        // 拉框后放大还是缩小的设置
        zoomType: BMAP_ZOOM_IN,
        // 开启拉框缩放状态后，鼠标跟随的文字
        followText: "",
        // 遮盖层外框的线宽
        strokeWeight: 2,
        // 遮盖层外框的颜色
        strokeColor: "#111",
        // 遮盖层外框的样式
        style: "solid",
        // 遮盖层的填充色
        fillColor: "#ccc",
        // 遮盖层的透明度
        opacity: 0.4,
        // 鼠标样式
        cursor: "crosshair",
        // 是否在每次操作后，自动关闭拉框缩放状态
        autoClose: false
      };

      // 通过使用者输入的opts，修改这些默认参数
      this._setOptions(opts);

      // 验证参数正确性
      this._opts.strokeWeight =
        this._opts.strokeWeight <= 0 ?
        1 :
        this._opts.strokeWeight;

      this._opts.opacity =
        this._opts.opacity < 0 ?
        0 :
        this._opts.opacity > 1 ?
        1 :
        this._opts.opacity;

      if (this._opts.zoomType < BMAP_ZOOM_IN ||
        this._opts.zoomType > BMAP_ZOOM_OUT) {
        this._opts.zoomType = BMAP_ZOOM_IN;
      }

      /**
       * 当前是否开启拉框缩放状态；默认为false，表示没有开启
       * @private
       * @type {Boolean} 
       */
      this._isOpen = false;

      /**
       * 拉框时显示的矩形遮盖层
       * @private
       * @type {HTMLElement}
       */
      this._fDiv = null;

      /**
       * 鼠标跟随的文字提示框
       * @private
       * @type {BMap.Label}
       */
      this._followTitle = null;
    }

  /**
   * 根据用户输入的opts，修改默认参数_opts
   * @param {Json Object} opts 用户输入的修改参数
   * @return 无返回值
   */
  RectangleZoom.prototype._setOptions = function(opts) {
    if (!opts) {
      return;
    }
    for (var p in opts) {
      if (typeof(opts[p]) != "undefined") {
        this._opts[p] = opts[p];
      }
    }
  };

  /**
   * 设置线颜色
   * @param {String} color 设置的遮盖层外框线色
   * @return 无返回值
   *
   * @example <b>参考示例：</b><br />
   * myRectangleZoomObject.setStrokeColor("#fff");
   */
  RectangleZoom.prototype.setStrokeColor = function(color) {
    if (typeof color == "string") {
      this._opts.strokeColor = color;
      this._updateStyle();
    }
  };

  /**
   * 设置线粗细
   * @param {Number} width 设置的遮盖层外框线宽
   * @return 无返回值
   *
   * @example <b>参考示例：</b><br />
   * myRectangleZoomObject.setLineStroke(3);
   */
  RectangleZoom.prototype.setLineStroke = function(width) {
    if (typeof width == "number" && Math.round(width) > 0) {
      this._opts.strokeWeight = Math.round(width);
      this._updateStyle();
    }
  };

  /**
   * 设置线样式
   * @param {String} style 设置的遮盖层外框样式
   * @return 无返回值
   *
   * @example <b>参考示例：</b><br />
   * myRectangleZoomObject.setLineStyle("dashed");
   */
  RectangleZoom.prototype.setLineStyle = function(style) {
    if (style == "solid" || style == "dashed") {
      this._opts.style = style;
      this._updateStyle();
    }
  };

  /**
   * 设置透明度
   * @param {Number} opacity 设置的遮盖层透明度
   * @return 无返回值
   *
   * @example <b>参考示例：</b><br />
   * myRectangleZoomObject.setOpacity(0.5);
   */
  RectangleZoom.prototype.setOpacity = function(opacity) {
    if (typeof opacity == "number" &&
      opacity >= 0 &&
      opacity <= 1) {
      this._opts.opacity = opacity;
      this._updateStyle();
    }
  };

  /**
   * 设置填充色
   * @param {String} color 设置的遮盖层填充色
   * @return 无返回值
   *
   * @example <b>参考示例：</b><br />
   * myRectangleZoomObject.setFillColor("#F0F");
   */
  RectangleZoom.prototype.setFillColor = function(color) {
    this._opts.fillColor = color;
    this._updateStyle();
  };

  /**
   * 设置鼠标样式
   * @param {String} cursor 设置的鼠标样式
   * @return 无返回值
   *
   * @example <b>参考示例：</b><br />
   * myRectangleZoomObject.setCursor("crosshair");
   */
  RectangleZoom.prototype.setCursor = function(cursor) {
    this._opts.cursor = cursor;
    // 设置鼠标样式
    OperationMask.setCursor(this._opts.cursor);
  };

  /**
   * 根据配置信息更新样式
   * @return 无返回值
   */
  RectangleZoom.prototype._updateStyle = function() {
    if (this._fDiv) {
      this._fDiv.style.border = [this._opts.strokeWeight,
        "px ",
        this._opts.style,
        " ",
        this._opts.color
      ].join("");

      // 设置不同环境下的透明度
      var st = this._fDiv.style,
        op = this._opts.opacity;
      st.opacity = op;
      st.MozOpacity = op;
      st.KhtmlOpacity = op;
      st.filter = "alpha(opacity=" + (op * 100) + ")";
    }
  };

  /**
   * 获取鼠标样式
   * @return 鼠标样式
   *
   * @example <b>参考示例：</b><br />
   * myRectangleZoomObject.getCursor();
   */
  RectangleZoom.prototype.getCursor = function() {
    return this._opts.cursor;
  };

  /**
   * 控件项的事件绑定
   * @return 无返回值
   */
  RectangleZoom.prototype._bind = function() {
    // 设置鼠标样式
    this.setCursor(this._opts.cursor);
    var me = this;
    // 在装载地图的页面元素上，绑定鼠标移动事件
    addEvent(this._map.getContainer(), "mousemove", function(e) {
      if (!me._isOpen) {
        return;
      }
      if (!me._followTitle) {
        return;
      }
      e = window.event || e;
      var t = e.target || e.srcElement;
      // 如果触发该事件的页面元素不是遮盖效果层，则返回，无操作
      if (t != OperationMask.getDom(me._map)) {
        me._followTitle.hide();
        return;
      }
      if (!me._mapMoving) {
        me._followTitle.show();
      }
      // 设置鼠标移动过程中，跟随的文字提示框的位置
      var pt = OperationMask.getDrawPoint(e, true);
      me._followTitle.setPosition(pt);
    });
    // 创建鼠标跟随的文字提示框
    if (this._opts.followText) {
      var t = this._followTitle = new BMap.Label(this._opts.followText, { offset: new BMap.Size(14, 16) });
      this._followTitle.setStyles({ color: "#333", borderColor: "#ff0103" });
    }
  };

  /**
   * 开启拉框缩放状态。
   * 在缩放效果结束的时候，会调用Animation库(见源文件，闭包，不对外开放)
   * 来实现一些小动画
   * @return 成功开启拉框缩放状态时，返回true；否则无返回值
   *
   * @example <b>参考示例：</b><br />
   * myRectangleZoomObject.open();
   */
  RectangleZoom.prototype.open = function() {
    // 判断拉框缩放状态是否已经开启
    if (this._isOpen == true) {
      return true;
    }
    // 已有其他地图上的鼠标操作工具开启
    if (!!BMapLib._toolInUse) {
      return;
    }
    this._isOpen = true;
    BMapLib._toolInUse = true;

    // 增加鼠标在地图区域移动的事件
    // 通过binded参数，避免多次绑定
    if (!this.binded) {
      this._bind();
      this.binded = true;
    }

    // 将文字提示框作为BMap.Label元素，提交给Map Api进行管理
    if (this._followTitle) {
      this._map.addOverlay(this._followTitle);
      this._followTitle.hide();
    }

    var me = this;
    var map = this._map;
    // 返回IE版本号
    var ieVersion = 0;
    if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
      ieVersion = document.documentMode || +RegExp['\x241']
    }

    // 开启拉框缩放状态后，鼠标在地图上按下时的操作
    var beginDrawRect = function(e) {
      // 由于在IE和非IE浏览器下，e对象对鼠标按下键的返回值不一样
      // 所以需要分两种情况判断，当不是鼠标左键时，返回无操作
      e = window.event || e;
      if (e.button != 0 &&
        !ieVersion ||
        ieVersion &&
        e.button != 1) {
        return;
      }

      // 增加IE浏览器下对事件的捕获
      if (!!ieVersion && OperationMask.getDom(map).setCapture) {
        OperationMask.getDom(map).setCapture();
      }

      if (!me._isOpen) {
        return;
      }
      me._bind.isZooming = true;

      // 添加拖拽鼠标画框时，鼠标移动事件，和鼠标弹起事件
      addEvent(document, "mousemove", drawingRect);
      addEvent(document, "mouseup", endDrawRect);

      // 记录此时鼠标相关位置
      me._bind.mx = e.layerX || e.offsetX || 0;
      me._bind.my = e.layerY || e.offsetY || 0;
      me._bind.ix = e.pageX || e.clientX || 0;
      me._bind.iy = e.pageY || e.clientY || 0;

      // 创建矩形半透明效果框
      insertHTML(OperationMask.getDom(map), "beforeBegin", me._generateHTML());
      me._fDiv = OperationMask.getDom(map).previousSibling;

      me._fDiv.style.width = "0";
      me._fDiv.style.height = "0";
      me._fDiv.style.left = me._bind.mx + "px";
      me._fDiv.style.top = me._bind.my + "px";

      // 停止事件冒泡传播和默认事件
      stopBubble(e);
      return preventDefault(e);
    };

    // 开启拉框缩放状态后，鼠标在地图上按下、并拖拽时的操作
    var drawingRect = function(e) {
      if (me._isOpen == true && me._bind.isZooming == true) {
        // 通过鼠标当前所在位置，计算矩形半透明效果框的高宽
        var e = window.event || e;
        var curX = e.pageX || e.clientX || 0;
        var curY = e.pageY || e.clientY || 0;
        var dx = me._bind.dx = curX - me._bind.ix;
        var dy = me._bind.dy = curY - me._bind.iy;
        var tw = Math.abs(dx) - me._opts.strokeWeight;
        var th = Math.abs(dy) - me._opts.strokeWeight;
        me._fDiv.style.width = (tw < 0 ? 0 : tw) + "px";
        me._fDiv.style.height = (th < 0 ? 0 : th) + "px";

        // 计算矩形半透明效果框所在位置
        var mapSize = [map.getSize().width, map.getSize().height];
        // 当dx小于0的时候，也就是绘制中的点位置，在水平方向上，比起始点更靠左
        // 说明，此时用户在从右往左绘制矩形框
        // 需要对矩形的右边距进行计算，与普通状况下的计算左边距，有所不同
        if (dx >= 0) {
          me._fDiv.style.right = "auto";
          me._fDiv.style.left = me._bind.mx + "px";
          if (me._bind.mx + dx >= mapSize[0] - 2 * me._opts.strokeWeight) {
            me._fDiv.style.width = mapSize[0] - me._bind.mx - 2 * me._opts.strokeWeight + "px";
            me._followTitle && me._followTitle.hide();
          }
        } else {
          me._fDiv.style.left = "auto";
          me._fDiv.style.right = mapSize[0] - me._bind.mx + "px";
          if (me._bind.mx + dx <= 2 * me._opts.strokeWeight) {
            me._fDiv.style.width = me._bind.mx - 2 * me._opts.strokeWeight + "px";
            me._followTitle && me._followTitle.hide();
          }
        }
        // 当dy小于0的时候，也就是绘制中的点位置，在垂直方向上，比起始点更靠上
        // 说明，此时用户在从下往上绘制矩形框
        // 需要对矩形的下边距进行计算，与普通状况下的计算上边距，有所不同
        if (dy >= 0) {
          me._fDiv.style.bottom = "auto";
          me._fDiv.style.top = me._bind.my + "px";
          if (me._bind.my + dy >= mapSize[1] - 2 * me._opts.strokeWeight) {
            me._fDiv.style.height = mapSize[1] - me._bind.my - 2 * me._opts.strokeWeight + "px";
            me._followTitle && me._followTitle.hide();
          }
        } else {
          me._fDiv.style.top = "auto";
          me._fDiv.style.bottom = mapSize[1] - me._bind.my + "px";
          if (me._bind.my + dy <= 2 * me._opts.strokeWeight) {
            me._fDiv.style.height = me._bind.my - 2 * me._opts.strokeWeight + "px";
            me._followTitle && me._followTitle.hide();
          }
        }

        // 停止事件冒泡传播和默认事件
        stopBubble(e);
        return preventDefault(e);
      }
    };

    // 开启拉框缩放状态后，鼠标在地图上拖拽时、弹起的操作
    var endDrawRect = function(e) {
      if (me._isOpen == true) {
        // 删除拖拽鼠标画框时，鼠标移动事件，和鼠标弹起事件
        removeEvent(document, "mousemove", drawingRect);
        removeEvent(document, "mouseup", endDrawRect);

        // 释放IE浏览器下对事件的捕获
        if (!!ieVersion && OperationMask.getDom(map).releaseCapture) {
          OperationMask.getDom(map).releaseCapture();
        }

        // 计算当前矩形半透明效果框的中心点
        var centerX = parseInt(me._fDiv.style.left) + parseInt(me._fDiv.style.width) / 2;
        var centerY = parseInt(me._fDiv.style.top) + parseInt(me._fDiv.style.height) / 2;
        var mapSize = [map.getSize().width, map.getSize().height];
        if (isNaN(centerX)) {
          centerX = mapSize[0] - parseInt(me._fDiv.style.right) - parseInt(me._fDiv.style.width) / 2;
        }
        if (isNaN(centerY)) {
          centerY = mapSize[1] - parseInt(me._fDiv.style.bottom) - parseInt(me._fDiv.style.height) / 2;
        }

        // 通过对比矩形和地图区域的高宽，计算需要的缩放比例
        var ratio = Math.min(mapSize[0] / Math.abs(me._bind.dx), mapSize[1] / Math.abs(me._bind.dy));
        ratio = Math.floor(ratio);

        // 通过屏幕上的像素坐标的转化，计算矩形半透明效果框的Bound区域
        var px1 = new BMap.Pixel(centerX - parseInt(me._fDiv.style.width) / 2, centerY - parseInt(me._fDiv.style.height) / 2);
        var px2 = new BMap.Pixel(centerX + parseInt(me._fDiv.style.width) / 2, centerY + parseInt(me._fDiv.style.height) / 2);
        var pt1 = map.pixelToPoint(px1);
        var pt2 = map.pixelToPoint(px2);
        var bds = new BMap.Bounds(pt1, pt2);

        delete me._bind.dx;
        delete me._bind.dy;
        delete me._bind.ix;
        delete me._bind.iy;

        // 计算缩放后应该所在的地图层级
        // 当矩形效果框和地图区域的高宽比有清晰结果时(即ratio有计算结果)，通过高宽比来计算
        // 由于每层级地图间的缩放比1:2，所以使用下面的计算公式
        // 当ratio无计算结果时，只进行普通的1个级别的缩放改变
        if (!isNaN(ratio)) {
          if (me._opts.zoomType == BMAP_ZOOM_IN) {
            // 拉框放大的情况
            var targetZoomLv = Math.round(map.getZoom() + (Math.log(ratio) / Math.log(2)));
            if (targetZoomLv < map.getZoom()) {
              targetZoomLv = map.getZoom();
            }
          } else {
            // 拉框缩小的情况
            targetZoomLv = Math.round(map.getZoom() + (Math.log(1 / ratio) / Math.log(2)));
            if (targetZoomLv > map.getZoom()) {
              targetZoomLv = map.getZoom();
            }
          }
        } else {
          targetZoomLv = map.getZoom() + (me._opts.zoomType == BMAP_ZOOM_IN ? 1 : -1);
        }

        // 进行层级缩放，并定位新中心点
        var targetCenterPt = map.pixelToPoint({ x: centerX, y: centerY }, map.getZoom());
        map.centerAndZoom(targetCenterPt, targetZoomLv);

        // 设置鼠标移动过程中，跟随的文字提示框的位置
        var pt = OperationMask.getDrawPoint(e);
        if (me._followTitle) {
          me._followTitle.setPosition(pt);
          me._followTitle.show();
        }
        me._bind.isZooming = false;

        // 缩放操作结束，删除矩形半透明框
        me._fDiv.parentNode.removeChild(me._fDiv);
        me._fDiv = null;
      }

      // 创建矩形覆盖物，用以缩放结束后的动画效果
      // 如果不需要动画效果，从此处到new Animation()的过程、以及Animation的声明，均可删除
      var southWestPoint = bds.getSouthWest(),
        northEastPoint = bds.getNorthEast(),
        southEastPoint = new BMap.Point(northEastPoint.lng, southWestPoint.lat),
        northWestPoint = new BMap.Point(southWestPoint.lng, northEastPoint.lat),
        rect = new BMap.Polygon([
          southWestPoint,
          northWestPoint,
          northEastPoint,
          southEastPoint
        ]);
      rect.setStrokeWeight(2);
      rect.setStrokeOpacity(0.3);
      rect.setStrokeColor("#111");
      rect.setFillColor("");
      map.addOverlay(rect);

      // 渐隐藏动画效果
      new Animation({
        duration: 240,
        fps: 20,
        delay: 500,
        render: function(t) {
          var opacity = 0.3 * (1 - t);
          rect.setStrokeOpacity(opacity);
        },
        finish: function() {
          map.removeOverlay(rect);
          //rect.dispose();
          rect = null;
        }
      });

      // 设置为自动关闭缩放状态时，修改相关状态值
      if (me._opts.autoClose) {
        setTimeout(function() {
          if (me._isOpen == true) {
            me.close();
          }
        }, 70);
      }

      // 停止事件冒泡传播和默认事件
      stopBubble(e);
      return preventDefault(e);
    };

    OperationMask.show(this._map);
    this.setCursor(this._opts.cursor);

    // 增加鼠标按下时，开始绘制矩形框的事件
    // 通过判断只绑定一次，并不再删除
    if (!this._isBeginDrawBinded) {
      addEvent(OperationMask.getDom(this._map), "mousedown", beginDrawRect);
      this._isBeginDrawBinded = true;
    }

    return true;
  };

  /**
   * 结束拉框放大状态
   * @return 无返回值
   *
   * @example <b>参考示例：</b><br />
   * myRectangleZoomObject.close();
   */
  RectangleZoom.prototype.close = function() {
    if (!this._isOpen) {
      return;
    }
    this._isOpen = false;
    BMapLib._toolInUse = false;
    this._followTitle && this._followTitle.hide();
    OperationMask.hide();
    // var map = this._map;
    // var overlays = map.getOverlays()
    // map.clearOverlays()
    // overlays.forEach(function(v, i) {
    //   map.addOverlay(v)
    // })
  };

  /**
   * 生成透明效果层
   * @return 透明层的html字符串
   */
  RectangleZoom.prototype._generateHTML = function() {
    return ["<div style='position:absolute;z-index:300;border:",
      this._opts.strokeWeight,
      "px ",
      this._opts.style,
      " ",
      this._opts.strokeColor,
      "; opacity:",
      this._opts.opacity,
      "; background: ",
      this._opts.fillColor,
      "; filter:alpha(opacity=",
      Math.round(this._opts.opacity * 100),
      "); width:0; height:0; font-size:0'></div>"
    ].join("");
  };


  /**
   * 在目标元素的指定位置插入HTML代码，
   * 闭包，对外不暴露
   *
   * @param {HTMLElement|string} element 目标元素或目标元素的id
   * @param {String} position 插入html的位置信息
   *     取值为beforeBegin、afterBegin、beforeEnd或afterEnd，大小写不敏感
   * @param {String} html 要插入的html    
   * @return {HTMLElement} 目标元素
   */
  function insertHTML(element, position, html) {
    var range, begin;
    if (element.insertAdjacentHTML) {
      element.insertAdjacentHTML(position, html);
    } else {
      range = element.ownerDocument.createRange();
      // FF下range的位置设置错误可能导致创建出来的fragment在插入dom树之后html结构乱掉
      // 改用range.insertNode来插入html
      position = position.toUpperCase();
      if (position == 'AFTERBEGIN' || position == 'BEFOREEND') {
        range.selectNodeContents(element);
        range.collapse(position == 'AFTERBEGIN');
      } else {
        begin = position == 'BEFOREBEGIN';
        range[begin ? 'setStartBefore' : 'setEndAfter'](element);
        range.collapse(begin);
      }
      range.insertNode(range.createContextualFragment(html));
    }
    return element;
  }

  /**
   * 插入到Dom元素内，最后面一段HTML;并返回Dom对象，
   * 闭包，对外不暴露
   *
   * @param {Object} parent 父容器
   * @param {Object} chlidHTML	插入的HTML
   * @return Dom元素
   */
  function beforeEndHTML(parent, chlidHTML) {
    insertHTML(parent, "beforeEnd", chlidHTML);
    return parent.lastChild;
  }

  /**
   * 停止事件冒泡传播，
   * 闭包，对外不暴露
   *
   * @type {Event} e e对象
   */
  function stopBubble(e) {
    var e = window.event || e;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
  }

  /**
   * 阻止默认事件处理，
   * 闭包，对外不暴露
   *
   * @type {Event} e e对象
   */
  function preventDefault(e) {
    var e = window.event || e;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    return false;
  }

  /**
   * 给某页面元素添加事件，
   * 闭包，对外不暴露
   *
   * @type {Dom} element 需要添加事件的dom对象
   * @type {String} type 需要添加的事件名
   * @type {Function} listener 需要触发的操作
   */
  function addEvent(element, type, listener) {
    if (!element) {
      return;
    }
    type = type.replace(/^on/i, '').toLowerCase();
    if (element.addEventListener) {
      element.addEventListener(type, listener, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, listener);
    }
  };

  /**
   * 给某页面元素删除事件，
   * 闭包，对外不暴露
   *
   * @type {Dom} element 需要删除事件的dom对象
   * @type {String} type 需要删除的事件名
   * @type {Function} listener 需要触发的操作
   */
  function removeEvent(element, type, listener) {
    if (!element) {
      return;
    }
    type = type.replace(/^on/i, '').toLowerCase();
    if (element.removeEventListener) {
      element.removeEventListener(type, listener, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, listener);
    }
  };


  /**
   * OperationMask，透明覆盖层，在地图上进行鼠标绘制操作时使用，
   * 闭包，对外不暴露
   */
  var OperationMask = {
    /**
     * map对象
     * @type {Map}
     */
    _map: null,

    /**
     * HTML字符串
     * @type {String}
     */
    _html: "<div style='background:transparent url(http://api.map.baidu.com/images/blank.gif);position:absolute;left:0;top:0;width:100%;height:100%;z-index:1000' unselectable='on'></div>",

    /**
     * html元素
     * @type {HTMLElement}
     */
    _maskElement: null,

    /**
     * 鼠标指针
     * @type {String}
     */
    _cursor: 'default',

    /**
     * 操作层是否在使用中
     * @type {Boolean}
     */
    _inUse: false,

    /**
     * 透明覆盖层的显示
     *
     * @param {Map} map map对象
     * @return 无返回值
     */
    show: function(map) {
      if (!this._map) {
        this._map = map;
      }
      this._inUse = true;
      if (!this._maskElement) {
        this._createMask(map);
      }
      this._maskElement.style.display = 'block';
    },

    /**
     * 创建覆盖层
     *
     * @param {Map} map map对象
     * @return 无返回值
     */
    _createMask: function(map) {
      this._map = map;
      if (!this._map) {
        return;
      }
      var elem = this._maskElement = beforeEndHTML(this._map.getContainer(), this._html);

      var stopAndPrevent = function(e) {
        stopBubble(e);
        return preventDefault(e);
      }
      addEvent(elem, 'mouseup', function(e) {
        if (e.button == 2) {
          stopAndPrevent(e);
        }
      });
      addEvent(elem, 'contextmenu', stopAndPrevent);
      elem.style.display = 'none';
    },

    /**
     * 获取当前绘制点的地理坐标
     *
     * @param {Event} e e对象
     * @param {Boolean} n 是否向上查到相对于地图container元素的坐标位置
     * @return Point对象的位置信息
     */
    getDrawPoint: function(e, n) {
      e = window.event || e;
      var x = e.layerX || e.offsetX || 0;
      var y = e.layerY || e.offsetY || 0;
      var t = e.target || e.srcElement;
      if (t != OperationMask.getDom(this._map) && n == true) {
        while (t && t != this._map.getContainer()) {
          if (!(t.clientWidth == 0 &&
              t.clientHeight == 0 &&
              t.offsetParent &&
              t.offsetParent.nodeName.toLowerCase() == 'td')) {
            x += t.offsetLeft;
            y += t.offsetTop;
          }
          t = t.offsetParent;
        }
      }

      if (t != OperationMask.getDom(this._map) &&
        t != this._map.getContainer()) {
        return;
      }
      if (typeof x === 'undefined' ||
        typeof y === 'undefined') {
        return;
      }
      if (isNaN(x) || isNaN(y)) {
        return;
      }
      return this._map.pixelToPoint(new BMap.Pixel(x, y));
    },

    /**
     * 透明覆盖层的隐藏
     *
     * @return 无返回值
     */
    hide: function() {
      if (!this._map) {
        return;
      }
      this._inUse = false;
      if (this._maskElement) {
        this._maskElement.style.display = 'none';
      }
    },

    /**
     * 获取HTML容器
     *
     * @param {Map} map map对象
     * @return HTML容器元素
     */
    getDom: function(map) {
      if (!this._maskElement) {
        this._createMask(map);
      }
      return this._maskElement;
    },

    /**
     * 设置鼠标样式
     *
     * @type {String} cursor 鼠标样式
     * @return 无返回值
     */
    setCursor: function(cursor) {
      this._cursor = cursor || 'default';
      if (this._maskElement) {
        this._maskElement.style.cursor = this._cursor;
      }
    }
  };


  /**
   * Animation，动画效果类，
   * 通过该类，可以实现一些延时、规律的动画效果，
   * 闭包在文件内，对外不暴露
   * 
   * @constructor
   * @param {Json Object} opts 可选的输入参数，非必填项。可输入选项包括：
   * {"duration" : {Number} 动画时长, 单位毫秒,
   *  "fps" : {Number} 每秒帧数,
   *  "delay" : {Number} 延迟执行时间，单位毫秒,
   *  "transition" : {Object} 变换效果的曲线,
   *  "finish" : {Function} 动画结束的回调函数,
   *  "render" : {Function} 每一帧执行的回调函数}
   */
  function Animation(opts) {
    var defaultOptions = {
      // 动画时长, 单位毫秒
      duration: 1000,
      // 每秒帧数
      fps: 30,
      // 延迟执行时间，单位毫秒
      delay: 0,
      // 变换效果的曲线
      transition: Transitions.linear,
      // 调用stop停止时的回调函数
      onStop: function() {}
    };

    // 修改默认参数
    if (opts) {
      for (var i in opts) {
        defaultOptions[i] = opts[i];
      }
    }
    this._opts = defaultOptions;

    if (defaultOptions.delay) {
      var me = this;
      setTimeout(function() {
        me._beginTime = new Date().getTime();
        me._endTime = me._beginTime + me._opts.duration;
        me._launch();
      }, defaultOptions.delay);
    } else {
      this._beginTime = new Date().getTime();
      this._endTime = this._beginTime + this._opts.duration;
      this._launch();
    }
  }

  /**
   * 动画执行过程中的操作
   * @return 无返回值
   */
  Animation.prototype._launch = function() {
    var me = this;
    var now = new Date().getTime();

    if (now >= me._endTime) {
      if (typeof me._opts.render == 'function') {
        me._opts.render(me._opts.transition(1));
      }
      // finish()接口，时间线结束时对应的操作
      if (typeof me._opts.finish == 'function') {
        me._opts.finish();
      }
      return;
    }
    me.schedule = me._opts.transition((now - me._beginTime) / me._opts.duration);

    // render()接口，用来实现每个脉冲所要实现的效果
    // schedule 时间线的进度
    if (typeof me._opts.render == 'function') {
      me._opts.render(me.schedule);
    }
    // 执行下一个动作
    if (!me.terminative) {
      me._timer = setTimeout(function() {
        me._launch()
      }, 1000 / me._opts.fps);
    }
  };

  /**
   * 变换效果函数库
   */
  var Transitions = {
    linear: function(t) {
      return t;
    },
    reverse: function(t) {
      return 1 - t;
    },
    easeInQuad: function(t) {
      return t * t;
    },
    easeInCubic: function(t) {
      return Math.pow(t, 3);
    },
    easeOutQuad: function(t) {
      return -(t * (t - 2));
    },
    easeOutCubic: function(t) {
      return Math.pow((t - 1), 3) + 1;
    },
    easeInOutQuad: function(t) {
      if (t < 0.5) {
        return t * t * 2;
      } else {
        return -2 * (t - 2) * t - 1;
      }
      return;
    },
    easeInOutCubic: function(t) {
      if (t < 0.5) {
        return Math.pow(t, 3) * 4;
      } else {
        return Math.pow(t - 1, 3) * 4 + 1;
      }
    },
    easeInOutSine: function(t) {
      return (1 - Math.cos(Math.PI * t)) / 2;
    }
  };
})();


(function() {
  /**
   * 声明baidu包
   */
  var baidu = baidu || { guid: "$BAIDU$" };
  (function() {
    // 一些页面级别唯一的属性，需要挂载在window[baidu.guid]上
    window[baidu.guid] = {};

    /**
     * 将源对象的所有属性拷贝到目标对象中
     * @name baidu.extend
     * @function
     * @grammar baidu.extend(target, source)
     * @param {Object} target 目标对象
     * @param {Object} source 源对象
     * @returns {Object} 目标对象
     */
    baidu.extend = function(target, source) {
      for (var p in source) {
        if (source.hasOwnProperty(p)) {
          target[p] = source[p];
        }
      }
      return target;
    };

    /**
     * @ignore
     * @namespace
     * @baidu.lang 对语言层面的封装，包括类型判断、模块扩展、继承基类以及对象自定义事件的支持。
     * @property guid 对象的唯一标识
     */
    baidu.lang = baidu.lang || {};

    /**
     * 返回一个当前页面的唯一标识字符串。
     * @function
     * @grammar baidu.lang.guid()
     * @returns {String} 当前页面的唯一标识字符串
     */
    baidu.lang.guid = function() {
      return "TANGRAM__" + (window[baidu.guid]._counter++).toString(36);
    };

    window[baidu.guid]._counter = window[baidu.guid]._counter || 1;

    /**
     * 所有类的实例的容器
     * key为每个实例的guid
     */
    window[baidu.guid]._instances = window[baidu.guid]._instances || {};

    /**
     * Tangram继承机制提供的一个基类，用户可以通过继承baidu.lang.Class来获取它的属性及方法。
     * @function
     * @name baidu.lang.Class
     * @grammar baidu.lang.Class(guid)
     * @param {string} guid	对象的唯一标识
     * @meta standard
     * @remark baidu.lang.Class和它的子类的实例均包含一个全局唯一的标识guid。
     * guid是在构造函数中生成的，因此，继承自baidu.lang.Class的类应该直接或者间接调用它的构造函数。<br>
     * baidu.lang.Class的构造函数中产生guid的方式可以保证guid的唯一性，及每个实例都有一个全局唯一的guid。
     */
    baidu.lang.Class = function(guid) {
      this.guid = guid || baidu.lang.guid();
      window[baidu.guid]._instances[this.guid] = this;
    };

    window[baidu.guid]._instances = window[baidu.guid]._instances || {};

    /**
     * 判断目标参数是否string类型或String对象
     * @name baidu.lang.isString
     * @function
     * @grammar baidu.lang.isString(source)
     * @param {Any} source 目标参数
     * @shortcut isString
     * @meta standard
     *             
     * @returns {boolean} 类型判断结果
     */
    baidu.lang.isString = function(source) {
      return '[object String]' == Object.prototype.toString.call(source);
    };

    /**
     * 判断目标参数是否为function或Function实例
     * @name baidu.lang.isFunction
     * @function
     * @grammar baidu.lang.isFunction(source)
     * @param {Any} source 目标参数
     * @returns {boolean} 类型判断结果
     */
    baidu.lang.isFunction = function(source) {
      return '[object Function]' == Object.prototype.toString.call(source);
    };

    /**
     * 重载了默认的toString方法，使得返回信息更加准确一些。
     * @return {string} 对象的String表示形式
     */
    baidu.lang.Class.prototype.toString = function() {
      return "[object " + (this._className || "Object") + "]";
    };

    /**
     * 释放对象所持有的资源，主要是自定义事件。
     * @name dispose
     * @grammar obj.dispose()
     */
    baidu.lang.Class.prototype.dispose = function() {
      delete window[baidu.guid]._instances[this.guid];
      for (var property in this) {
        if (!baidu.lang.isFunction(this[property])) {
          delete this[property];
        }
      }
      this.disposed = true;
    };

    /**
     * 自定义的事件对象。
     * @function
     * @name baidu.lang.Event
     * @grammar baidu.lang.Event(type[, target])
     * @param {string} type	 事件类型名称。为了方便区分事件和一个普通的方法，事件类型名称必须以"on"(小写)开头。
     * @param {Object} [target]触发事件的对象
     * @meta standard
     * @remark 引入该模块，会自动为Class引入3个事件扩展方法：addEventListener、removeEventListener和dispatchEvent。
     * @see baidu.lang.Class
     */
    baidu.lang.Event = function(type, target) {
      this.type = type;
      this.returnValue = true;
      this.target = target || null;
      this.currentTarget = null;
    };

    /**
     * 注册对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
     * @grammar obj.addEventListener(type, handler[, key])
     * @param 	{string}   type         自定义事件的名称
     * @param 	{Function} handler      自定义事件被触发时应该调用的回调函数
     * @param 	{string}   [key]		为事件监听函数指定的名称，可在移除时使用。如果不提供，方法会默认为它生成一个全局唯一的key。
     * @remark 	事件类型区分大小写。如果自定义事件名称不是以小写"on"开头，该方法会给它加上"on"再进行判断，即"click"和"onclick"会被认为是同一种事件。 
     */
    baidu.lang.Class.prototype.addEventListener = function(type, handler, key) {
      if (!baidu.lang.isFunction(handler)) {
        return;
      }!this.__listeners && (this.__listeners = {});
      var t = this.__listeners,
        id;
      if (typeof key == "string" && key) {
        if (/[^\w\-]/.test(key)) {
          throw ("nonstandard key:" + key);
        } else {
          handler.hashCode = key;
          id = key;
        }
      }
      type.indexOf("on") != 0 && (type = "on" + type);
      typeof t[type] != "object" && (t[type] = {});
      id = id || baidu.lang.guid();
      handler.hashCode = id;
      t[type][id] = handler;
    };

    /**
     * 移除对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
     * @grammar obj.removeEventListener(type, handler)
     * @param {string}   type     事件类型
     * @param {Function|string} handler  要移除的事件监听函数或者监听函数的key
     * @remark 	如果第二个参数handler没有被绑定到对应的自定义事件中，什么也不做。
     */
    baidu.lang.Class.prototype.removeEventListener = function(type, handler) {
      if (baidu.lang.isFunction(handler)) {
        handler = handler.hashCode;
      } else if (!baidu.lang.isString(handler)) {
        return;
      }!this.__listeners && (this.__listeners = {});
      type.indexOf("on") != 0 && (type = "on" + type);
      var t = this.__listeners;
      if (!t[type]) {
        return;
      }
      t[type][handler] && delete t[type][handler];
    };

    /**
     * 派发自定义事件，使得绑定到自定义事件上面的函数都会被执行。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
     * @grammar obj.dispatchEvent(event, options)
     * @param {baidu.lang.Event|String} event 	Event对象，或事件名称(1.1.1起支持)
     * @param {Object} options 扩展参数,所含属性键值会扩展到Event对象上(1.2起支持)
     * @remark 处理会调用通过addEventListenr绑定的自定义事件回调函数之外，还会调用直接绑定到对象上面的自定义事件。
     * 例如：<br>
     * myobj.onMyEvent = function(){}<br>
     * myobj.addEventListener("onMyEvent", function(){});
     */
    baidu.lang.Class.prototype.dispatchEvent = function(event, options) {
      if (baidu.lang.isString(event)) {
        event = new baidu.lang.Event(event);
      }!this.__listeners && (this.__listeners = {});
      options = options || {};
      for (var i in options) {
        event[i] = options[i];
      }
      var i, t = this.__listeners,
        p = event.type;
      event.target = event.target || this;
      event.currentTarget = this;
      p.indexOf("on") != 0 && (p = "on" + p);
      baidu.lang.isFunction(this[p]) && this[p].apply(this, arguments);
      if (typeof t[p] == "object") {
        for (i in t[p]) {
          t[p][i].apply(this, arguments);
        }
      }
      return event.returnValue;
    };

    /**
     * 为类型构造器建立继承关系
     * @name baidu.lang.inherits
     * @function
     * @grammar baidu.lang.inherits(subClass, superClass[, className])
     * @param {Function} subClass 子类构造器
     * @param {Function} superClass 父类构造器
     * @param {string} className 类名标识
     * @remark 使subClass继承superClass的prototype，
     * 因此subClass的实例能够使用superClass的prototype中定义的所有属性和方法。<br>
     * 这个函数实际上是建立了subClass和superClass的原型链集成，并对subClass进行了constructor修正。<br>
     * <strong>注意：如果要继承构造函数，需要在subClass里面call一下，具体见下面的demo例子</strong>
     * @shortcut inherits
     * @meta standard
     * @see baidu.lang.Class
     */
    baidu.lang.inherits = function(subClass, superClass, className) {
      var key, proto,
        selfProps = subClass.prototype,
        clazz = new Function();
      clazz.prototype = superClass.prototype;
      proto = subClass.prototype = new clazz();
      for (key in selfProps) {
        proto[key] = selfProps[key];
      }
      subClass.prototype.constructor = subClass;
      subClass.superClass = superClass.prototype;

      if ("string" == typeof className) {
        proto._className = className;
      }
    };

    /**
     * @ignore
     * @namespace baidu.dom 操作dom的方法。
     */
    baidu.dom = baidu.dom || {};

    /**
     * 从文档中获取指定的DOM元素
     * 
     * @param {string|HTMLElement} id 元素的id或DOM元素
     * @meta standard
     * @return {HTMLElement} DOM元素，如果不存在，返回null，如果参数不合法，直接返回参数
     */
    baidu._g = baidu.dom._g = function(id) {
      if (baidu.lang.isString(id)) {
        return document.getElementById(id);
      }
      return id;
    };

    /**
     * 从文档中获取指定的DOM元素
     * @name baidu.dom.g
     * @function
     * @grammar baidu.dom.g(id)
     * @param {string|HTMLElement} id 元素的id或DOM元素
     * @meta standard
     *             
     * @returns {HTMLElement|null} 获取的元素，查找不到时返回null,如果参数不合法，直接返回参数
     */
    baidu.g = baidu.dom.g = function(id) {
      if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
      } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
      }
      return null;
    };

    /**
     * 在目标元素的指定位置插入HTML代码
     * @name baidu.dom.insertHTML
     * @function
     * @grammar baidu.dom.insertHTML(element, position, html)
     * @param {HTMLElement|string} element 目标元素或目标元素的id
     * @param {string} position 插入html的位置信息，取值为beforeBegin,afterBegin,beforeEnd,afterEnd
     * @param {string} html 要插入的html
     * @remark
     * 
     * 对于position参数，大小写不敏感<br>
     * 参数的意思：beforeBegin&lt;span&gt;afterBegin   this is span! beforeEnd&lt;/span&gt; afterEnd <br />
     * 此外，如果使用本函数插入带有script标签的HTML字符串，script标签对应的脚本将不会被执行。
     * 
     * @shortcut insertHTML
     * @meta standard
     *             
     * @returns {HTMLElement} 目标元素
     */
    baidu.insertHTML = baidu.dom.insertHTML = function(element, position, html) {
      element = baidu.dom.g(element);
      var range, begin;

      if (element.insertAdjacentHTML) {
        element.insertAdjacentHTML(position, html);
      } else {
        // 这里不做"undefined" != typeof(HTMLElement) && !window.opera判断，其它浏览器将出错？！
        // 但是其实做了判断，其它浏览器下等于这个函数就不能执行了
        range = element.ownerDocument.createRange();
        // FF下range的位置设置错误可能导致创建出来的fragment在插入dom树之后html结构乱掉
        // 改用range.insertNode来插入html, by wenyuxiang @ 2010-12-14.
        position = position.toUpperCase();
        if (position == 'AFTERBEGIN' || position == 'BEFOREEND') {
          range.selectNodeContents(element);
          range.collapse(position == 'AFTERBEGIN');
        } else {
          begin = position == 'BEFOREBEGIN';
          range[begin ? 'setStartBefore' : 'setEndAfter'](element);
          range.collapse(begin);
        }
        range.insertNode(range.createContextualFragment(html));
      }
      return element;
    };

    /**
     * 为目标元素添加className
     * @name baidu.dom.addClass
     * @function
     * @grammar baidu.dom.addClass(element, className)
     * @param {HTMLElement|string} element 目标元素或目标元素的id
     * @param {string} className 要添加的className，允许同时添加多个class，中间使用空白符分隔
     * @remark
     * 使用者应保证提供的className合法性，不应包含不合法字符，className合法字符参考：http://www.w3.org/TR/CSS2/syndata.html。
     * @shortcut addClass
     * @meta standard
     * 	            
     * @returns {HTMLElement} 目标元素
     */
    baidu.ac = baidu.dom.addClass = function(element, className) {
      element = baidu.dom.g(element);
      var classArray = className.split(/\s+/),
        result = element.className,
        classMatch = " " + result + " ",
        i = 0,
        l = classArray.length;

      for (; i < l; i++) {
        if (classMatch.indexOf(" " + classArray[i] + " ") < 0) {
          result += (result ? ' ' : '') + classArray[i];
        }
      }

      element.className = result;
      return element;
    };

    /**
     * @ignore
     * @namespace baidu.event 屏蔽浏览器差异性的事件封装。
     * @property target 	事件的触发元素
     * @property pageX 		鼠标事件的鼠标x坐标
     * @property pageY 		鼠标事件的鼠标y坐标
     * @property keyCode 	键盘事件的键值
     */
    baidu.event = baidu.event || {};

    /**
     * 事件监听器的存储表
     * @private
     * @meta standard
     */
    baidu.event._listeners = baidu.event._listeners || [];

    /**
     * 为目标元素添加事件监听器
     * @name baidu.event.on
     * @function
     * @grammar baidu.event.on(element, type, listener)
     * @param {HTMLElement|string|window} element 目标元素或目标元素id
     * @param {string} type 事件类型
     * @param {Function} listener 需要添加的监听器
     * @remark
     *  1. 不支持跨浏览器的鼠标滚轮事件监听器添加<br>
     *  2. 改方法不为监听器灌入事件对象，以防止跨iframe事件挂载的事件对象获取失败            
     * @shortcut on
     * @meta standard
     * @see baidu.event.un
     *             
     * @returns {HTMLElement|window} 目标元素
     */
    baidu.on = baidu.event.on = function(element, type, listener) {
      type = type.replace(/^on/i, '');
      element = baidu._g(element);
      var realListener = function(ev) {
          // 1. 这里不支持EventArgument,  原因是跨frame的事件挂载
          // 2. element是为了修正this
          listener.call(element, ev);
        },
        lis = baidu.event._listeners,
        filter = baidu.event._eventFilter,
        afterFilter,
        realType = type;
      type = type.toLowerCase();
      // filter过滤
      if (filter && filter[type]) {
        afterFilter = filter[type](element, type, realListener);
        realType = afterFilter.type;
        realListener = afterFilter.listener;
      }
      // 事件监听器挂载
      if (element.addEventListener) {
        element.addEventListener(realType, realListener, false);
      } else if (element.attachEvent) {
        element.attachEvent('on' + realType, realListener);
      }

      // 将监听器存储到数组中
      lis[lis.length] = [element, type, listener, realListener, realType];
      return element;
    };

    /**
     * 为目标元素移除事件监听器
     * @name baidu.event.un
     * @function
     * @grammar baidu.event.un(element, type, listener)
     * @param {HTMLElement|string|window} element 目标元素或目标元素id
     * @param {string} type 事件类型
     * @param {Function} listener 需要移除的监听器
     * @shortcut un
     * @meta standard
     *             
     * @returns {HTMLElement|window} 目标元素
     */
    baidu.un = baidu.event.un = function(element, type, listener) {
      element = baidu._g(element);
      type = type.replace(/^on/i, '').toLowerCase();

      var lis = baidu.event._listeners,
        len = lis.length,
        isRemoveAll = !listener,
        item,
        realType, realListener;

      //如果将listener的结构改成json
      //可以节省掉这个循环，优化性能
      //但是由于un的使用频率并不高，同时在listener不多的时候
      //遍历数组的性能消耗不会对代码产生影响
      //暂不考虑此优化
      while (len--) {
        item = lis[len];

        // listener存在时，移除element的所有以listener监听的type类型事件
        // listener不存在时，移除element的所有type类型事件
        if (item[1] === type &&
          item[0] === element &&
          (isRemoveAll || item[2] === listener)) {
          realType = item[4];
          realListener = item[3];
          if (element.removeEventListener) {
            element.removeEventListener(realType, realListener, false);
          } else if (element.detachEvent) {
            element.detachEvent('on' + realType, realListener);
          }
          lis.splice(len, 1);
        }
      }
      return element;
    };

    /**
     * 阻止事件的默认行为
     * @name baidu.event.preventDefault
     * @function
     * @grammar baidu.event.preventDefault(event)
     * @param {Event} event 事件对象
     * @meta standard
     */
    baidu.preventDefault = baidu.event.preventDefault = function(event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    };
  })();

  /** 
   * @exports DistanceTool as BMapLib.DistanceTool 
   */
  var DistanceTool =
    /**
     * DistanceTool类的构造函数
     * @class 距离测算类，实现测距效果的<b>入口</b>。
     * 实例化该类后，即可调用该类提供的open
     * 方法开启测距状态。
     * 
     * @constructor
     * @param {Map} map Baidu map的实例对象
     * @param {Json Object} opts 可选的输入参数，非必填项。可输入选项包括：<br />
     * {"<b>followText</b>" : {String} 测距过程中，提示框文字,
     * <br />"<b>unit</b>" : {String} 测距结果所用的单位制，可接受的属性为"metric"表示米制和"us"表示美国传统单位,
     * <br />"<b>lineColor</b>" : {String} 折线颜色,
     * <br />"<b>lineStroke</b>" : {Number} 折线宽度,
     * <br />"<b>opacity</b>" : {Number} 透明度,
     * <br />"<b>lineStyle</b>" : {String} 折线的样式，只可设置solid和dashed,
     * <br />"<b>secIcon</b>" : {BMap.Icon} 转折点的Icon,
     * <br />"<b>closeIcon</b>" : {BMap.Icon} 关闭按钮的Icon,
     * <br />"<b>cursor</b>" : {String} 跟随的鼠标样式}
     *
     * @example <b>参考示例：</b><br />
     * var map = new BMap.Map("container");<br />map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);<br />var myDistanceToolObject = new BMapLib.DistanceTool(map, {lineStroke : 2});
     */
    BMapLib.DistanceTool = function(map, opts) {
      if (!map) {
        return;
      }

      /**
       * map对象
       * @private
       * @type {Map}
       */
      this._map = map;

      opts = opts || {};
      /**
       * _opts是默认参数赋值。
       * 下面通过用户输入的opts，对默认参数赋值
       * @private
       * @type {Json}
       */
      this._opts = baidu.extend(
        baidu.extend(this._opts || {}, {

          /**
           * 测距提示
           * @private
           * @type {String}
           */
          tips: "测距",

          /**
           * 测距过程中，提示框文字
           * @private
           * @type {String}
           */
          followText: "单击确定地点，双击结束",

          /**
           * 测距结果所用的单位制，可接受的属性为"metric"表示米制和"us"表示美国传统单位
           * @private
           * @type {String}
           */
          unit: "metric",

          /**
           * 折线颜色
           * @private
           * @type {String}
           */
          lineColor: "#ff6319",

          /**
           * 折线线宽
           * @private
           * @type {Number}
           */
          lineStroke: 2,

          /**
           * 折线透明度
           * @private
           * @type {Number}
           */
          opacity: 0.8,

          /**
           * 折线样式
           * @private
           * @type {String}
           */
          lineStyle: "solid",

          /**
           * 跟随鼠标样式
           * @private
           * @type {String}
           */
          cursor: "http://api.map.baidu.com/images/ruler.cur",

          /**
           * 转折点的ICON样式
           * @private
           * @type {BMap.Icon}
           */
          secIcon: null,

          /**
           * 转折点的ICON样式
           * @private
           * @type {BMap.Icon}
           */
          closeIcon: null
        }), opts);

      /**
       * 跟随的title覆盖物
       * @private
       * @type {BMap.Label}
       */
      this._followTitle = null;

      /**
       * 折线包含所有点的数组
       * @private
       * @type {Array}
       */
      this._points = [];

      /**
       * 折线所包含的所有path数组
       * @private
       * @type {Array}
       */
      this._paths = [];

      /**
       * 折线结点图片数组
       * @private
       * @type {Array}
       */
      this._dots = [];

      /**
       * 折线测距包含所有线段的距离
       * @private
       * @type {Array}
       */
      this._segDistance = [];

      /**
       * 覆盖物的数组
       * @private
       * @type {Array}
       */
      this._overlays = [];

      /**
       * 是否在调用map.clearOverlays清除画线需要建立的相关overlay元素
       * @private
       * @type {Boolean}
       */
      this._enableMassClear = true,

        /**
         * 单位制，存储语言包中定义的单位名称
         * @private
         * @type {Json}
         */
        this._units = {
          // metric 表示米制
          metric: {
            /**
             * 米制的名称
             * @type {String}
             */
            name: "metric",

            /**
             * 和米制的换算关系
             * @type {Number}
             */
            conv: 1,

            /**
             * 米制单位下两个单位制之间的换算关系
             * @type {Number}
             */
            incon: 1000,

            /**
             * 米制单位下较小单位
             * @type {String}
             */
            u1: "米",

            /**
             * 米制单位下较大单位
             * @type {String}
             */
            u2: "公里"
          },
          // us 表示美国传统单位，各参数意义同上metric
          us: {
            name: "us",
            conv: 3.2808,
            incon: 5279.856,
            u1: "英尺",
            u2: "英里"
          }
        };

      /**
       * 是否已经开启了测距状态
       * @private
       * @type {Boolean}
       */
      this._isOpen = false;

      /**
       * 未点击任何一点时，鼠标移动时的跟随提示文字
       * @private
       * @type {String}
       */
      this._startFollowText = "单击确定起点";

      /**
       * 地图移动的计时器
       * @private
       * @type {Object}
       */
      this._movingTimerId = null;

      /**
       * 测距需要添加的CSS样式
       * @private
       * @type {Json}
       */
      this._styles = {
        "BMapLib_diso": "height:17px;width:5px;position:absolute;background:url(http://api.map.baidu.com/images/dis_box_01.gif) no-repeat left top",
        "BMapLib_disi": "color:#7a7a7a;position:absolute;left:5px;padding:0 4px 1px 0;line-height:17px;background:url(http://api.map.baidu.com/images/dis_box_01.gif) no-repeat right top",
        "BMapLib_disBoxDis": "color:#ff6319;font-weight:bold"
      };

      if (this._opts.lineStroke <= 0) {
        this._opts.lineStroke = 2;
      }
      if (this._opts.opacity > 1) {
        this._opts.opacity = 1;
      } else if (this._opts.opacity < 0) {
        this._opts.opacity = 0;
      }
      if (this._opts.lineStyle != "solid" &&
        this._opts.lineStyle != "dashed") {
        this._opts.lineStyle = "solid";
      }
      if (!this._units[this._opts.unit]) {
        this._opts.unit = "metric";
      }

      this.text = "测距";
    }

  // 通过baidu.lang下的inherits方法，让DistanceTool继承baidu.lang.Class
  baidu.lang.inherits(DistanceTool, baidu.lang.Class, "DistanceTool");

  /**
   * 地图区域的移动事件绑定
   * @return 无返回值
   */
  DistanceTool.prototype._bind = function() {
    // 设置鼠标样式
    this._setCursor(this._opts.cursor);
    var me = this;
    // 在装载地图的页面元素上，绑定鼠标移动事件
    baidu.on(this._map.getContainer(), "mousemove", function(e) {
      if (!me._isOpen) {
        return;
      }
      if (!me._followTitle) {
        return;
      }
      e = window.event || e;
      var t = e.target || e.srcElement;
      // 如果触发该事件的页面元素不是遮盖效果层，则返回，无操作
      if (t != OperationMask.getDom(me._map)) {
        me._followTitle.hide();
        return;
      }
      if (!me._mapMoving) {
        me._followTitle.show();
      }
      // 设置鼠标移动过程中，跟随的文字提示框的位置
      var pt = OperationMask.getDrawPoint(e, true);
      me._followTitle.setPosition(pt);
    });
    // 创建鼠标跟随的文字提示框
    if (this._startFollowText) {
      var t = this._followTitle = new BMap.Label(this._startFollowText, { offset: new BMap.Size(14, 16) });
      this._followTitle.setStyles({ color: "#333", borderColor: "#ff0103" });
    }
  };

  /**
   * 开启地图的测距状态
   * @return {Boolean}，开启测距状态成功，返回true；否则返回false。
   *
   * @example <b>参考示例：</b><br />
   * myDistanceToolObject.open();
   */
  DistanceTool.prototype.open = function() {
    // 判断测距状态是否已经开启
    if (this._isOpen == true) {
      return true;
    }
    // 已有其他地图上的鼠标操作工具开启
    if (!!BMapLib._toolInUse) {
      return;
    }
    this._isOpen = true;
    BMapLib._toolInUse = true;

    // 判断是否是否在移动过程中
    if (this._mapMoving) {
      delete this._mapMoving;
    }

    var me = this;
    // 增加鼠标在地图区域移动的事件
    // 通过binded参数，避免多次绑定
    if (!this._binded) {
      this._binded = true;
      // 绑定控件项事件
      this._bind();
      // 地图的移动过程中，需要隐藏相关的提示框
      this._map.addEventListener("moving", function() {
        me._hideCurrent();
      });
    }

    // 将文字提示框作为BMap.Label元素，提交给Map Api进行管理
    if (this._followTitle) {
      this._map.addOverlay(this._followTitle);
      this._followTitle.hide();
    }

    /**
     * 测距过程中，点击地图时，触发的操作
     * @ignore
     * @param {Object} e event对象
     */
    var distClick = function(e) {
      var map = me._map;
      if (!me._isOpen) {
        return;
      }
      // 通过event对象，计算得出点击位置的物理坐标，poi为一个BMap.Point对象
      e = window.event || e;
      var poi = OperationMask.getDrawPoint(e, true);
      // 验证计算得出的该点的位置合理性
      if (!me._isPointValid(poi)) {
        return;
      }
      // 记录当前点的屏幕位置
      me._bind.initX = e.pageX || e.clientX || 0;
      me._bind.initY = e.pageY || e.clientY || 0;

      // 这个if循环内的计算是，判断当前这个点，与存储内的最后一个点的距离，
      // 如果距离过小，比如小于5，可以认为是用户的误点，可以忽略掉
      if (me._points.length > 0) {
        var lstPx = map.pointToPixel(me._points[me._points.length - 1]);
        var thisPx = map.pointToPixel(poi);
        var dis = Math.sqrt(Math.pow(lstPx.x - thisPx.x, 2) + Math.pow(lstPx.y - thisPx.y, 2));
        if (dis < 5) {
          return;
        }
      }

      me._bind.x = e.layerX || e.offsetX || 0;
      me._bind.y = e.layerY || e.offsetY || 0;
      me._points.push(poi);
      // 添加测距结点
      me._addSecPoint(poi);

      // 调整跟踪鼠标的标签
      if (me._paths.length == 0) {
        me._formatTitle(1, me._opts.followText, me._getTotalDistance());
      }

      // 修改确定线的颜色
      if (me._paths.length > 0) {
        me._paths[me._paths.length - 1].show();
        me._paths[me._paths.length - 1].setStrokeOpacity(me._opts.opacity);
      }

      var path = new BMap.Polyline([poi, poi], { enableMassClear: me._enableMassClear });
      me._map.addOverlay(path);
      me._paths.push(path);
      me._overlays.push(path);

      // 测距模式下线样式固定
      path.setStrokeWeight(me._opts.lineStroke);
      path.setStrokeColor(me._opts.lineColor);
      path.setStrokeOpacity(me._opts.opacity / 2);
      path.setStrokeStyle(me._opts.lineStyle);

      // 如果地图正在移动则隐藏掉
      if (me._mapMoving) {
        path.hide();
      }

      if (me._points.length > 1) {
        var siblingPath = me._paths[me._points.length - 2];
        siblingPath.setPositionAt(1, poi);
      }

      // 生成节点旁边的距离显示框
      var disText = "";
      if (me._points.length > 1) {
        // 非起点的节点，显示当前的距离
        var segDis = me._setSegDistance(me._points[me._points.length - 2], me._points[me._points.length - 1]);
        var meters = me._getTotalDistance();
        disText = me._formatDisStr(meters);
      } else {
        disText = "起点";
      }
      var disLabel = new BMap.Label(disText, { offset: new BMap.Size(10, -5), enableMassClear: me._enableMassClear });
      disLabel.setStyles({ color: "#333", borderColor: "#ff0103" });
      me._map.addOverlay(disLabel);
      me._formatSegLabel(disLabel, disText);
      me._overlays.push(disLabel);
      poi.disLabel = disLabel;
      disLabel.setPosition(poi);

      /**
       * 测距过程中，每次点击底图添加节点时，派发事件的接口
       * @name DistanceTool#onaddpoint
       * @event
       * @param {Event Object} e 回调函数会返回event参数，包括以下返回值：
       * <br />{"<b>point</b> : {BMap.Point} 最新添加上的节点BMap.Point对象,
       * <br />"<b>pixel</b>：{BMap.pixel} 最新添加上的节点BMap.Pixel对象,
       * <br />"<b>index</b>：{Number} 最新添加的节点的索引,
       * <br />"<b>distance</b>：{Number} 截止最新添加的节点的总距离}
       *
       * @example <b>参考示例：</b><br />
       * myDistanceToolObject.addEventListener("addpoint", function(e) {  alert(e.distance);  });
       */

      // 生成名为onaddpoint的baidu.lang.Event对象
      // 并给该event对象添加上point、pixel、index和distance等属性字段
      // 然后在此刻，将绑定在onaddpoint上事件，全部赋予event参数，然后派发出去
      var event = new baidu.lang.Event("onaddpoint");
      event.point = poi;
      event.pixel = me._map.pointToPixel(poi);
      event.index = me._points.length - 1;
      event.distance = me._getTotalDistance().toFixed(0);
      me.dispatchEvent(event);
    };

    /**
     * 测距过程中，鼠标在地图上移动时，触发的操作
     * @ignore
     * @param {Object} e event对象
     */
    var distMove = function(e) {
      if (!me._isOpen) {
        return;
      }
      // 通过判断数组me._paths的长度，判断当前是否已经有测量节点
      // 也就是，如果没有节点，则还没有开始测量
      if (me._paths.length > 0) {
        // 通过event参数，计算当前点的位置
        e = window.event || e;
        var curX = e.pageX || e.clientX || 0;
        var curY = e.pageY || e.clientY || 0;
        if (typeof me._bind.initX == "undefined") {
          me._bind.x = e.layerX || e.offsetX || 0;
          me._bind.y = e.layerY || e.offsetY || 0;
          me._bind.initX = curX;
          me._bind.initY = curY;
        }
        var x = me._bind.x + curX - me._bind.initX;
        var y = me._bind.y + curY - me._bind.initY;

        // 修改最后一条折线的终点位置，使之随着鼠标移动画线
        var path = me._paths[me._paths.length - 1];
        var poi = me._map.pixelToPoint(new BMap.Pixel(x, y));
        path.setPositionAt(1, poi);

        if (!me._mapMoving) {
          path.show();
        }
        var dx = 0;
        var dy = 0;
        // 计算当前鼠标位置，是否靠近边界、或者已经出了边界
        // 如果在边界位置，则需要向对应的方向移动地图，来进行测量
        // 每次移动的距离，设定为8
        if (x < 10) {
          dx = 8;
        } else if (x > me._map.getSize().width - 10) {
          dx = -8;
        }
        if (y < 10) {
          dy = 8;
        } else if (y > me._map.getSize().height - 10) {
          dy = -8;
        }
        // 如果dx和dy都等于0，表明不需要移动地图
        if (dx != 0 || dy != 0) {
          // 此时需要向一个方向，平移地图
          if (!distMove._movingTimerId) {
            me._mapMoving = true;
            me._map.panBy(dx, dy, { noAnimation: true });
            me._movingTimerId = distMove._movingTimerId = setInterval(function() {
              me._map.panBy(dx, dy, { noAnimation: true });
            }, 30);
            // 地图移动过程中，隐藏线段和标签
            path.hide();
            me._followTitle && me._followTitle.hide();
          }
        } else {
          if (distMove._movingTimerId) {
            // 此时用户不在需要移动地图来测量，可以清除计时器
            clearInterval(distMove._movingTimerId);
            delete distMove._movingTimerId;
            delete me._movingTimerId;

            // 显示跟随提示框，并修改线路位置
            var lstP = me._paths[me._paths.length - 1];
            var poiN = me._map.pixelToPoint(new BMap.Pixel(x, y));
            if (!lstP) {
              return;
            }
            lstP.setPositionAt(1, poiN);
            lstP.show();
            if (me._followTitle) {
              me._followTitle.setPosition(poiN);
              me._followTitle.show();
            }
            me._bind.i = 0;
            me._bind.j = 0;
            delete me._mapMoving;
          }
        }
        // 实时更新文字提示框中的距离
        if (me._followTitle) {
          var td = me._getTotalDistance();
          var dis = me._map.getDistance(me._points[me._points.length - 1], poi);
          me._updateInstDis(me._followTitle, td + dis);
        }
      } else {
        // 此时用户还没有开始测量，只是鼠标随便在地图上移动
        if (me._followTitle) {
          me._followTitle.show();
          e = window.event || e;
          var t = e.target || e.srcElement;
          if (t != OperationMask.getDom()) {
            me._followTitle.hide();
          }
        }
      }
    };

    /**
     * 测距要结束时，双击地图，触发的操作
     * @ignore
     * @param {Object} e event对象
     */
    var distDblclick = function(e) {
      if (!me._isOpen) {
        return;
      }
      // 结束时，删除绑定的事件
      baidu.un(OperationMask.getDom(me._map), "click", distClick);
      baidu.un(document, "mousemove", distMove);
      baidu.un(OperationMask.getDom(me._map), "dblclick", distDblclick);
      baidu.un(document, "keydown", distKeyDown);
      baidu.un(OperationMask.getDom(me._map), "mouseup", distMouseUp);

      // 调用close()关闭测距状态
      setTimeout(function() {
        me.close();
      }, 50);
    };

    /**
     * 测距时的键盘操作
     * @ignore
     * @param {Object} e event对象
     */
    var distKeyDown = function(e) {
      e = window.event || e;
      if (e.keyCode == 27) {
        // [ESC]退出本次测距
        me._clearCurData();
        setTimeout(function() {
          me.close();
        }, 50);
      }
    };

    /**
     * 测距过程中，鼠标弹起时，触发的操作
     * @ignore
     * @param {Object} e event对象
     */
    var distMouseUp = function(e) {
      e = window.event || e;
      var ieVersion = 0;
      if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
        ieVersion = document.documentMode || +RegExp['\x241'];
      }
      if (ieVersion &&
        e.button != 1 ||
        e.button == 2) {
        me.close();
      }
    };

    // 初始化存储数据
    me._initData();

    // 调整title的内容
    this._formatTitle();

    // 创建透明覆盖层，并设置鼠标样式
    OperationMask.show(this._map);
    this._setCursor(this._opts.cursor);

    // 绑定全部事件
    baidu.on(OperationMask.getDom(this._map), "click", distClick);
    baidu.on(document, "mousemove", distMove);
    baidu.on(OperationMask.getDom(this._map), "dblclick", distDblclick);
    baidu.on(document, "keydown", distKeyDown);
    baidu.on(OperationMask.getDom(this._map), "mouseup", distMouseUp);

    // 将绑定的事件、和对应的绑定对象，记录在数组中
    this.bindFunc = [
      { elem: OperationMask.getDom(this._map), type: "click", func: distClick },
      { elem: OperationMask.getDom(this._map), type: "dblclick", func: distDblclick },
      { elem: document, type: "mousemove", func: distMove },
      { elem: document, type: "keydown", func: distKeyDown },
      { elem: OperationMask.getDom(this._map), type: "mouseup", func: distMouseUp }
    ];
    return true;
  };

  /**
   * 画线结束时，派发drawend事件
   * @return 无返回值
   */
  DistanceTool.prototype._dispatchLastEvent = function() {
    /**
     * 测距时，每次双击底图结束当前测距折线时，派发事件的接口
     * @name DistanceTool#ondrawend
     * @event
     * @param {Event Object} e 回调函数会返回event参数，包括以下返回值：
     * <br />{"<b>points</b> : {BMap.Point} 所有测量时，打下的节点BMap.Point对象,
     * <br />"<b>overlays</b>：{Array} 所有测量时，生成的线段BMap.Overlay对象,
     * <br />"<b>distance</b>：{Number} 测量解释时的最终距离}
     *
     * @example <b>参考示例：</b><br />
     * myDistanceToolObject.addEventListener("drawend", function(e) {  alert(e.distance);  });
     */

    // 生成名为ondrawend的baidu.lang.Event对象
    // 并给该event对象添加上points、overlays和distance等属性字段
    // 然后在此刻，将绑定在ondrawend上事件，全部赋予event参数，然后派发出去
    var event = new baidu.lang.Event("ondrawend");
    event.points =
      this._points ?
      this._points.slice(0) : [];
    event.overlays =
      this._paths ?
      this._paths.slice(0, this._paths.length - 1) : [];
    event.distance = this._getTotalDistance().toFixed(0);
    this.dispatchEvent(event);
  };

  /**
   * 关闭测距状态
   * @return 无返回值
   *
   * @example <b>参考示例：</b><br />
   * myDistanceToolObject.close();
   */
  DistanceTool.prototype.close = function() {
    if (this._isOpen == false) {
      return;
    }
    this._isOpen = false;
    BMapLib._toolInUse = false;

    if (this._mapMoving) {
      delete this._mapMoving;
    }
    var me = this;
    me._dispatchLastEvent();
    if (me._points.length < 2) {
      // 不是有效绘制，清除所有内容
      me._clearCurData();
    } else {
      me._paths[me._paths.length - 1].remove();
      me._paths[me._paths.length - 1] = null;
      me._paths.length = me._paths.length - 1;
      // 移除最近一次标记
      var pt = me._points[me._points.length - 1];
      if (pt.disLabel) {
        pt.disLabel.remove();
      }
      me._processLastOp();
    }
    OperationMask.hide();

    // 删除绑定的事件
    for (var i = 0, l = this.bindFunc.length; i < l; i++) {
      baidu.un(this.bindFunc[i].elem, this.bindFunc[i].type, this.bindFunc[i].func);
    }

    // 停止地图移动
    if (me._movingTimerId) {
      clearInterval(me._movingTimerId);
      me._movingTimerId = null;
    }

    if (this._followTitle) {
      this._followTitle.hide();
    }
  };

  /**
   * 清除本次测距的暂存数据
   * @return 无返回值
   */
  DistanceTool.prototype._clearCurData = function() {
    for (var i = 0, l = this._points.length; i < l; i++) {
      if (this._points[i].disLabel) {
        this._points[i].disLabel.remove();
      }
    }
    for (var i = 0, l = this._paths.length; i < l; i++) {
      this._paths[i].remove();
    }
    for (var i = 0, l = this._dots.length; i < l; i++) {
      this._dots[i].remove();
    }
    this._initData();
  };

  /**
   * 初始化存储数组
   * @return 无返回值
   */
  DistanceTool.prototype._initData = function() {
    // 初始化point数组
    this._points.length = 0;
    // 初始化path数组
    this._paths.length = 0;
    // 初始化分段距离数组
    this._segDistance.length = 0;
    // 初始化结点图像数组
    this._dots.length = 0;
  };

  /**
   * 计算两点之间距离并存放在分段距离数组中
   * @param {Point}
   * @param {Point}
   * @return {Number} 两个地理点之间的距离
   */
  DistanceTool.prototype._setSegDistance = function(pt0, pt1) {
    if (!pt0 || !pt1) {
      return;
    }
    var dis = this._map.getDistance(pt0, pt1);
    this._segDistance.push(dis);
    return dis;
  };

  /**
   * 获得总距离
   * @return {Number} 总距离
   */
  DistanceTool.prototype._getTotalDistance = function() {
    var totalDis = 0;
    for (var i = 0, l = this._segDistance.length; i < l; i++) {
      totalDis += this._segDistance[i];
    }
    return totalDis;
  };

  /**
   * 将米制单位的数值换算成为目标单位下的数值
   * @type {Number} 需要转换的数值
   * @type {String} 字符串描述的目标单位，
   * "metric" 表示米制单位，
   * "us" 表示美国传统单位制
   * @return {Number} 转换后的数值
   */
  DistanceTool.prototype._convertUnit = function(num, unit) {
    unit = unit || "metric";
    if (this._units[unit]) {
      return num * this._units[unit].conv;
    }
    return num;
  };

  /**
   * 添加测距结点
   * @param {BMap.Point} 节点
   * @return 无返回值
   */
  DistanceTool.prototype._addSecPoint = function(pt) {
    var ico =
      this._opts.secIcon ?
      this._opts.secIcon :
      new BMap.Icon("http://api.map.baidu.com/images/mapctrls.png", new BMap.Size(11, 11), { imageOffset: new BMap.Size(-26, -313) });
    var secPt = new BMap.Marker(pt, {
      icon: ico,
      clickable: false,
      baseZIndex: 3500000,
      zIndexFixed: true,
      enableMassClear: this._enableMassClear
    });
    this._map.addOverlay(secPt);
    this._dots.push(secPt);
  };

  /**
   * 格式化距离字符串
   * @param {Number} 距离
   * @return {String} 格式化的字符串
   */
  DistanceTool.prototype._formatDisStr = function(distance) {
    var u = this._opts.unit;
    var unit = this._units[u].u1;
    var dis = this._convertUnit(distance, u);

    if (dis > this._units[u].incon) {
      dis = dis / this._units[u].incon;
      unit = this._units[u].u2;
      dis = dis.toFixed(1);
    } else {
      dis = dis.toFixed(0);
    }
    return dis + unit;
  };

  /**
   * 设置鼠标样式
   * @param {String} cursor 鼠标样式
   * @return 没有返回值
   */
  DistanceTool.prototype._setCursor = function(cursor) {
    // 由于webkit内核浏览器下，cursor设置后默认不会居中，所以需要对偏移值进行设置
    var csr =
      /webkit/.test(navigator.userAgent.toLowerCase()) ?
      "url(" + this._opts.cursor + ") 3 6, crosshair" :
      "url(" + this._opts.cursor + "), crosshair"
    OperationMask._setCursor(csr);
  };

  /**
   * 获取鼠标样式
   * @return {String} 跟随的鼠标样式
   */
  DistanceTool.prototype._getCursor = function() {
    return this._opts.cursor;
  };

  /**
   * 调整分段距离样式
   * @param {BMap.Label} label 提示框的Label
   * @param {String} 需要填入的文字
   * @return 没有返回值
   */
  DistanceTool.prototype._formatSegLabel = function(label, text) {
    label.setStyle({ "border": "none", "padding": "0" });
    label.setContent("<span style='" + this._styles.BMapLib_diso + "'><span style='" + this._styles.BMapLib_disi + "'>" + text + "</span></span>");
  };

  /**
   * 处理最后一次操作，当用户双击或测距被强行退出时调用
   * @return 没有返回值
   */
  DistanceTool.prototype._processLastOp = function() {
    var me = this;
    // 删除上次移动临时数据
    delete me._bind.x;
    delete me._bind.y;
    delete me._bind.initX;
    delete me._bind.initY;
    // 验证路径
    if (me._paths.length > me._points.length - 1) {
      var l = me._paths.length - 1;
      me._paths[l].remove();
      me._paths[l] = null;
      me._paths.length = l;
    }
    // 保存本次测距对象
    var disObj = {};
    disObj.points = me._points.slice(0);
    disObj.paths = me._paths.slice(0);
    disObj.dots = me._dots.slice(0);
    disObj.segDis = me._segDistance.slice(0);
    // 判断总距离和按钮位置
    var lstPx = me._map.pointToPixel(disObj.points[disObj.points.length - 1]);
    var prePx = me._map.pointToPixel(disObj.points[disObj.points.length - 2]);
    var btnOffset = [0, 0];
    var disOffset = [0, 0];
    if (lstPx.y - prePx.y >= 0) {
      // 距离位于下端
      disOffset = [-5, 11];
    } else {
      // 距离位于上端
      disOffset = [-5, -35];
    }
    if (lstPx.x - prePx.x >= 0) {
      // 按钮位于右侧
      btnOffset = [14, 0];
    } else {
      // 按钮位于左侧
      btnOffset = [-14, 0];
    }
    // 显示总距离
    var pt = disObj.points[disObj.points.length - 1];
    pt.disLabel = new BMap.Label("", { offset: new BMap.Size(-15, -40), enableMassClear: me._enableMassClear });
    pt.disLabel.setStyles({ color: "#333", borderColor: "#ff0103" });
    me._map.addOverlay(pt.disLabel);
    pt.disLabel.setOffset(new BMap.Size(disOffset[0], disOffset[1]));
    pt.disLabel.setPosition(pt);
    me._formatTitle(2, "", "", pt.disLabel);
    // 添加关闭按钮
    var bico =
      this._opts.closeIcon ?
      this._opts.closeIcon :
      new BMap.Icon("http://api.map.baidu.com/images/mapctrls.gif", new BMap.Size(12, 12), { imageOffset: new BMap.Size(0, -14) });
    disObj.closeBtn = new BMap.Marker(disObj.points[disObj.points.length - 1], {
      icon: bico,
      offset: new BMap.Size(btnOffset[0], btnOffset[1]),
      baseZIndex: 3600000,
      enableMassClear: me._enableMassClear
    });
    me._map.addOverlay(disObj.closeBtn);
    disObj.closeBtn.setTitle("清除本次测距");
    // 点击关闭按钮，绑定关闭按钮事件
    disObj.closeBtn.addEventListener("click", function(e) {
      // 关闭本次测距，清除相关存储和变量
      for (var i = 0, l = disObj.points.length; i < l; i++) {
        disObj.points[i].disLabel.remove();
        disObj.points[i].disLabel = null;
      }
      for (var i = 0, l = disObj.paths.length; i < l; i++) {
        disObj.paths[i].remove();
        disObj.paths[i] = null;
      }
      for (var i = 0, l = disObj.dots.length; i < l; i++) {
        disObj.dots[i].remove();
        disObj.dots[i] = null;
      }
      disObj.closeBtn.remove();
      disObj.closeBtn = null;
      stopBubble(e);

      /**
       * @ignore
       * 测距结束后，点击线段上最后一个节点旁的关闭按钮时，派发事件的接口
       * @name DistanceTool#onremovepolyline
       * @event
       * @param {Event Object} e 回调函数会返回event参数
       *
       * @example <b>参考示例：</b><br />
       * myDistanceToolObject.addEventListener("removepolyline", function(e) {  alert(e.type);  });
       */

      // 生成名为onremovepolyline的baidu.lang.Event对象
      // 然后在此刻，将绑定在onremovepolyline上事件，全部赋予event参数，然后派发出去
      var event = new baidu.lang.Event("onremovepolyline");
      me.dispatchEvent(event);
    });
    me._initData();
  };

  /**
   * 生成测距过程中的文字提示框
   * @param {String} type
   * @param {String} text 
   * @param {String} distance
   * @param {Label} label
   * @return 无返回值
   */
  DistanceTool.prototype._formatTitle = function(type, text, distance, label) {
    var title = label || this._followTitle;
    if (!title) {
      return;
    }
    title.setStyle({ "lineHeight": "16px", "zIndex": "85", "padding": "3px 5px" });
    var t = this._startFollowText || "";
    var htmls = [];
    if (type == 1) {
      // 测距过程中的提示
      title.setOffset(0, 25);
      var u = this._opts.unit;
      var unit = this._units[u].u1;
      var dis = this._convertUnit(distance, u);
      if (dis > this._units[u].incon) {
        dis = dis / this._units[u].incon;
        unit = this._units[u].u2;
        dis = dis.toFixed(1);
      } else {
        dis = dis.toFixed(0);
      }
      htmls.push("<span>总长：<span style='" + this._styles.BMapLib_disBoxDis + "'>" + dis + "</span>" + unit + "</span><br />");
      htmls.push("<span style='color:#7a7a7a'>" + text + "</span>");
    } else if (type == 2) {
      // 结束时的总距离展示
      var u = this._opts.unit;
      var unit = this._units[u].u1;
      var dis = this._convertUnit(this._getTotalDistance(), u);
      if (dis > this._units[u].incon) {
        dis = dis / this._units[u].incon;
        unit = this._units[u].u2;
        dis = dis.toFixed(1);
      } else {
        dis = dis.toFixed(0);
      }
      htmls.push("总长：<span style='" + this._styles.BMapLib_disBoxDis + "'>" + dis + "</span>" + unit);
    } else {
      title.setOffset(0, 25);
      htmls.push(t);
    }
    title.setContent(htmls.join(""));
  };

  /**
   * 更新label的距离
   * @param HTMLElement label的DOM元素
   * @param Number 距离
   */
  DistanceTool.prototype._updateInstDis = function(label, dis) {
    // 换算距离
    var u = this._opts.unit;
    var unit = this._units[u].u1;
    if (dis > this._units[u].incon) {
      dis = dis / this._units[u].incon;
      unit = this._units[u].u2;
      dis = dis.toFixed(1);
    } else {
      dis = dis.toFixed(0);
    }
    // 修改Label的内容
    if (label) {
      var htmls = [];
      htmls.push("<span>总长：<span style='" + this._styles.BMapLib_disBoxDis + "'>" + dis + "</span>" + unit + "</span><br />");
      htmls.push("<span style='color:#7a7a7a'>" + this._opts.followText + "</span>");
      label.setContent(htmls.join(""));
    }
  };

  /**
   * 隐藏相关的线段和提示框文字
   * @return 无返回值
   */
  DistanceTool.prototype._hideCurrent = function() {
    if (!this._isOpen) {
      return;
    }
    if (this._paths.length > 0) {
      var p = this._paths[this._paths.length - 1];
      p.hide();
    }
    this._followTitle && this._followTitle.hide();
  };

  /**
   * 验证传入点的位置合理性
   * @param {BMap.Point} pt 需要被验证的point点
   * @return 无返回值
   */
  DistanceTool.prototype._isPointValid = function(pt) {
    if (!pt) {
      return false;
    }
    var mapBounds = this._map.getBounds();
    var sw = mapBounds.getSouthWest(),
      ne = mapBounds.getNorthEast();
    if (pt.lng < sw.lng ||
      pt.lng > ne.lng ||
      pt.lat < sw.lat ||
      pt.lat > ne.lat) {
      return false;
    }
    return true;
  };


  /**
   * OperationMask，透明覆盖层，在地图上进行鼠标绘制操作时使用，
   * 闭包，对外不暴露
   */
  var OperationMask = {
    /**
     * map对象
     * @type {Map}
     */
    _map: null,

    /**
     * HTML字符串
     * @type {String}
     */
    _html: "<div style='background:transparent url(http://api.map.baidu.com/images/blank.gif);position:absolute;left:0;top:0;width:100%;height:100%;z-index:1000' unselectable='on'></div>",

    /**
     * html元素
     * @type {HTMLElement}
     */
    _maskElement: null,

    /**
     * 鼠标指针
     * @type {String}
     */
    _cursor: 'default',

    /**
     * 操作层是否在使用中
     * @type {Boolean}
     */
    _inUse: false,

    /**
     * 透明覆盖层的显示
     *
     * @param {Map} map map对象
     * @return 无返回值
     */
    show: function(map) {
      if (!this._map) {
        this._map = map;
      }
      this._inUse = true;
      if (!this._maskElement) {
        this._createMask(map);
      }
      this._maskElement.style.display = 'block';
    },

    /**
     * 创建覆盖层
     *
     * @param {Map} map map对象
     * @return 无返回值
     */
    _createMask: function(map) {
      this._map = map;
      if (!this._map) {
        return;
      }
      baidu.insertHTML(this._map.getContainer(), "beforeEnd", this._html);
      var elem = this._maskElement = this._map.getContainer().lastChild;

      var stopAndPrevent = function(e) {
        stopBubble(e);
        return baidu.preventDefault(e);
      }
      baidu.on(elem, 'mouseup', function(e) {
        if (e.button == 2) {
          stopAndPrevent(e);
        }
      });
      baidu.on(elem, 'contextmenu', stopAndPrevent);
      elem.style.display = 'none';
    },

    /**
     * 获取当前绘制点的地理坐标
     *
     * @param {Event} e e对象
     * @param {Boolean} n 是否向上查到相对于地图container元素的坐标位置
     * @return Point对象的位置信息
     */
    getDrawPoint: function(e, n) {
      e = window.event || e;
      var x = e.layerX || e.offsetX || 0;
      var y = e.layerY || e.offsetY || 0;
      var t = e.target || e.srcElement;
      if (t != OperationMask.getDom(this._map) && n == true) {
        while (t && t != this._map.getContainer()) {
          if (!(t.clientWidth == 0 &&
              t.clientHeight == 0 &&
              t.offsetParent &&
              t.offsetParent.nodeName.toLowerCase() == 'td')) {
            x += t.offsetLeft;
            y += t.offsetTop;
          }
          t = t.offsetParent;
        }
      }

      if (t != OperationMask.getDom(this._map) &&
        t != this._map.getContainer()) {
        return;
      }
      if (typeof x === 'undefined' ||
        typeof y === 'undefined') {
        return;
      }
      if (isNaN(x) || isNaN(y)) {
        return;
      }
      return this._map.pixelToPoint(new BMap.Pixel(x, y));
    },

    /**
     * 透明覆盖层的隐藏
     *
     * @return 无返回值
     */
    hide: function() {
      if (!this._map) {
        return;
      }
      this._inUse = false;
      if (this._maskElement) {
        this._maskElement.style.display = 'none';
      }
    },

    /**
     * 获取HTML容器
     *
     * @param {Map} map map对象
     * @return HTML容器元素
     */
    getDom: function(map) {
      if (!this._maskElement) {
        this._createMask(map);
      }
      return this._maskElement;
    },

    /**
     * 设置鼠标样式
     *
     * @type {String} cursor 鼠标样式
     * @return 无返回值
     */
    _setCursor: function(cursor) {
      this._cursor = cursor || 'default';
      if (this._maskElement) {
        this._maskElement.style.cursor = this._cursor;
      }
    }
  };

  /**
   * 停止事件冒泡传播，
   * 闭包，对外不暴露
   *
   * @type {Event} e e对象
   */
  function stopBubble(e) {
    var e = window.event || e;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
  };
})();


export {
  BMapLib
}
<template>
  <Card :bordered="false" class="b-map">
    <div :id="id" class="map"></div>
  </Card>
</template>

<script>
  import icon from "@/assets/images/map/person_1_icon.png"
  import { BMapLib } from "./BMapLib"
  import { mergeObject, defineReactive } from "@/libs/tools"
  export default {
    name: 'b-map',
    props: {
      ops: {
        type: Object,
      },
      id: {
        type: String,
        default: "map",
      }
    },
    data() {
      return {
        map: '',
        guiji: [],
        options: {
          center: {
            lng: 116.3964,
            lat: 39.9093,
          },
          defaultZoom: 10,
          scrollZoom: true,
          markers: [{
            ops: {},
            data: [],
          }],
        },
      }
    },
    created() {
      this.ops = this.ops || {};
      Object.keys(this.ops).forEach(key => {
        {
          defineReactive(this.options, key, this.ops);
        }
      });
      mergeObject(this.ops, this.options, true)
    },
    mounted() {
      // this.$nextTick(function() {})
      this.init()
    },
    beforeDestroy() {},
    methods: {
      init() {
        let map = new BMap.Map(this.id)
        // console.log(this.options.center.lng + "," + this.options.center.lat)
        map.centerAndZoom(new BMap.Point(this.options.center.lng, this.options.center.lat), this.options.defaultZoom)
        if (this.options.scrollZoom) {
          map.enableScrollWheelZoom()
        }
        this.map = map
        // this.addMarker(this.options.markers)
        // this.addRoute()
        this.addMapRightClick()
        // this.lushu.start()
      },
      addMapRightClick() {
        let self = this
        var menu = new BMap.ContextMenu();
        var txtMenuItem = [{
            text: '恢复视图',
            callback: function() {
              self.map.reset()
            }
          }, {
            text: '拉框缩放',
            callback: function() {
              self.addDragZoom()
            }
          },
          {
            text: '鼠标测距',
            callback: function() {
              self.addDistanceTool()
            }
          },
          {
            text: '拾取坐标',
            callback: function() {
              self.addClickPoint()
            }
          },
          {
            text: '取消拾取坐标',
            callback: function() {
              self.removeClickPoint()
            }
          },
        ];
        for (var i = 0; i < txtMenuItem.length; i++) {
          menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
        }
        self.map.addContextMenu(menu);
      },
      addClickPoint() {
        this.map.addEventListener("click", this.getClickPoint);
      },
      removeClickPoint() {
        this.map.removeEventListener("click", this.getClickPoint);
      },
      addMarker(markers) {
        let self = this
        markers.data.forEach(function(v, i) {
          let marker = new BMap.Marker(self.getBMapPoint(v), markers.ops)
          markers.ops.icon_ && markers.ops.icon_.imageUrl ? marker.getIcon().setImageUrl(markers.ops.icon_.imageUrl) : ''
          markers.ops.icon_ && markers.ops.icon_.view ? marker.getIcon().setSize(new BMap.Size(markers.ops.icon_.view.width, markers.ops.icon_.view.height)) : ''
          markers.ops.icon_ && markers.ops.icon_.imageSize ? marker.getIcon().setImageSize(new BMap.Size(markers.ops.icon_.imageSize.width, markers.ops.icon_.imageSize.height)) : ''
          markers.ops.icon_ && markers.ops.icon_.offset ? marker.getIcon().setImageOffset(new BMap.Size(markers.ops.icon_.offset.width, markers.ops.icon_.offset.height)) : ''
          self.map.addOverlay(marker);
        })
      },
      clearOverlay() {
        this.map.clearOverlays()
      },
      addRoute(route) {
        let self = this
        // console.log("加载 route ……")
        let myIcon = new BMap.Icon(route.icon.imageUrl, route.icon.size);
        let drv = new BMap.DrivingRoute(self.map, {
          renderOptions: { map: self.map },
          onSearchComplete: function(res) {
            if (drv.getStatus() == BMAP_STATUS_SUCCESS) {
              var arrPois = res.getPlan(0).getRoute(0).getPath();
              self.map.addOverlay(new BMap.Polyline(arrPois, { strokeColor: '#111' }));
              self.map.setViewport(arrPois);
              let lushu = new BMapLib.LuShu(self.map, arrPois, {
                // defaultContent: "从天安门到百度大厦",
                speed: route.speed,
                icon: myIcon,
                enableRotation: true,
                autoView: true,
                landmarkPois: [
                  // { lng: 116.314782, lat: 39.913508, html: '加油站', pauseTime: 2 },
                ]
              });
              // lushu.start()
              self.guiji.push(lushu)
            }
          }
        });
        drv.search(self.getBMapPoint(route.start), self.getBMapPoint(route.end))
      },
      addDragZoom() {
        var myDrag = new BMapLib.RectangleZoom(this.map, {
          followText: "拖拽鼠标进行操作",
          autoClose: true,
        });
        myDrag.open(); //开启拉框放大
      },
      addDistanceTool() {
        var myDis = new BMapLib.DistanceTool(this.map);
        myDis.open(); //开启鼠标测距
      },
      getClickPoint(e) {
        console.log(e.point.lng + "," + e.point.lat)
      },
      getBMapPoint(point) {
        return new BMap.Point(point.lng, point.lat)
      },
      routeClear() {
        this.guiji = []
      },
      routePlay(f) {
        this.guiji.forEach(function(v) {
          v.start(f)
        })
      },
      routePause() {
        this.guiji.forEach(function(v) {
          v.pause()
        })
      },
      routeStop(f) {
        this.guiji.forEach(function(v) {
          v.stop(f)
        })
      },
    },
  }
</script>
<style lang="scss">
  .b-map {
    height: 100%;

    .ivu-card-body {
      height: 100%;
      padding: 0;

      .map {
        height: 100%;
        background: #000;
      }
    }

    .BMap_cpyCtrl {
      display: none;
    }

    .anchorBL {
      display: none;
    }
  }
</style>
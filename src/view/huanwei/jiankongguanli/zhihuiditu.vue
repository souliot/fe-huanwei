<template>
  <Card :bordered="false" class="zhdt">
    <Card :bordered="false" class="handler" :class="hidden">
      <Tabs size="small" @on-click="toggleTab">
        <TabPane label="车辆" name="car">
          <div class="tree-view">
            <vue-scroll :ops="scrollOps">
              <Tree :data="treeData" show-checkbox></Tree>
            </vue-scroll>
          </div>
        </TabPane>
        <TabPane label="人员" name="person">
          <div class="tree-view">
            <vue-scroll :ops="scrollOps">
              <Tree :data="treeData" show-checkbox></Tree>
            </vue-scroll>
          </div>
        </TabPane>
        <TabPane label="设施" name="facilities">
          <div class="tree-view">
            <vue-scroll :ops="scrollOps">
              <Tree :data="treeData" show-checkbox></Tree>
            </vue-scroll>
          </div>
        </TabPane>
      </Tabs>
      <div class="toggle" :class="arrow" @click="toggleHandler"></div>
    </Card>
    <BMap ref="bmap" :ops="ops"></BMap>
  </Card>
</template>

<script>
  import iconPerson from "@/assets/images/map/person_1_icon.png"
  import iconCar from "@/assets/images/car1/car_1_1.png"
  import iconGC from "@/assets/images/map/map_gc_icon.png"
  import iconZZ from "@/assets/images/map/map_zz_icon.png"
  import BMap from '_c/bmap'
  export default {
    name: 'zhdt',
    components: {
      BMap,
    },
    data() {
      return {
        hidden: '',
        arrow: 'left',
        markers: [{
          ops: {},
          data: [],
        }],
        handlerActive: false,
        scrollOps: {
          vuescroll: {},
          scrollPanel: {},
          rail: {
            gutterOfSide: '2px',
          },
          bar: {
            /** How long to hide bar after mouseleave, default -> 500 */
            showDelay: 500,
            /** Whether to show bar on scrolling, default -> true */
            onlyShowBarOnScroll: true,
            /** Whether to keep show or not, default -> false */
            keepShow: true,
            /** Bar's background , default -> #00a650 */
            background: 'rgba(255, 255, 255, 0.7)',
            /** Bar's opacity, default -> 1  */
            opacity: 1,
            /** Styles when you hover scrollbar, it will merge into the current style */
            hoverStyle: false
          }
        },
        treeData: [{
          title: '市容卫士',
          expand: true,
          children: [{
            title: '作业规划02',
            checked: true
          }, {
            title: '作业规划03',
            checked: true
          }, {
            title: '景阳东街',
            expand: true,
            children: [{
              title: '京原路',
              checked: true
            }]
          }, {
            title: '作业规划01',
            expand: true,
            children: [{
                title: '路段1',
                checked: true
              },
              {
                title: '路段2',
                checked: true
              }
            ]
          }, {
            title: '街道处',
            checked: true
          }, {
            title: '村镇处',
            checked: true
          }, {
            title: '保洁处',
            checked: true
          }, {
            title: '街道处',
            checked: true
          }, {
            title: '村镇处',
            checked: true
          }, {
            title: '保洁处',
            checked: true
          }, {
            title: '街道处',
            checked: true
          }, {
            title: '村镇处',
            checked: true
          }, {
            title: '保洁处',
            checked: true
          }, {
            title: '街道处',
            checked: true
          }, {
            title: '村镇处',
            checked: true
          }, {
            title: '保洁处',
            checked: true
          }, {
            title: '街道处',
            checked: true
          }, {
            title: '村镇处',
            checked: true
          }, {
            title: '保洁处',
            checked: true
          }, {
            title: '街道处',
            checked: true
          }, {
            title: '村镇处',
            checked: true
          }, {
            title: '保洁处',
            checked: true
          }, {
            title: '街道处',
            checked: true
          }, {
            title: '村镇处',
            checked: true
          }, {
            title: '保洁处',
            checked: true
          }, {
            title: '街道处',
            checked: true
          }, {
            title: '村镇处',
            checked: true
          }, {
            title: '保洁处',
            checked: true
          }, {
            title: '街道处',
            checked: true
          }, {
            title: '村镇处',
            checked: true
          }, {
            title: '保洁处',
            checked: true
          }, {
            title: '街道处',
            checked: true
          }, {
            title: '村镇处',
            checked: true
          }, {
            title: '保洁处',
            checked: true
          }, ]
        }],
        ops: {
          center: {
            lng: 116.43632,
            lat: 39.964876,
          },
          defaultZoom: 15,
          scrollZoom: false,
          markers: [{
            ops: {
              enableDragging: true,
              offset: {
                width: 0,
                height: -16,
              },
              icon_: {
                imageUrl: iconCar,
                view: {
                  width: 26,
                  height: 33,
                },
                // imageSize: {
                //   width: 235,
                //   height: 155,
                // },
                offset: {
                  width: 0,
                  height: 0,
                },
              }
            },
            data: [],
            // data: [{
            //   lng: 116.403766,
            //   lat: 39.915848,
            // }],
          }],
        }
      }
    },
    watch: {
      // 如果 `question` 发生改变，这个函数就会运行
      handlerActive: function(newVal, oldVal) {
        if (!newVal) {
          this.hidden = ''
          this.arrow = 'left'
        } else {
          this.hidden = 'hidden'
          this.arrow = 'right'
        }
      },
      markers: function(newVal, oldVal) {
        let self = this
        self.$refs.bmap.clearOverlay()
        newVal.forEach(function(v) {
          self.$refs.bmap.addMarker(v)
        })
      }
    },
    mounted() {

    },
    beforeDestroy() {},
    methods: {
      toggleHandler() {
        this.handlerActive = !this.handlerActive
      },
      toggleTab(name) {
        switch (name) {
          case 'car':
            this.markers = [{
              ops: {
                enableDragging: false,
                offset: {
                  width: 0,
                  height: -16,
                },
                icon_: {
                  imageUrl: iconCar,
                  view: {
                    width: 36,
                    height: 36,
                  },
                  // imageSize: {
                  //   width: 235,
                  //   height: 155,
                  // },
                  offset: {
                    width: 0,
                    height: 0,
                  },
                }
              },

              data: [{
                lng: 116.436823,
                lat: 39.964793,
              }, {
                lng: 116.446812,
                lat: 39.976848,
              }, {
                lng: 116.426187,
                lat: 39.980939,
              }],
            }]
            break;
          case 'person':
            this.markers = [{
              ops: {
                enableDragging: false,
                offset: {
                  width: 0,
                  height: -16,
                },
                icon_: {
                  imageUrl: iconPerson,
                  view: {
                    width: 26,
                    height: 33,
                  },
                  // imageSize: {
                  //   width: 235,
                  //   height: 155,
                  // },
                  offset: {
                    width: 0,
                    height: 0,
                  },
                }
              },
              data: [{
                lng: 116.436823,
                lat: 39.964793,
              }, {
                lng: 116.446812,
                lat: 39.976848,
              }, {
                lng: 116.426187,
                lat: 39.980939,
              }, {
                lng: 116.429565,
                lat: 39.960148,
              }],
            }]
            break;
          case 'facilities':
            this.markers = [{
                ops: {
                  enableDragging: false,
                  offset: {
                    width: 0,
                    height: -16,
                  },
                  icon_: {
                    imageUrl: iconGC,
                    view: {
                      width: 26,
                      height: 33,
                    },
                    // imageSize: {
                    //   width: 235,
                    //   height: 155,
                    // },
                    offset: {
                      width: 0,
                      height: 0,
                    },
                  }
                },
                data: [{
                  lng: 116.436823,
                  lat: 39.964793,
                }, {
                  lng: 116.446812,
                  lat: 39.976848,
                }, ],
              },
              {
                ops: {
                  enableDragging: false,
                  offset: {
                    width: 0,
                    height: -16,
                  },
                  icon_: {
                    imageUrl: iconZZ,
                    view: {
                      width: 26,
                      height: 33,
                    },
                    // imageSize: {
                    //   width: 235,
                    //   height: 155,
                    // },
                    offset: {
                      width: 0,
                      height: 0,
                    },
                  }
                },
                data: [{
                  lng: 116.426187,
                  lat: 39.980939,
                }, {
                  lng: 116.459101,
                  lat: 39.956829,
                }, {
                  lng: 116.449399,
                  lat: 39.946099,
                }, ],
              },
            ]
            break;
        }
      },
      clear() {
        this.$refs.bmap.removeMarker(this.markers)
      },
    },
  }
</script>
<style lang="scss">
  .zhdt {
    height: 100%;


    .ivu-card-body {
      height: 100%;
      padding: 2px;

      .handler {
        position: absolute;
        height: 98%;
        width: 240px;
        left: 10px;
        top: 1%;
        padding: 14px 10px;
        z-index: 9;
        transition: all 0.5s ease;
        background-color: rgba(100, 100, 100, .9);
        // opacity: .6;

        .ivu-tabs {
          height: 100%;
          color: #fff;

          .ivu-tabs-nav {
            width: 100%;


            .ivu-tabs-tab {
              width: 33.333%;
              text-align: center;
            }
          }

          .ivu-tabs-content {
            height: calc(100% - 50px);

            .ivu-tabs-tabpane {
              height: 100%;

              .tree-view {
                height: 100%;

                .ivu-tree-title {
                  color: #fff;
                }
              }
            }
          }
        }

        .toggle {
          position: absolute;
          width: 0;
          height: 0;
          bottom: 0;
          // background-color: rgba(0, 0, 0, 0.8);
          opacity: .6;

          &.left {
            box-sizing: content-box;
            height: 10px;
            right: -9px;
            border-top: 7px solid transparent;
            border-bottom: 7px solid transparent;
            border-right: 9px solid #282c34;
          }

          &.right {
            right: -15px;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-left: 10px solid #282c34;
          }
        }

        .toggle:hover {
          cursor: pointer;
        }

        &.hidden {
          width: 0;
          left: 0;
          padding: 0;
        }
      }
    }
  }
</style>
<style scoped>

</style>
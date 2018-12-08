<template>
  <Card :bordered="false" class="lsgj">
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
      </Tabs>
      <Divider />
      <Form ref="queryForm" :model="queryForm" :label-width="48">
        <FormItem prop="startTime" label="开始：">
          <DatePicker type="datetime" v-model="queryForm.startTime" placeholder="开始时间" size="small"></DatePicker>
        </FormItem>
        <FormItem prop="endTime" label="结束：">
          <DatePicker type="datetime" v-model="queryForm.endTime" placeholder="结束时间" size="small"></DatePicker>
        </FormItem>
      </Form>
      <div class="formHandler">
        <Button type="primary" size="small">查询</Button>
      </div>
      <Row type="flex" justify="space-around" class="code-row-bg">
        <Col span="4">
        <Icon :type="playActive?'md-pause':'md-play'" @click="play" />
        </Col>
        <!-- <Col span="4">
        <Icon type="md-pause" @click="pause" />
        </Col> -->
        <Col span="4">
        <Icon type="md-square" @click="stop" />
        </Col>
      </Row>
      <div class="toggle" :class="arrow" @click="toggleHandler"></div>
    </Card>
    <BMap ref="bmap" :ops="ops"></BMap>
  </Card>
</template>

<script>
  import iconPerson from "@/assets/images/map/person_1_icon.png"
  import iconCar from "@/assets/images/car1/car_1_3.png"
  import BMap from '_c/bmap'
  export default {
    name: 'lsgj',
    components: {
      BMap,
    },
    data() {
      return {
        hidden: '',
        arrow: 'left',
        guiji: [],
        handlerActive: false,
        playActive: false,
        queryForm: {
          startTime: '',
          endTime: '',
        },
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
      guiji: function(newVal, oldVal) {
        let self = this
        self.$refs.bmap.clearOverlay()
        newVal.forEach(function(v) {
          // console.log(v)
          self.$refs.bmap.addRoute(v)
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
        this.playActive = false
        switch (name) {
          case 'car':
            this.$refs.bmap.routeClear()
            this.guiji = [{
              start: {
                lng: 116.431074,
                lat: 39.949916,
              },
              end: {
                lng: 116.460035,
                lat: 39.957936,
              },
              icon: {
                imageUrl: iconCar,
                size: {
                  width: 36,
                  height: 36,
                },
              },
              speed: 1000,
            }]
            break;
          case 'person':
            this.$refs.bmap.routeClear()
            this.guiji = [{
              start: {
                lng: 116.431074,
                lat: 39.949916,
              },
              end: {
                lng: 116.417995,
                lat: 39.985749,
              },
              icon: {
                imageUrl: iconPerson,
                size: {
                  width: 26,
                  height: 33,
                },
              },
              speed: 1000,
            }]
            break;
        }
      },
      clear() {
        this.$refs.bmap.removeMarker(this.markers)
      },
      play() {
        let self = this
        this.playActive = !this.playActive
        this.playActive ?
          this.$refs.bmap.routePlay(() => {
            self.playActive = false
          }) :
          this.$refs.bmap.routePause()
      },
      stop() {
        let self = this
        this.$refs.bmap.routeStop(() => {
          self.playActive = false
        })
      },
    },
  }
</script>
<style lang="scss">
  .lsgj {
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
          height: calc(100% - 174px);
          color: #fff;

          .ivu-tabs-nav {
            width: 100%;


            .ivu-tabs-tab {
              width: 50%;
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

        .ivu-divider-horizontal {
          margin: 10px 0;
        }

        .ivu-form {
          .ivu-form-item {
            margin-bottom: 5px;

            .ivu-form-item-label {
              padding: 10px 0;
              color: #fff;
            }
          }
        }

        .formHandler {
          text-align: center;
          padding: 5px 0;

          .ivu-btn {
            width: 50%;
          }
        }

        .ivu-row-flex {
          height: 50px;
          font-size: 24px;
          color: #fff;

          .ivu-col {
            display: flex;
            justify-content: center;
            align-items: center;

            .ivu-icon:hover {
              cursor: pointer;
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
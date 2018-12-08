<template>
  <div class="index">
    <Row class="header">
      <Col span="5" class="time">
      {{ date }}
      </Col>
      <Col span="14" class="title">
      <img :src="logo" alt="">
      </Col>
      <Col span="5" class="menu">
      <Dropdown trigger="click" @on-click="menuClick">
        <a href="javascript:void(0)">
          <Icon type="md-settings"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="add">添加容器</DropdownItem>
          <DropdownItem name="system">管理中心</DropdownItem>
          <DropdownItem name="logout">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
    </Row>
    <Row v-for="row,index_row in rows" :key="index_row" class="container" :style="{height:row.height,marginBottom:index_row==rows.length-1 ? '30px':'0' }">
      <Col :span="col.span" v-for="col,index_col in row.cols" :key="index_col" :style="{height:col.height}">
      <Card :bordered="false">
        <span slot="title">{{ col.title }}</span>
        <vue-scroll :ops="ops">
          <iframe allowtransparency="true" frameborder="0" width="410" height="100%" scrolling="no" src="//tianqi.eastday.com/plugin/widget_v1.html?sc=1&z=3&t=1&v=0&d=2&bd=0&k=000000&f=ffffff&q=1&a=1&c=54511&w=410&h=98&align=center"></iframe>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>

        </vue-scroll>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import logo from "@/assets/images/index/logo.png";
  export default {
    name: "index",
    data() {
      return {
        logo,
        date: "",
        ops: {
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
            keepShow: false,
            /** Bar's background , default -> #00a650 */
            background: '#4d67b5',
            /** Bar's opacity, default -> 1  */
            opacity: 1,
            /** Styles when you hover scrollbar, it will merge into the current style */
            hoverStyle: false
          }
        },
        rows: [{
          height: '45%',
          cols: [{
            span: 16,
            title: "待整改稽查事件实时追踪情况",
            height: '100%',
          }, {
            span: 8,
            title: "天气预报",
            height: '40%',
          }, {
            span: 8,
            title: "出勤情况",
            height: '60%',
          }]
        }, {
          height: '45%',
          cols: [{
            span: 24,
            title: "当月各区域稽查事件趋势统计",
            height: '100%',
          }]
        }, {
          height: '40%',
          cols: [{
            span: 8,
            title: "今日稽查事件数量统计",
            height: '100%',
          }, {
            span: 8,
            title: "当月稽查事件考核量统计",
            height: '100%',
          }, {
            span: 8,
            title: "当月稽查事件占比统计",
            height: '100%',
          }]
        }, {
          height: '45%',
          cols: [{
            span: 24,
            title: "环卫作业车辆状态实时追踪情况",
            height: '100%',
          }]
        }, ],
      };
    },
    mounted() {
      this.getDate()
    },
    methods: {
      ...mapActions([
        'handleLogOut'
      ]),
      home() {
        this.$router.push({
          name: this.$config.homeName
        });
      },
      getDate() {
        var date = new Date()

        var year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate()

        this.date = year + "年" + month + "月" + day + "日"
      },
      menuClick(name) {
        switch (name) {
          case 'system':
            this.$router.push({
              name: this.$config.homeName
            })
            break
          case 'logout':
            this.handleLogOut().then(() => {
              this.$router.push({
                name: 'login'
              })
            })
            break
        }
      },
    }
  };
</script>

<style lang="scss">
  .index {
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/index/bg_body.png");
    background-size: cover;
    background-position: center;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;

    .header {
      height: 80px;
      padding: 0 30px;

      .time {
        color: #36c9f7;
        line-height: 60px;
        font-size: 20px;
      }

      .title {
        display: inline-block;
        height: 100%;
        margin: 0 auto;
        background: url("../assets/images/index/top.png") no-repeat center;
        background-size: 100% 100%;
        text-align: center;

        img {
          margin: 15px auto;
        }
      }

      .menu {
        color: #36c9f7;
        padding: 15px 0;
        font-size: 20px;
        text-align: right;

        i {
          &:hover {
            cursor: pointer;
          }
        }

        .ivu-select-dropdown {
          text-align: center;
          background: url("../assets/images/index/bg_menu.png") no-repeat center;
          background-size: 100% 100%;
          border-radius: 0;

          .ivu-dropdown-item {
            color: #fff;

            &:hover {
              background: url("../assets/images/index/bgactive.png") no-repeat center;
              background-size: 100% 100%;
            }
          }
        }
      }
    }

    .container {
      height: 50%;
      padding: 0 30px;

      .ivu-col {
        padding: 8px;
      }

      .ivu-card {
        height: 100%;
        background: rgba(14, 23, 40, 0.7);
        border-radius: 0;
        color: white;

        .ivu-card-head {
          border-bottom: none;
          font-size: 16px;
          text-align: center;
          height: 36px;
          line-height: 36px;
          padding: 0 10px;
          background: url("../assets/images/index/big.png") no-repeat center -3px;
          background-size: 100% 7px;
        }

        .ivu-card-body {
          padding: 0 0 10px;
          height: calc(100% - 36px);
        }
      }
    }
  }
</style>
<template>
  <Card :bordered="false" class="gzkb">
    <Tabs ref="tab" v-model="currentTab">
      <TabPane label="清扫看板" name="qingsao">
        <Row :gutter="20">
          <Col :xs="4" :md="4" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
          <InforCard shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
            <CountTo :end="infor.count" count-class="count-style" />
            <p>{{ infor.title }}</p>
          </InforCard>
          </Col>
        </Row>
        <Row :gutter="20" class="detail">
          <Col :lg="12">
          <tables class="left-table" border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
          </Col>
          <Col :lg="12">
          <BMap ref="bmap" :id="map[0]" :ops="ops"></BMap>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="洒水看板" name="sashui">
        <Row :gutter="20">
          <Col :xs="4" :md="4" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
          <InforCard shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
            <CountTo :end="infor.count" count-class="count-style" />
            <p>{{ infor.title }}</p>
          </InforCard>
          </Col>
        </Row>
        <Row :gutter="20" class="detail">
          <Col :lg="12">
          <tables class="left-table" border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
          </Col>
          <Col :lg="12">
          <BMap ref="bmap" :id="map[1]" :ops="ops"></BMap>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="除雪看板" name="chuxue">
        <Row :gutter="20">
          <Col :xs="4" :md="4" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
          <InforCard shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
            <CountTo :end="infor.count" count-class="count-style" />
            <p>{{ infor.title }}</p>
          </InforCard>
          </Col>
        </Row>
        <Row :gutter="20" class="detail">
          <Col :lg="12">
          <tables class="left-table" border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
          </Col>
          <Col :lg="12">
          <BMap ref="bmap" :id="map[2]" :ops="ops"></BMap>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </Card>
</template>


<script>
  import Tables from "_c/tables";
  import InforCard from "_c/info-card";
  import CountTo from "_c/count-to";
  import BMap from "_c/bmap";
  import { getAllFiles, uploadFile } from "@/api/data";
  export default {
    name: "gzkb",
    components: {
      Tables,
      InforCard,
      CountTo,
      BMap
    },
    data() {
      return {
        map: ["qingsao", "sashui", "chuxue"],
        currentTab: "qingsao",
        inforCardData: [{
            title: "清扫车总量(辆)",
            icon: "md-person-add",
            count: 5,
            color: "#2d8cf0"
          },
          {
            title: "总出勤数(辆)",
            icon: "md-locate",
            count: 3,
            color: "#19be6b"
          },
          {
            title: "总工时(h)",
            icon: "md-help-circle",
            count: 142,
            color: "#ff9900"
          },
          {
            title: "有效工时(h)",
            icon: "md-share",
            count: 140,
            color: "#ed3f14"
          },
          {
            title: "总里程(km)",
            icon: "md-chatbubbles",
            count: 500,
            color: "#E46CBB"
          },
          { title: "有效里程(km)", icon: "md-map", count: 400, color: "#9A66E4" }
        ],
        data_list: [],
        c_data_list: [{
            title: "序号",
            type: "index",
            width: 70,
            align: "center"
          },
          {
            title: "车牌号",
            key: "name",
            align: "center"
          },
          {
            title: "总工时(h)",
            key: "name",
            align: "center"
          },
          {
            title: "有效工时(h)",
            key: "name",
            align: "center"
          },
          {
            title: "总里程(km)",
            key: "name",
            align: "center"
          },
          {
            title: "有效里程(km)",
            key: "name",
            align: "center"
          },
          {
            title: "工作状态",
            key: "name",
            align: "center"
          }
        ],
        ops: {
          center: {
            lng: 116.43632,
            lat: 39.964876
          },
          defaultZoom: 15,
          scrollZoom: false,
          markers: [{
            ops: {},
            data: []
          }]
        }
      };
    },
    mounted() {},
    methods: {}
  };
</script>
<style lang="scss">
  .gzkb {
    height: 100%;

    .ivu-card-body {
      height: 100%;

      .ivu-tabs {
        height: 100%;

        .ivu-tabs-content {
          height: calc(100% - 53px);

          .detail {
            height: calc(100% - 120px);

            .ivu-col {
              height: 100%;

              .left-table {
                height: 100%;
              }

              .ivu-table-cell {
                padding: 0;
              }
            }
          }
        }
      }
    }

    .info-card-wrapper {
      .content-con {
        .right-area {
          background-color: #f5f7f9;

          .count-style {
            font-size: 50px;
          }
        }
      }
    }
  }
</style>
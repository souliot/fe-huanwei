<template>
  <Card :bordered="false" class="sygj">
    <Row :gutter="20" class="detail">
      <Col :lg="12">
      <tables class="left-table" border ref="t_car_list" v-model="car_list" :columns="c_car_list" />
      <tables class="left-table" border ref="t_device_list" v-model="device_list" :columns="c_device_list" />
      </Col>
      <Col :lg="12">
      <BMap ref="bmap" :ops="ops"></BMap>
      </Col>
    </Row>
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  import InforCard from '_c/info-card'
  import CountTo from '_c/count-to'
  import BMap from '_c/bmap'
  import { getAllFiles, uploadFile } from '@/api/data'
  export default {
    name: 'sygj',
    components: {
      Tables,
      InforCard,
      CountTo,
      BMap,
    },
    data() {
      return {
        currentTab: "qingsao",
        inforCardData: [
          { title: '清扫车总量(辆)', icon: 'md-person-add', count: 5, color: '#2d8cf0' },
          { title: '总出勤数(辆)', icon: 'md-locate', count: 3, color: '#19be6b' },
          { title: '总工时(h)', icon: 'md-help-circle', count: 142, color: '#ff9900' },
          { title: '有效工时(h)', icon: 'md-share', count: 140, color: '#ed3f14' },
          { title: '总里程(km)', icon: 'md-chatbubbles', count: 500, color: '#E46CBB' },
          { title: '有效里程(km)', icon: 'md-map', count: 400, color: '#9A66E4' }
        ],
        car_list: [],
        device_list: [],
        c_car_list: [{
            title: '序号',
            type: 'index',
            width: 50,
            align: 'center',
          },
          {
            title: '车牌号',
            key: 'name',
            align: 'center',
          },
          {
            title: '部门',
            key: 'name',
            align: 'center',
          },
          {
            title: '车辆类型',
            key: 'name',
            align: 'center',
          },
          {
            title: '收运时间',
            key: 'name',
            align: 'center',
          },
          {
            title: '收运数量',
            key: 'name',
            align: 'center',
          },
        ],
        c_device_list: [{
            title: '序号',
            type: 'index',
            width: 50,
            align: 'center',
          },
          {
            title: '车牌号',
            key: 'name',
            align: 'center',
          },
          {
            title: '垃圾桶',
            key: 'name',
            align: 'center',
          },
          {
            title: '地址',
            key: 'name',
            align: 'center',
          },
          {
            title: '收运时间',
            key: 'name',
            align: 'center',
          },
        ],
        ops: {
          center: {
            lng: 116.43632,
            lat: 39.964876,
          },
          defaultZoom: 15,
          scrollZoom: false,
          markers: [{
            ops: {},
            data: [],
          }],
        }
      }
    },
    mounted() {},
    methods: {

    },
  }
</script>
<style lang="scss">
  .sygj {
    height: 100%;

    .ivu-card-body {
      height: 100%;

      .detail {
        height: 100%;

        .ivu-col {
          height: 100%;

          .left-table {
            height: 50%;
          }

          .ivu-table-cell {
            padding: 0;
          }
        }
      }
    }
  }
</style>
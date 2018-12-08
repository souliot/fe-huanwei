<template>
  <Card :bordered="false" class="ddgl">
    <Row :gutter="20" class="detail">
      <Col :lg="12">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="branch">
          <AutoComplete v-model="formInline.branch" placeholder="请选择部门" size="small">
            <Tree :data="treeData" multiple @on-select-change="handlerTreeData"></Tree>
          </AutoComplete>
        </FormItem>
        <FormItem prop="number">
          <Select v-model="formInline.number" style="width:150px" size="small">
            <Option v-for="item in numberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="info" size="small" @click="handleSubmit('formInline')">查询</Button>
        </FormItem>
      </Form>
      <Divider />
      <div class="handler">
        <span>
          当前在线车辆<Badge :count="4" type="primary"></Badge>辆，
          行驶中<Badge :count="1" type="success"></Badge>辆，
          静止<Badge :count="3" type="info"></Badge>辆，
          离线<Badge :count="5" type="warning"></Badge>辆，
        </span>
      </div>
      <tables class="left-table" border ref="t_car_list" v-model="car_list" :columns="c_car_list" />
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
    name: 'ddgl',
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
        formInline: {
          branch: '',
          type: 'default',
          number: 'default',
          report: 1,
          startDate: '',
          endDate: '',
        },
        ruleInline: {

        },
        treeData: [{
          title: '市容卫士',
          expand: true,
          children: [{
              title: '景阳东街作业段',
              expand: true,
              children: [{
                title: '京原路',
              }]
            },
            {
              title: '街道处',
            },
            {
              title: '村镇处',
            },
            {
              title: '保洁处',
            }
          ]
        }],
        numberList: [{
            value: 'default',
            label: '请选择车牌号',
          },
          {
            value: 1,
            label: '京EH0012',
          },
          {
            value: 2,
            label: '京EH0013',
          },
          {
            value: 3,
            label: '京EH0014',
          },
          {
            value: '4',
            label: '京EH0015',
          },
        ],
        car_list: [],
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
            title: '行驶状态',
            key: 'name',
            align: 'center',
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text',
                  ghost: true
                },
                on: {
                  'click': () => {

                  }
                }
              }, [
                h('Icon', {
                  props: {
                    type: 'ios-navigate',
                    size: 18,
                    color: '#2D8cF0'
                  }
                })
              ])
            },
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
      handlerTreeData(value) {
        this.formInline.branch = value.map(_ => _.title).toString();
      },

    },
  }
</script>
<style lang="scss">
  .ddgl {
    height: 100%;

    .ivu-card-body {
      height: 100%;

      .detail {
        height: 100%;

        .ivu-col {
          height: 100%;

          .ivu-form-item {
            margin-bottom: 0;
          }

          .handler {
            margin-bottom: 5px;
          }

          .ivu-divider-horizontal {
            margin: 5px 0;
          }

          .left-table {
            height: calc(100% - 60px);
          }

          .ivu-table-cell {
            padding: 0;
          }
        }
      }
    }
  }
</style>
<template>
  <Card :bordered="false" class="csyj">
    <Tabs ref="tab" v-model="currentTab">
      <TabPane label="预警统计" name="tongji">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="number">
            <Select v-model="formInline.number" style="width:150px" size="small">
              <Option v-for="item in numberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="branch">
            <AutoComplete v-model="formInline.branch" placeholder="请选择部门" size="small">
              <Tree :data="treeData" multiple @on-select-change="handlerTreeData"></Tree>
            </AutoComplete>
          </FormItem>
          <FormItem prop="startTime">
            <DatePicker type="daterange" placeholder="时间范围" size="small"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="info" size="small" @click="handleSubmit('formInline')">查询</Button>
          </FormItem>
          <FormItem style="float:right;">
            <Button type="success" size="small" icon="md-share-alt">导出</Button>
          </FormItem>
        </Form>
        <Divider />
        <ChartBar style="height: 300px;" :value="barData" text="超速预警统计" yname="次数(次)" />
        <tables class="bottom-table" border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
      </TabPane>
      <TabPane label="预警明细" name="mingxi">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="number">
            <Select v-model="formInline.number" style="width:150px" size="small">
              <Option v-for="item in numberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="branch">
            <AutoComplete v-model="formInline.branch" placeholder="请选择部门" size="small">
              <Tree :data="treeData" multiple @on-select-change="handlerTreeData"></Tree>
            </AutoComplete>
          </FormItem>
          <FormItem prop="startTime">
            <DatePicker type="daterange" placeholder="时间范围" size="small"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="info" size="small" @click="handleSubmit('formInline')">查询</Button>
          </FormItem>
          <FormItem style="float:right;">
            <Button type="success" size="small" icon="md-share-alt">导出</Button>
          </FormItem>
        </Form>
        <Divider />
        <div class="handler">
          <Button type="warning" size="small" icon="md-trash">批量删除</Button>
        </div>
        <tables class="full-table" border ref="t_detail_list" v-model="detail_list" :columns="c_detail_list" />
      </TabPane>
    </Tabs>
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  import { ChartBar } from '_c/charts'
  export default {
    name: "csyj",
    components: {
      Tables,
      ChartBar
    },
    data() {
      return {
        currentTab: 'tongji',
        data_list: [],
        c_data_list: [{
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center'
          },
          {
            title: '车牌号码',
            key: 'name',
            align: 'center',
          },
          {
            title: '公司名称',
            key: 'name',
            align: 'center',
          },
          {
            title: '部门名称',
            key: 'name',
            align: 'center',
          },
          {
            title: '预警开始时间段',
            key: 'name',
            align: 'center',
          },
          {
            title: '预警开始时间段',
            key: 'name',
            align: 'center',
          },
          {
            title: '预警次数',
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
          }
        ],
        detail_list: [],
        c_detail_list: [{
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center'
          },
          {
            title: '车牌号码',
            key: 'name',
            align: 'center',
          },
          {
            title: '部门名称',
            key: 'name',
            align: 'center',
          },
          {
            title: '限制速度(km/h)',
            key: 'name',
            align: 'center',
          },
          {
            title: '实际速度(km/h)',
            key: 'name',
            align: 'center',
          },
          {
            title: '预警时间',
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
          }
        ],
        formInline: {
          number: 'default',
          branch: '',
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
          }, {
            title: '街道处',
          }, {
            title: '村镇处',
          }, {
            title: '保洁处',
          }, ]
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
        barData: {
          张三: 16,
          李四: 10,
          王五: 11,
          刘小二: 14,
          张小三: 6,
          李小四: 9,
          刘大二: 3,
          张大三: 7,
          李大四: 2,
          王小五: 16
        },
      }
    },
    mounted() {},
    methods: {
      handlerTreeData(value) {
        this.formInline.branch = value.map(_ => _.title).toString();
      },
    }
  };
</script>

<style lang="scss">
  .csyj {
    height: 100%;

    .ivu-card-body {
      height: inherit;
      padding: 10px 16px;

      .ivu-tabs {
        height: 100%;

        .ivu-tabs-content {
          height: calc(100% - 53px);

          .bottom-table {
            height: calc(100% - 343px);

            .ivu-table-cell {
              padding: 0;
            }
          }

          .full-table {
            height: calc(100% - 72px);

            .ivu-table-cell {
              padding: 0;
            }
          }

          .ivu-form-item {
            margin-bottom: 0;
          }

          .ivu-divider-horizontal {
            margin: 5px 0;
          }

          .handler {
            margin-bottom: 5px;
          }

        }
      }


    }

  }
</style>
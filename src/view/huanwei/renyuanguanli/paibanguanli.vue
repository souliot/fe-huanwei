<template>
  <Row :gutter="16" class="pbgl">
    <Col span="4" class="left">
    <Card :bordered="false">
      <Form ref="formInline" :model="formItem" :rules="ruleInline" :label-width="60">
        <FormItem label="路段等级:" prop="level">
          <Select v-model="formItem.level" size="small">
            <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="路段属性:" prop="property">
          <Select v-model="formItem.property" size="small">
            <Option v-for="item in propertyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="路段类型:" prop="type">
          <Select v-model="formItem.type" size="small">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="search" class="search">
          <Input v-model="formItem.search" placeholder="请输入关键字..." size="small" clearable></Input>
        </FormItem>
      </Form>
      <Divider />
      <div class="tree-view">
        <vue-scroll :ops="ops">
          <Tree :data="treeData" show-checkbox></Tree>
        </vue-scroll>
      </div>
    </Card>
    </Col>
    <Col span="20">
    <Card :bordered="false">
      <div class="handler">
        <Button type="success" size="small" icon="ios-add-circle-outline">新增</Button>
      </div>
      <tables border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
    </Card>
    </Col>
  </Row>
</template>

<script>
  import Tables from '_c/tables'
  export default {
    name: "pbgl",
    components: {
      Tables
    },
    data() {
      return {
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
            background: 'rgba(100, 100, 100, 0.1)',
            /** Bar's opacity, default -> 1  */
            opacity: 1,
            /** Styles when you hover scrollbar, it will merge into the current style */
            hoverStyle: false
          }
        },
        data_list: [],
        c_data_list: [{
          title: '序号',
          type: 'index',
          width: 70,
          fixed: 'left',
          align: 'center',
        }, {
          title: '路段名称',
          key: 'name',
          fixed: 'left',
          align: 'center',
        }, {
          title: '作业类型',
          key: 'level',
          align: 'center',
        }, {
          title: '作业频次(天)',
          key: 'property',
          align: 'center',
        }, {
          title: '作业时间',
          key: 'type',
          align: 'center',
        }, {
          title: '作业有效期',
          key: 'length',
          align: 'center',
        }, {
          title: '工作日',
          key: 'name',
          align: 'center',
        }, {
          title: '选择车辆',
          key: 'name',
          align: 'center',
        }, {
          title: '选择司机',
          key: 'name',
          align: 'center',
        }, {
          title: '排班状态',
          key: 'name',
          align: 'center',
        }, {
          title: '操作',
          key: 'handle',
          fixed: 'right',
          align: 'center',
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  }
                }, '路段信息')
              ])
            },
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, '开始排班')
              ])
            },
          ],
        }, ],
        formItem: {
          level: '',
          property: '',
          type: '',
          search: '',
        },
        ruleInline: {

        },
        levelList: [{
            value: 'default',
            label: '请选择类型',
          },
          {
            value: '1',
            label: '一级',
          },
          {
            value: '2',
            label: '二级',
          },
          {
            value: '3',
            label: '三级',
          },
        ],
        propertyList: [{
            value: 'default',
            label: '请选择类型',
          },
          {
            value: '1',
            label: '主干道',
          },
          {
            value: '2',
            label: '次干道',
          },
          {
            value: '3',
            label: '分支',
          },
        ],
        typeList: [{
            value: 'default',
            label: '请选择类型',
          },
          {
            value: '1',
            label: '地面道路',
          },
          {
            value: '2',
            label: '高架道路',
          },
        ],
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
          }, ]
        }],
      }
    },
    mounted() {},
    methods: {

    }
  };
</script>

<style lang="scss">
  .pbgl {
    height: 100%;

    .left {
      .search .ivu-form-item-content {
        margin-left: 0 !important;
      }

      .tree-view {
        height: calc(100% - 200px) !important;
      }

      .ivu-form-item {
        margin-bottom: 5px;
      }

      .ivu-form .ivu-form-item-label {
        padding-right: 5px;
      }

      .ivu-divider-horizontal {
        margin: 5px 0;
      }
    }

    .ivu-col,
    .ivu-card {
      height: inherit;

      .ivu-card-body {
        height: inherit;
        padding: 10px 16px;

        .handler {
          margin-bottom: 5px;
        }

        .ivu-table-cell {
          padding: 0;
        }
      }
    }

  }
</style>
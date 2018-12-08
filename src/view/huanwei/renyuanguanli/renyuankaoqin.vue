<template>
  <Card :bordered="false" class="rykq">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="name">
        <Input v-model="formInline.name" size="small" placeholder="人员姓名" clearable />
      </FormItem>
      <FormItem prop="position">
        <Input v-model="formInline.position" size="small" placeholder="职务名称" clearable />
      </FormItem>
      <FormItem prop="startTime">
        <DatePicker type="datetime" v-model="formInline.startTime" placeholder="开始时间" size="small"></DatePicker>
      </FormItem>
      <FormItem prop="endTime">
        <DatePicker type="datetime" v-model="formInline.endTime" placeholder="结束时间" size="small"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="info" size="small" @click="handleSubmit('formInline')">查询</Button>
      </FormItem>
    </Form>
    <Divider />
    <div class="handler">
      <Button type="warning" size="small" icon="md-trash">批量删除</Button>
    </div>
    <tables border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  export default {
    name: "rykq",
    components: {
      Tables
    },
    data() {
      return {
        data_list: [],
        c_data_list: [{
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        }, {
          title: '姓名',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '职务',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '部门',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '到岗时间',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '离岗时间',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '在岗时间',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '操作',
          key: 'handle',
          width: 140,
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
                }, '编辑')
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
                }, '删除')
              ])
            },
          ]
        }],
        formInline: {
          name: '',
          position: '',
          startTime: '',
          endTime: '',
        },
        ruleInline: {

        },
        typeList: [{
            value: 'default',
            label: '请选择类型',
          },
          {
            value: '1',
            label: '垃圾转运',
          },
          {
            value: '2',
            label: '清运保洁',
          },
          {
            value: '3',
            label: '园林绿化',
          },
          {
            value: '4',
            label: '公测保洁',
          },
        ],
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
  .rykq {
    height: 100%;

    .ivu-card-body {
      height: inherit;
      padding: 10px 16px;

      .ivu-form-item {
        margin-bottom: 0;
      }

      .ivu-divider-horizontal {
        margin: 5px 0;
      }

      .handler {
        margin-bottom: 5px;
      }

      .ivu-table-cell {
        padding: 0;
      }
    }

  }
</style>
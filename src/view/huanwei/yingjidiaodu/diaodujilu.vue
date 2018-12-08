<template>
  <Card :bordered="false" class="ddjl">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="number">
        <Select v-model="formInline.number" style="width:150px" size="small">
          <Option v-for="item in numberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
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
      <Button type="success" size="small" icon="md-share-alt" style="float:right;">导出</Button>
    </div>
    <tables border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  export default {
    name: "ddjl",
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
          number: 'default',
          startTime: '',
          endTime: '',
        },
        ruleInline: {

        },
        numberList: [{
            value: 'default',
            label: '请选择车辆',
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
  .ddjl {
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
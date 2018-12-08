<template>
  <Card :bordered="false" class="khbz">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="type">
        <Select v-model="formInline.type" style="width:150px" size="small">
          <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="title">
        <Input v-model="formInline.title" size="small" placeholder="内容名称" clearable />
      </FormItem>
      <FormItem prop="detail">
        <Input v-model="formInline.detail" size="small" placeholder="详细内容" clearable />
      </FormItem>
      <FormItem>
        <Button type="info" size="small" @click="handleSubmit('formInline')">查询</Button>
      </FormItem>
    </Form>
    <Divider />
    <div class="handler">
      <Button type="success" size="small" icon="ios-add-circle-outline">新增</Button>
      <Button type="warning" size="small" icon="md-trash" style="margin-left:20px">批量删除</Button>
    </div>
    <tables border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  export default {
    name: "khbz",
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
          title: '事件类型',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '内容名称',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '详细内容',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '分数',
          key: 'name',
          width: 80,
          align: 'center',
          sortable: true
        }, {
          title: '是否待整改',
          key: 'name',
          width: 120,
          align: 'center',
          sortable: true
        }, {
          title: '待整改时间(分)',
          key: 'name',
          width: 140,
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
          type: '',
          title: '',
          detail: '',
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
      }
    },
    mounted() {},
    methods: {

    }
  };
</script>

<style lang="scss">
  .khbz {
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
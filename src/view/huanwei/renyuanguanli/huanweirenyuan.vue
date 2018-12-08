<template>
  <Card :bordered="false" class="hwry">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="type">
        <AutoComplete v-model="formInline.branch" placeholder="请选择部门" size="small">
          <Tree :data="treeData" multiple @on-select-change="handlerTreeData"></Tree>
        </AutoComplete>
      </FormItem>
      <FormItem prop="name">
        <Input v-model="formInline.name" size="small" placeholder="人员姓名" clearable />
      </FormItem>
      <FormItem prop="phone">
        <Input v-model="formInline.phone" size="small" placeholder="手机号" clearable />
      </FormItem>
      <FormItem prop="identify">
        <Input v-model="formInline.identify" size="small" placeholder="身份证编号" clearable />
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
    name: "hwry",
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
        }, {
          title: '年龄',
          key: 'name',
          width: 80,
          align: 'center',
        }, {
          title: '所属部门',
          key: 'name',
          align: 'center',
        }, {
          title: '职务',
          key: 'name',
          align: 'center',
        }, {
          title: '手机号码',
          key: 'name',
          align: 'center',
        }, {
          title: '身份证号',
          key: 'name',
          align: 'center',
        }, {
          title: '最后上报时间',
          key: 'name',
          align: 'center',
        }, {
          title: '创建时间',
          key: 'name',
          align: 'center',
        }, {
          title: '人员图片',
          key: 'name',
          align: 'center',
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
          branch: '',
          name: '',
          phone: '',
          identify: '',
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
  .hwry {
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
<template>
  <Card :bordered="false" class="ztjl">
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
      <FormItem prop="userNumber">
        <Input v-model="formInline.userNumber" size="small" placeholder="员工编号" clearable />
      </FormItem>
      <FormItem prop="deviceNumber">
        <Input v-model="formInline.deviceNumber" size="small" placeholder="设备号" clearable />
      </FormItem>
      <FormItem>
        <Button type="info" size="small" @click="handleSubmit('formInline')">查询</Button>
      </FormItem>
    </Form>
    <Divider />
    <ChartBar style="height: 300px;" :value="barData" text="早退统计(当月)" yname="次數" />
    <tables border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  import { ChartBar } from '_c/charts'
  export default {
    name: "ztjl",
    components: {
      Tables,
      ChartBar
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
          title: '员工编号',
          key: 'name',
          align: 'center',
        }, {
          title: '所属部门',
          key: 'name',
          align: 'center',
        }, {
          title: '离岗时间',
          key: 'name',
          align: 'center',
        }, {
          title: '排班时间',
          key: 'name',
          align: 'center',
        }, {
          title: '早退时长(分)',
          key: 'name',
          align: 'center',
        }, {
          title: '报警时间',
          key: 'name',
          align: 'center',
        }, ],
        formInline: {
          branch: '',
          name: '',
          phone: '',
          userNumber: '',
          deviceNumber: '',
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
        }
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
  .ztjl {
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
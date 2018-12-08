<template>
  <Card :bordered="false" class="khrypm">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="startDate">
        <DatePicker type="date" v-model="formInline.startDate" placeholder="开始时间" size="small"></DatePicker>
      </FormItem>
      <FormItem prop="endDate">
        <DatePicker type="date" v-model="formInline.endDate" placeholder="结束时间" size="small"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="info" size="small" @click="handleSubmit('formInline')">查询</Button>
      </FormItem>
      <FormItem style="float:right;">
        <Button type="info" size="small" @click="handleSubmit('formInline')">导出</Button>
      </FormItem>
    </Form>
    <Divider />
    <ChartBar style="height: 300px;" :value="barData" text="考核人员排名" yname="數量(件)" />
    <tables border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  import { ChartBar } from '_c/charts'
  export default {
    name: "khrypm",
    components: {
      Tables,
      ChartBar
    },
    data() {
      return {
        data_list: [],
        c_data_list: [{
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
          title: '數量',
          key: 'name',
          align: 'center',
        }, ],
        formInline: {
          report: '',
          startDate: '',
          endDate: '',
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
        reportList: [{
            value: '1',
            label: '日报表',
          },
          {
            value: '2',
            label: '月报表',
          },
          {
            value: '3',
            label: '时间段报表',
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
  .khrypm {
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
    }

  }
</style>
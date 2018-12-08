<template>
  <Card :bordered="false" class="yljk">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="branch">
        <AutoComplete v-model="formInline.branch" placeholder="请选择部门" size="small">
          <Tree :data="treeData" multiple @on-select-change="handlerTreeData"></Tree>
        </AutoComplete>
      </FormItem>
      <FormItem prop="type">
        <Select v-model="formInline.type" style="width:150px" size="small">
          <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="number">
        <Select v-model="formInline.number" style="width:150px" size="small">
          <Option v-for="item in numberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="report">
        <Select v-model="formInline.report" style="width:150px" size="small" @on-change="reportChange">
          <Option v-for="item in reportList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="startDate">
        <DatePicker :type="reportType.type" v-model="formInline.startDate" :placeholder="reportType.text" size="small"></DatePicker>
      </FormItem>
      <FormItem prop="endDate" v-show="showEndDate">
        <DatePicker type="date" v-model="formInline.endDate" placeholder="结束日期" size="small"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="info" size="small" @click="handleSubmit('formInline')">查询</Button>
      </FormItem>
    </Form>
    <Divider />
    <div class="handler">
      <Button type="success" size="small" icon="ios-add-circle-outline">打印</Button>
      <Button type="primary" size="small" icon="md-trash" style="margin-left:20px">导出</Button>
    </div>
    <tables border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  export default {
    name: "yljk",
    components: {
      Tables
    },
    data() {
      return {
        showEndDate: false,
        reportType: {
          type: 'date',
          text: '请选择日期',
        },
        data_list: [],
        c_data_list: [{
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center'
          },
          {
            title: '车牌号',
            key: 'name',
            align: 'center',
          },
          {
            title: '公司',
            key: 'name',
            align: 'center',
          },
          {
            title: '车辆类型',
            key: 'name',
            align: 'center',
          },
          {
            title: '行驶里程(公里)',
            key: 'name',
            align: 'center',
          },
          {
            title: '剩余油量(L)',
            key: 'name',
            align: 'center',
          },
          {
            title: '时间',
            key: 'name',
            align: 'center',
          }
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
        typeList: [{
            value: 'default',
            label: '车辆类型',
          },
          {
            value: 1,
            label: '洒水车',
          },
          {
            value: 2,
            label: '除雪车',
          },
          {
            value: 3,
            label: '清扫车',
          },
        ],
        numberList: [{
            value: 'default',
            label: '车牌号',
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
        reportList: [{
            value: 1,
            label: '日报表',
          },
          {
            value: 2,
            label: '月报表',
          },
          {
            value: 3,
            label: '时间段报表',
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
      }
    },
    mounted() {},
    methods: {
      handlerTreeData(value) {
        this.formInline.branch = value.map(_ => _.title).toString();
      },
      reportChange(v) {
        let self = this
        switch (v) {
          case 1:
            self.showEndDate = false
            self.reportType = {
              type: 'date',
              text: '请选择日期',
            }
            break;
          case 2:
            self.showEndDate = false
            self.reportType = {
              type: 'month',
              text: '请选择月份',
            }
            break;
          case 3:
            self.showEndDate = true
            self.reportType = {
              type: 'date',
              text: '请选择日期',
            }
            break;
        }
      },
    }
  };
</script>

<style lang="scss">
  .yljk {
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
<template>
  <Card :bordered="false" class="dxkh">
    <div class="handler">
      <RadioGroup v-model="kh_tab" type="button" size="small">
        <Radio label="园林绿化"></Radio>
        <Radio label="公测保洁"></Radio>
        <Radio label="垃圾转运"></Radio>
        <Radio label="清扫保洁"></Radio>
      </RadioGroup>
    </div>

    <Divider />
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="report">
        <Select v-model="formInline.report" style="width:150px" size="small">
          <Option v-for="item in reportList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="position">
        <Select v-model="formInline.position" style="width:150px" size="small">
          <Option v-for="item in positionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="date">
        <DatePicker type="date" v-model="formInline.date" placeholder="时间" size="small"></DatePicker>
      </FormItem>
      <FormItem prop="name">
        <Input v-model="formInline.name" size="small" placeholder="姓名" clearable />
      </FormItem>
      <FormItem>
        <Button type="info" size="small" @click="handleSubmit('formInline')">查询</Button>
      </FormItem>
      <FormItem style="float:right;">
        <Button type="info" size="small" @click="handleSubmit('formInline')">导出</Button>
      </FormItem>
    </Form>
    <tables border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  export default {
    name: "dxkh",
    components: {
      Tables
    },
    data() {
      return {
        kh_tab: '园林绿化',
        data_list: [],
        c_data_list: [{
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        }, {
          title: '事件类型',
          key: 'name',
          align: 'center',
        }, {
          title: '事由',
          key: 'name',
          align: 'center',
        }, {
          title: '扣分',
          key: 'name',
          align: 'center',
        }, {
          title: '稽查人',
          key: 'name',
          align: 'center',
        }, {
          title: '部门',
          key: 'name',
          align: 'center',
        }, {
          title: '稽查时间',
          key: 'name',
          align: 'center',
        }, ],
        formInline: {
          report: '',
          position: '',
          evendatetName: '',
          name: '',
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
        positionList: [{
            value: 'default',
            label: '选择部门',
          },
          {
            value: '1',
            label: '环卫处(处级)',
          },
          {
            value: '2',
            label: '村镇处(村级)',
          },
          {
            value: '3',
            label: '街道(镇级)',
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
  .dxkh {
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
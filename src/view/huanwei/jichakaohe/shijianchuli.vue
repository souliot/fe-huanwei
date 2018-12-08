<template>
  <Card :bordered="false" class="sjcl">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="userName">
        <Input v-model="formInline.name" size="small" placeholder="人员姓名" clearable />
      </FormItem>
      <FormItem prop="eventType">
        <Input v-model="formInline.position" size="small" placeholder="事件类型" clearable />
      </FormItem>
      <FormItem prop="eventName">
        <Input v-model="formInline.position" size="small" placeholder="事件名称" clearable />
      </FormItem>
      <FormItem prop="startTime">
        <DatePicker type="datetime" v-model="formInline.startTime" placeholder="处理开始时间" size="small"></DatePicker>
      </FormItem>
      <FormItem prop="endTime">
        <DatePicker type="datetime" v-model="formInline.endTime" placeholder="处理结束时间" size="small"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="info" size="small" @click="handleSubmit('formInline')">查询</Button>
      </FormItem>
    </Form>
    <Divider />

    <tables border ref="t_data_list" v-model="data_list" :columns="c_data_list" />
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  export default {
    name: "sjcl",
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
        }, {
          title: '事件名称',
          key: 'name',
          align: 'center',
        }, {
          title: '稽查人',
          key: 'name',
          align: 'center',
        }, {
          title: '稽查部门',
          key: 'name',
          align: 'center',
        }, {
          title: '处理人',
          key: 'name',
          align: 'center',
        }, {
          title: '扣分项',
          key: 'name',
          align: 'center',
        }, {
          title: '稽查图片',
          key: 'name',
          align: 'center',
        }, {
          title: '处理图片',
          key: 'name',
          align: 'center',
        }, {
          title: '地址',
          key: 'name',
          align: 'center',
        }, {
          title: '稽查时间',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '处理时间',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '事件状态',
          key: 'name',
          align: 'center',
          sortable: true
        }, {
          title: '扣分',
          key: 'name',
          align: 'center',
          sortable: true
        }, ],
        formInline: {
          userName: '',
          eventType: '',
          eventName: '',
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
  .sjcl {
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
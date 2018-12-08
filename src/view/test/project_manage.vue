<template>
  <Card :bordered="false">
    <tables border ref="t_project_list" v-model="project_list" :columns="c_project_list" />
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  import { getAllProjects } from '@/api/data'
  export default {
    name: 'project_manage',
    components: {
      Tables
    },
    data() {
      return {
        project_list: [],
        c_project_list: [{
            title: '项目名称',
            key: 'name',
            sortable: true
          },
          {
            title: '链接地址',
            key: 'url',
            render: (h, params) => {
              var url = params.row.url
              return h("a", {
                attrs: {
                  href: url,
                  target: '_blank',
                }
              }, [url])
            },
          },
          {
            title: '操作',
            key: 'handle',
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
                      type: 'text',
                      ghost: true
                    }
                  }, [
                    h('Icon', {
                      props: {
                        type: 'md-trash',
                        size: 18,
                        color: '#dd0000'
                      }
                    })
                  ])
                ])
              },
            ]
          }
        ],
      }
    },
    mounted() {
      this.updateProjectList()
    },
    methods: {
      updateProjectList() {
        getAllProjects().then(res => {
          this.project_list = res.data.data
        })
      },
    },
  }
</script>
<style>
  .ivu-card {
    height: 100%;
  }
</style>
<style scoped>

</style>
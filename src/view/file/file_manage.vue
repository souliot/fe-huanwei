<template>
  <Card :bordered="false">
    <Tabs ref="tab" v-model="currentTab">
      <TabPane label="文件列表" name="file_list">
        <tables border ref="t_file_list" v-model="file_list" :columns="c_file_list" />
      </TabPane>
      <TabPane label="正在上传" name="file_uploading_list">
        <tables border ref="t_file_uploading_list" v-model="file_uploading_list" :columns="c_file_uploading_list" />
      </TabPane>
      <TabPane label="上传文件" name="file_uploading">
        <Upload ref="upload" multiple type="drag" action="/upload" :before-upload="beforeHandler" :show-upload-list="false" :on-success="successHandler" :on-error="errorHandler" :on-progress="progressHandler">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>拖拽文件到此来上传</p>
          </div>
        </Upload>
      </TabPane>
    </Tabs>
  </Card>
</template>

<script>
  import Tables from '_c/tables'
  import { getAllFiles, uploadFile } from '@/api/data'
  export default {
    name: 'file_manage',
    components: {
      Tables
    },
    data() {
      return {
        currentTab: "file_list",
        file_list: [],
        file_uploading_list: [],
        c_file_list: [{
            title: '文件名',
            key: 'name',
            sortable: true
          },
          {
            title: '大小',
            key: 'size',
            sortable: true,
            render: (h, params) => {
              var size = this.renderSize(params.row.size)
              return h("span", [size])
            },
          },
          {
            title: '下载',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text',
                  ghost: true
                },
                on: {
                  'click': () => {
                    const url = "http://192.168.32.20:8084/download/" + params.row.name
                    // window.location.href = "http://192.168.32.20:8084/download/" + params.row.name
                    window.open(url, "_blank")
                  }
                }
              }, [
                h('Icon', {
                  props: {
                    type: 'ios-download-outline',
                    size: 18,
                    color: '#2D8cF0'
                  }
                })
              ])
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
        c_file_uploading_list: [{
            title: '文件名',
            key: 'name',
            sortable: true
          },
          {
            title: '上传进度',
            key: 'progress',
            render: (h, params) => {
              if (params.row.progress) {
                return h('Progress', {
                  props: {
                    percent: this.toFixed(params.row.progress.percent, 2),
                  }
                })
              } else {
                return h('Progress', {
                  props: {
                    percent: 0,
                  }
                })
              }
            },
          },
          {
            title: '大小',
            key: 'preSize',
            render: (h, params) => {
              return h("span", [params.row.preSize])
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
                      type: 'warning',
                      size: 'small'
                    }
                  }, '暂停')
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
                  }, '取消')
                ])
              },
            ]
          }
        ],
      }
    },
    mounted() {
      this.updateFileList()
      this.file_uploading_list = this.$refs.upload.fileList;
    },
    methods: {
      updateFileList() {
        getAllFiles().then(res => {
          this.file_list = res.data.data
        })
      },
      toFixed(num, d) {
        num *= Math.pow(10, d);
        num = Math.round(num);
        return num / (Math.pow(10, d));
      },
      renderSize(value) {
        if (null == value || value == '') {
          return "0 Bytes";
        }
        var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
        var index = 0;
        var srcsize = parseFloat(value);
        index = Math.floor(Math.log(srcsize) / Math.log(1024));
        var size = srcsize / Math.pow(1024, index);
        size = size.toFixed(2); //保留的小数位数
        return size + " " + unitArr[index];
      },
      beforeHandler(file) {
        this.currentTab = "file_uploading_list"
      },
      successHandler(res, file) {
        // console.log(res)
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        var name = res.name,
          fid = res.fid ? res.fid : "",
          size = file.size ? file.size.toString() : ""

        uploadFile({ name, fid, size }).then(res => {
          if (res.data.code) {
            this.$Message.error({
              content: '文件 ' + file.name + ' 上传错误！',
              duration: 3
            });
          } else {
            this.updateFileList()
            this.currentTab = "file_list"
            this.$Message.success({
              content: '文件 ' + file.name + ' 上传成功！',
              duration: 3
            });
          }
        })
      },
      progressHandler(e, file) {
        file.progress = e
        var preSize = this.renderSize(e.loaded) + "/" + this.renderSize(e.total)
        file.preSize = preSize
      },
      errorHandler(err, file) {
        this.$Message.error({
          content: '文件 ' + file.name + ' 上传错误！',
          duration: 3
        });
      },
    },
  }
</script>
<style>
  .ivu-card {
    height: 100%;
  }

  .ivu-table-cell .ivu-btn-text {
    padding: 5px 5px 6px;
  }

  .ivu-table-cell .ivu-btn-small {
    margin-right: 5px;
  }
</style>

<style scoped>

</style>
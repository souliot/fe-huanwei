import axios from '@/libs/api.request'

export const getAllFiles = () => {
  return axios.request({
    url: '/api/v1/file',
    method: 'get'
  })
}
export const getAllProjects = () => {
  return axios.request({
    url: '/api/v1/project',
    method: 'get'
  })
}
export const uploadFile = ({ name, fid, size }) => {
  const data = {
    name,
    fid,
    size
  }

  return axios.request({
    url: '/api/v1/file',
    data,
    method: 'post'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}
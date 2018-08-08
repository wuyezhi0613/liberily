
import axios from 'axios'
// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
  Object.keys(o).map(key => {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  })
  return o
}
/**
 *
 *
 * @param {String} method Ajax请求类型 'POST'|'PUT'|'GET'|'DELETE'
 * @param {String} url 请求地址
 * @param {Object} params  参数
 * @returns Promise<T>
 */
function apiAxios(method, url, params) {
  if (params) {
    params = filterNull(params)
  }
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      withCredentials: false
    })
      .then((res) => {
        if (res.status === 200 && res.statusText === 'OK') {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      }, err => {
        reject(err)
      })
      .catch((err) => {
        const res = err.response
        reject(res)
      })
  })
}
export default {
  get: (url, params) => {
    return apiAxios('GET', url, params)
  },
  post: (url, params) => {
    return apiAxios('POST', url, params)
  },
  put: (url, params) => {
    return apiAxios('PUT', url, params)
  },
  delete: (url, params) => {
    return apiAxios('DELETE', url, params)
  }
}
function tplServices(options) {
  const {ts} = options
  return (
    `import axios from 'axios'
${ts?'import {AxiosRequestConfig} from "axios";':''}

/* 最大并发网络连接数 */
const CONNECT_LIMIT = 10

const pendingQueue${ts ? ': AxiosRequestConfig[]' : ''} = []
let requestNum = 0

const request = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    contentType: 'application/json;charset=utf-8'
  }
})

request.interceptors.request.use(
  config => {
    if (requestNum < CONNECT_LIMIT) {
      requestNum++
      return config
    } else {
      pendingQueue.push(config)
      return Promise.reject()
    }
  }
)

request.interceptors.response.use(
  res => {
    requestNum--
    if (pendingQueue.length) {
      request.request(pendingQueue.shift() as AxiosRequestConfig)
    }
    return res.data
  }
)

export default request`
  )
}

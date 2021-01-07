function axios(options) {
  return `import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    contentType: 'application/json;charset=utf-8'
  }
})

request.interceptors.request.use(
  config => {

  }
)

request.interceptors.response.use(
  res => {
    return res.data
  }
)

export default request`
}

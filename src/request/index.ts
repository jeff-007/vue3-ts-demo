import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截
// 可以在拦截中添加token来做登录验证
service.interceptors.request.use((config) => {
  // 如果本地已经有token，直接赋值
  config.headers = config.headers || {}
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token')
  }
  return config
})

// 响应拦截
service.interceptors.response.use((res) => {
  const code: number = res.data.code
  if (code !== 200) {
    return Promise.reject(res.data)
  }
  return res.data
}, (err) => {
  console.log(err)
})

export default service

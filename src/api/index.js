// 配置一个符合项目的axios 导出去进行全局配置
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 进行配置
// 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头 token
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`
axios.interceptors.request.use((config) => {
  // 拦截成功
  // 加token
  config.headers.Authorization = 'Bearer ' + store.getUser().token
  return config
}, (err) => {
  // 拦截失败 (成功的业务中出现报错)
  return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  const status = err.response.status
  if (status === 401) {
    // 清除无效token
    store.delUser()
    // 使用router跳转

    router.push('/login')
  }

  return Promise.reject(err)
})
export default axios

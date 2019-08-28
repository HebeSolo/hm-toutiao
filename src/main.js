// 接口都在这
import Vue from 'vue'
import App from './App.vue'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
// @ 代表绝对路径 src的绝对路径
import router from '@/router'
// 简单配置axios
import axios from '@/api'
Vue.prototype.$http = axios

Vue.use(ElementUi)

Vue.config.productionTip = false

// main.js是入口文件,职责:
// 1.所有的全局依赖包 文件 导入
// 2.创建vue根实例
// App.vue根组件

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

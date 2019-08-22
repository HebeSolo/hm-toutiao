import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// main.js是入口文件,职责:
// 1.所有的全局依赖包 文件 导入
// 2.创建vue根实例
// App.vue根组件

new Vue({
  render: h => h(App)
}).$mount('#app')

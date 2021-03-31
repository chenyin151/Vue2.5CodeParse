/*
 * @Author: your name
 * @Date: 2021-03-31 21:32:08
 * @LastEditTime: 2021-04-01 00:01:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueCodeParse\sample\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
Vue.component('HelloWorld',function(resolve, reject) {
  // 这个特殊的require语法告诉webpack自动编译后的代码分割成不同的快
  require(['./components/HelloWorld'], function(res) {
    resolve(res)
  })
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

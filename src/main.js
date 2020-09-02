import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import request from '@/utils/request';
// 示例全局组件
// import AssetStore from '@/views/active/assetStore';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.prototype.$axios = request;

// 使用全局组件
// Vue.component('asset', AssetStore);

// 全局过滤器 filter
// 全局 OSS host 过滤器
Vue.filter('fixHost', val => {
  if (val.startsWith('http')) return val;
  return process.env.VUE_APP_OSS_HOST + val;
});

const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

export default vm;

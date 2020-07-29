import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import request from '@/utils/request';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.prototype.$axios = request;

const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

export default vm;

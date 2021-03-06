import axios from 'axios';
import vm from '../main';
import router from '@/router';

const succeeCode = '0'; // 成功

const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 20000, // 请求超时时间
  headers: {
    login_code: localStorage.getItem('login_code'),
  },
  // withCredentials: true,
});

/**
 * 状态码判断 具体根据当前后台返回业务来定
 * @param {*请求状态码} status
 * @param {*错误信息} err
 */
const errorHandle = (status, err) => {
  switch (status) {
    case 401:
      vm.$message({ message: '你还未登录', type: 'warning' });
      break;
    case 404:
      vm.$message({ message: '请求路径不存在', type: 'warning' });
      break;
    default:
      console.log(err);
  }
};
/**
 * 响应拦截
 */
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      // debugger;
      if (typeof response.data.code == 'undefined') return Promise.resolve(response.data);
      if (response.data.code == succeeCode) {
        return Promise.resolve(response.data);
      }
      switch (response.data.code) {
        case '1':
          vm.$message.warning(response.data.message);
          return Promise.reject(response.data);
        case '-1':
          return router.push({
            path: '/login',
          });
        case '2':
          vm.$message.warning(response.data.message);
          return Promise.reject(response.data);
        default:
          vm.$message.warning(response.data.message);
          return Promise.reject(response.data);
      }
      // } else {
      //   vm.$message({ message: '警告哦，这是一条警告消息', type: 'warning' });
      //   return Promise.reject(response);
      // }
    } else {
      return Promise.reject(response.data);
    }
  },
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在 2xx 的范围
      errorHandle(response.status, response.data.msg);
      return Promise.reject(response.data);
    } else {
      // 处理断网的情况
      if (!window.navigator.onLine) {
        vm.$message({ message: '你的网络已断开，请检查网络', type: 'warning' });
      }
      return Promise.reject(error);
    }
  }
);

export default service;

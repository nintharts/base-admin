import request from '@/utils/request';

export function Login(data) {
  return request({
    url: '/admin/login/loginSave',
    method: 'POST',
    data,
  });
}

export function GetCaptcha() {
  return request({
    url: '/admin/login/getCaptcha',
    method: 'GET',
  });
}

export function GetMenu() {
  return request({
    url: '/admin/main/getDetail',
    method: 'GET',
  });
}

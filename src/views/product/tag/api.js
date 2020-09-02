import request from '@/utils/request';

export function List() {
  return request({
    url: '/apiUrl/list',
    method: 'GET',
  });
}
export function Save(data) {
  return request({
    url: '/apiUrl/save',
    method: 'POST',
    data,
  });
}

export function Update(data) {
  return request({
    url: '/apiUrl/update',
    method: 'POST',
    data,
  });
}
export function Remove(data) {
  return request({
    url: '/apiUrl/delete',
    method: 'GET',
    params: data,
  });
}

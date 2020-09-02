// 全局公用部分 Api

import request from '@/utils/request';

export function GetMenu() {
  return request({
    url: '',
    method: 'GET',
  });
}

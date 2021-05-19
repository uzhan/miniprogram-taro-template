import request from '@/utils/request';

export const queryAuth = () => {
  return request({
    url: '/demo',
    method: 'GET',
  })
}

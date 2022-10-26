import Taro from '@tarojs/taro';
import { getAppid } from './index';

interface RequestOptions {
  BASE_URL?: string;
  url: string;
  header?: TaroGeneral.IAnyObject;
  method?: keyof globalThis.Taro.request.Method;
  data?: any;
}

const request = function <T = any>(options: RequestOptions): Promise<API.Response<T>> {
  return new Promise((resolve, reject) => {
    const Authorization = Taro.getStorageSync('token');
    Object.assign(options.header || {}, {
      appid: getAppid(),
      'app-type': Taro.getEnv(),
      'content-type': 'application/json',
      Authorization: `Bearer ${Authorization}`,
    });
    Taro.request({
      url: `${options.BASE_URL || REACT_APP_BASE_API}${options.url}`,
      // @ts-ignore
      method: options.method,
      data: options.data,
      header: options.header,
      success: (res: Taro.request.SuccessCallbackResult) => {
        const { data } = res;
        if (data.code === '000000') resolve(data);
        else if (data.infocode === '10000') {
          const object = { code: '000000', data, message: 'ok' };
          resolve(object);
        } else if (data.code === '100000') {
          Taro.removeStorageSync('token');
        } else {
          Taro.showToast({ title: data.message, duration: 3000, icon: 'none' });
          reject(data);
        }
      },
      fail: (err: any) => {
        Taro.hideLoading();
        if (err.status === 500) Taro.showToast({ title: '服务器故障,稍后再试', icon: 'none' });
        throw err;
      },
    });
  });
};

export default request;

'use strict'

import Taro from '@tarojs/taro'

let APPID: string

if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
  const { miniProgram } = Taro.getAccountInfoSync()
  APPID = miniProgram.appId
}
if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY) {
  // @ts-ignore
  APPID = my.getAppIdSync().appId
}

if (Taro.getEnv() === Taro.ENV_TYPE.WEB) APPID = ''

interface RequestOptions {
  BASE_URL?: string;
  url: string;
  header?: Taro.General.IAnyObject;
  method?: string;
  data?: object;
}

const request = (options: RequestOptions) => {
  return new Promise<RequestResponse>((resolve, reject) => {
    const Authorization = Taro.getStorageSync('token')
    const member_id = Taro.getStorageSync('member_id')
    options.header = Object.assign(options.header || {}, {
      'appid': APPID,
      'app-type': Taro.getEnv(),
      'content-type': 'application/json',
      'Authorization': `Bearer ${Authorization}`,
      'member-id': member_id || '2'
    })
    Taro.request({
      url: `${options.BASE_URL || REACT_APP_BASE_API}${options.url}`,
      // @ts-ignore
      method: options.method,
      data: options.data,
      header: options.header,
      success: (res: Taro.request.SuccessCallbackResult) => {
        const data: RequestResponse = res.data;
        if (data.code === '000000') resolve(data)
        else if (data.infocode === '10000') {
          const object = { code: '000000', data, message: 'ok' }
          resolve(object)
        } else if (data.code === '100000') { Taro.removeStorageSync('token') }
        else {
          Taro.showToast({ title: data.message, duration: 3000, icon: 'none' })
          reject(data)
        }
      },
      fail: (err:any) => {
        Taro.hideLoading();
        if (err.status === 500) Taro.showToast({ title: '服务器故障,稍后再试', icon: 'none' })
        throw err
      }
    })
  })
}

export default request;

import Taro from '@tarojs/taro';

/**
 * @description 将一维数组拆分成多个二维数组
 * @author BaiHuaYang
 * @export Function
 * @param {any[]} array 源一维数组
 * @param {number} subGroupLength 单数组长度
 * @returns []
 */
const arrGroup = (array: any[], subGroupLength: number) => {
  let index = 0;
  const newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
};

/**
 * 图片上传
 * @param filePath 图片缓存路径
 * @param {string} url 上传接口地址
 * @param {object} header 上传接口header头
 * @returns {string} 文件上传地址
 */
const uploadImage = (filePath: string, url?: string, header?: any) => {
  const Authorization = Taro.getStorageSync('token');
  const member_id = Taro.getStorageSync('member_id');
  return new Promise<string>((resolve, reject) => {
    Taro.uploadFile({
      url: url || `${REACT_APP_BASE_API}/member/upload`, // 仅为示例，非真实的接口地址
      filePath,
      name: 'image_file',
      header: header || {
        'app-type': Taro.getEnv(),
        'auth-token': Authorization || '',
        'member-id': member_id || '',
      },
      success: (response: any) => {
        const { data, code, message } = JSON.parse(response.data);
        if (code === '000000') {
          resolve(data[0].url);
        } else {
          Taro.showToast({ title: message, icon: 'none' });
          reject();
        }
      },
      fail: () => {
        Taro.showToast({ title: '网络故障，请稍后再试', icon: 'none' });
        reject();
      },
    });
  });
};

const downloadHttpImg = (httpImg: string) => {
  return new Promise((resolve) => {
    Taro.downloadFile({
      url: httpImg,
      success: (res: { statusCode: number; tempFilePath: unknown }) => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          Taro.showToast({
            title: '图片下载失败！',
            icon: 'none',
            duration: 1000,
          });
        }
      },
      fail: () => {
        Taro.showToast({
          title: '图片下载失败！',
          icon: 'none',
          duration: 1000,
        });
      },
    });
  });
};

const sharePosteCanvas = (imgUrl: string) => {
  Taro.saveImageToPhotosAlbum({
    filePath: imgUrl,
    success() {
      Taro.showToast({
        title: '图片已保存到相册',
        icon: 'none',
        duration: 1000,
      });
    },
    fail() {
      Taro.showToast({
        title: '图片保存失败',
        icon: 'none',
        duration: 1000,
      });
    },
  });
};

const downloadImgToAlbum = (qrCodePath: string) => {
  Taro.showToast({
    title: '正在保存，请稍等',
    icon: 'none',
    duration: 2000,
  });

  // 下载图片
  downloadHttpImg(qrCodePath).then((res: any) => {
    sharePosteCanvas(res);
  });
};

/**
 * 小程序保存图片到相册
 * @param url 图片地址
 */
const DownloadImage = (url: string) => {
  const qrCodePath = url;
  Taro.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        // 没有授权
        Taro.authorize({
          scope: 'scope.writePhotosAlbum',
          success: () => {
            downloadImgToAlbum(qrCodePath);
          },
          fail: () => {
            if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
              Taro.openSetting({
                success: ({ authSetting }: any) => {
                  if (authSetting['scope.writePhotosAlbum']) {
                    downloadImgToAlbum(qrCodePath);
                  }
                },
              });
            }
          },
        });
      } else {
        // 已授权
        downloadImgToAlbum(qrCodePath);
      }
    },
  });
};

/**
 * @description H5 保存图片到相册
 * @author BaiHuaYang
 * @param {string} image 图片地址
 */
const H5DownloadImage = (image: string) => {
  const blob = new Blob([''], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = image;
  const [href] = image.replace(/(.*\/)*([^.]+.*)/gi, '$2').split('?');
  a.download = href;
  const e = document.createEvent('MouseEvents');
  e.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,
  );
  a.dispatchEvent(e);
  URL.revokeObjectURL(url);
};

/**
 * @description 获取小程序APPId
 * @author BaiHuaYang
 * @export
 * @return {string} appid
 */
const getAppid = (): string => {
  const appid = Taro.getStorageSync('appid');
  if (appid) return appid;
  else {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      const { miniProgram } = Taro.getAccountInfoSync();
      Taro.setStorageSync('appid', miniProgram.appId);
      return miniProgram.appId;
    }
    if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY) {
      Taro.setStorageSync('appid', (my.getAppIdSync() as any).appId);
      return (my.getAppIdSync() as any).appId;
    }

    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) return '';
  }

  return '';
};

export {
  arrGroup,
  uploadImage,
  downloadHttpImg,
  downloadImgToAlbum,
  DownloadImage,
  H5DownloadImage,
  getAppid,
};

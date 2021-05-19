import Taro from '@tarojs/taro';

/**
 * @description 将一维数组拆分成多个二维数组
 * @author BaiHuaYang
 * @export Function
 * @param {any[]} array 源一维数组
 * @param {number} subGroupLength 单数组长度
 * @returns []
 */
export function arrGroup(array: any[], subGroupLength: number) {
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
}

/**
 * 图片上传
 * @param filePath 图片缓存路径
 * @param {string} url 上传接口地址
 * @param {object} header 上传接口header头
 * @returns {string} 文件上传地址 
 */
export const uploadImage = (filePath: string, url?: string, header?: object) => {
  const Authorization = Taro.getStorageSync('token');
  const member_id = Taro.getStorageSync('member_id');
  return new Promise<string>((resolve, reject) => {
    Taro.uploadFile({
      url: url || `${REACT_APP_BASE_API}/member/upload`, //仅为示例，非真实的接口地址
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
          console.error(message);
          reject();
        }
      },
      fail: (err: any) => {
        Taro.showToast({ title: '网络故障，请稍后再试', icon: 'none' });
        console.error(err);
        reject();
      },
    });
  });
}

/**
 * 小程序保存图片到相册
 * @param url 图片地址
 */
export const DownloadImage = (url: string) => {
  const qrCodePath = url;
  Taro.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        //没有授权
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
        //已授权
        downloadImgToAlbum(qrCodePath);
      }
    },
  });
}

const downloadImgToAlbum = (qrCodePath: string) => {
  Taro.showToast({
    title: '正在保存，请稍等',
    icon: 'none',
    duration: 2000,
  });

  //下载图片
  downloadHttpImg(qrCodePath).then((res: any) => {
    sharePosteCanvas(res);
  });
}

const downloadHttpImg = (httpImg: string) => {
  return new Promise(resolve => {
    Taro.downloadFile({
      url: httpImg,
      success: res => {
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

/**
 * @description H5 保存图片到相册
 * @author BaiHuaYang
 * @param {string} image 图片地址
 */
export const H5DownloadImage = (image:string) => {
  const blob = new Blob([''], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = image;
  a.download = image.replace(/(.*\/)*([^.]+.*)/ig, "$2").split("?")[0];
  const e = document.createEvent('MouseEvents');
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);
  URL.revokeObjectURL(url);
}

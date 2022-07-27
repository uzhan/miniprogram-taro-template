declare module 'slash2';
declare module '*.json';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'react-cup-ui';
declare module 'taro3-code';
declare const REACT_APP_ASSETS_API: string;
declare const REACT_APP_BASE_API: string;

declare namespace API {
  interface Response<T = any> {
    code: string;
    data: T;
    message: string;
  }
}

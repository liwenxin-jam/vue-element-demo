import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

// 超时重新请求配置
const BASE_URL = process.env.VUE_APP_URL;
const axiosConfig = {
  baseURL: BASE_URL,
  // 请求后的数据处理
  transformResponse: [(data) => {
    return data;
  }],
  // 超时设置s
  timeout: 10000,
  // 跨域是否带Token
  withCredentials: true,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
};

// 修改axios配置信息
const service = axios.create(axiosConfig);

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
  (response) => {
    let resType = typeof response.data;
    if (resType === 'string') {
      response.data = JSON.parse(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;
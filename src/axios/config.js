import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { MessageBox, Message } from "element-ui";
import store from "../store";
import { getToken } from "@/utils/auth";

// 超时重新请求配置
const BASE_URL = process.env.VUE_APP_URL;
const axiosConfig = {
  baseURL: BASE_URL,
  // 请求后的数据处理
  transformResponse: [
    data => {
      return data;
    }
  ],
  // 超时设置s
  timeout: 10000,
  // 跨域是否带Token
  withCredentials: true,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  }
};

// 修改axios配置信息
const service = axios.create(axiosConfig);

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["Authorization"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
  response => {
    let resType = typeof response.data;
    if (resType === "string") {
      response.data = JSON.parse(response.data);
    }
    return response;
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;

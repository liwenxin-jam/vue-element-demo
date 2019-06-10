// import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }

import service from "@/axios/service";

export function ApiUserLogin(data) {
  let url = "user/login";
  return service.get({
    url,
    data
  });
}

export function ApiGetUserInfo(data) {
  let url = "user/info";
  return service.get({
    url,
    data
  });
}

export function ApiUserLogout() {
  let url = "user/logout",
    data = {};
  return service.post({
    url,
    data
  });
}

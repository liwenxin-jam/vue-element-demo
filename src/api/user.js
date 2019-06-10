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

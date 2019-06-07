import axios from './config';

// HTTP工具类
export default class Http {
  static async request(params) {
    const res = await axios(params);
    return res;
  }

  /**
   * get
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  static get(req) {
    return this.request({
      method: 'GET',
      url: `/${req.url}`,
      params: req.data,
    });
  }

  /**
   * put
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  static put(req) {
    return this.request({
      method: 'PUT',
      url: `/${req.url}`,
      data: req.data,
    });
  }

  /**
   * post
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  static post(req) {
    return this.request({
      method: 'post',
      url: `/${req.url}`,
      data: req.data,
    });
  }

  /**
   * delete
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  static delete(req) {
    return this.request({
      method: 'DELETE',
      url: `/${req.url}`,
      params: req.data,
    });
  }
}
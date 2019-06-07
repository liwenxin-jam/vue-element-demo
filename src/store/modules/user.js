import { ApiUserLogin, ApiGetUserInfo, ApiUserLogout } from '@/api/user';
import { getToken, setToken, removeToken } from '@utils/auth';

const User = {
  namespaced: true,
  state: {
    token: getToken(),
  },
  getters: {
    token: state => state.token,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },
  actions: {
    // user login
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        ApiUserLogin({ username: username, password: password }).then(response => {
          console.log(response)
          debugger
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
};

export default User
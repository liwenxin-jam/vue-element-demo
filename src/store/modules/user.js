import { ApiUserLogin, ApiGetUserInfo, ApiUserLogout } from "@/api/user";
import { getToken, setToken, removeToken } from "@utils/auth";
import router, { resetRouter } from "@/router";

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    roles: []
  },
  getters: {
    token: state => state.token,
    name: state => state.name,
    avatar: state => state.avatar
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },
  actions: {
    // user login
    login({ commit }, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        ApiUserLogin({ username: username, password: password })
          .then(response => {
            const { data } = response;
            commit("SET_TOKEN", data.token);
            setToken(data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        ApiGetUserInfo(state.token)
          .then(response => {
            let { data } = response;

            if (!data) {
              reject("Verification failed, please Login again.");
            }
            const { name, avatar, roles } = data.info;
            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject("getInfo: roles must be a non-null array!");
            }

            commit("SET_ROLES", roles);
            commit("SET_NAME", name);
            commit("SET_AVATAR", avatar);
            resolve(data.info);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // user logout
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        ApiUserLogout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resetRouter();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        removeToken();
        resolve();
      });
    },
    // dynamically modify permissions
    changeRoles({ commit, dispatch }, role) {
      return new Promise(async resolve => {
        const token = role + "-token";
        commit("SET_TOKEN", token);
        setToken(token);
        const { roles } = await dispatch("getInfo");
        resetRouter();

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch(
          "permission/generateRoutes",
          roles,
          { root: true }
        );
        // dynamically add accessible routes
        router.addRoutes(accessRoutes);
        // reset visited views and cached views
        dispatch("tagsView/delAllViews", null, { root: true });
        resolve();
      });
    }
  }
};

export default user;

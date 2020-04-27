import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import * as type from '@/store/constant'
import store from '@/store'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    id: undefined,
    username: '',
    nickname: '',
    rolename: '',
    permissions: undefined
  }
}

const state = getDefaultState()

const mutations = {
  [type.RESET_STATE]: (state) => {
    Object.assign(state, getDefaultState())
  },
  [type.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [type.SET_ID]: (state, id) => {
    state.id = id
  },
  [type.SET_USERNAME]: (state, username) => {
    state.username = username
  },
  [type.SET_NICKNAME]: (state, nickname) => {
    state.nickname = nickname
  },
  [type.SET_ROLENAME]: (state, rolename) => {
    state.rolename = rolename
  },
  [type.SET_PERMISSIONS]: (state, permissions) => {
    state.permissions = permissions
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  [type.SET_AVATAR]: (state, avatar) => {
    state.avatar = avatar
  },


}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password.trim()
      }).then(response => {
        let token = response.returnObject;
        setToken(token);
        commit(type.SET_TOKEN, getToken());
        resolve();
      }).catch(error => {
        reject(error);
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response.returnObject

        if (!data) {
          reject('登录失败, 请重新登录')
        }
        console.log(data)
        const {id, username, nickname, roleName, permissions, avatar} = data

        // 存储用户信息 到 Vuex中
        commit(type.SET_ID, id);
        commit(type.SET_USERNAME, username);
        commit(type.SET_NICKNAME, nickname);
        commit(type.SET_ROLENAME, roleName);
        commit(type.SET_PERMISSIONS, permissions);
        commit(type.SET_AVATAR, avatar);

        // 生成路由
        // store.dispatch('permission/generateRoutes', roleName).then(() => {
        //   // 添加新路由
        //   // TODO 这里有 bug
        //   router.options.routes = store.getters.routes
        //   router.addRoutes([...store.getters.addRouters])
        // })

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit(type.RESET_STATE)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit(type.RESET_STATE)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


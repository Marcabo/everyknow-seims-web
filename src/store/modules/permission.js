import router, { constantRoutes, asyncRoutes } from "@/router";
import {isRole} from "@/utils/hasPermission";
import * as type from "@/store/constant"

/**
 * 根据 角色过滤动态路由
 * @param routes
 * @param role
 * @returns {[]}
 */
export function filterAsyncRoute(routes, role) {
  const res = [];

  routes.forEach(route => {
    const tmp = {...route};
    if (isRole(role, route)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoute(tmp.children, role)
      }
      res.push(tmp)
    }
  });

  return res;
}

const state = {
  routes: localStorage.getItem('routes') || [],  // 本用户所有的路由, 包括了固定的路由和下面的addRouters
  addRouters: localStorage.getItem('routes') || [] // 本用户的角色赋予的新增的动态路由
};

const mutations = {
  [type.SET_ROUTES]: (state, routes) => {
    state.addRouters = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes({ commit }, rolename) {
    // 生成路由
    return new Promise(resolve => {

      // role 是后台传过来的角色名称
      const role = rolename;

      //声明该角色可用的路由
      let accessRoutes;
      accessRoutes = filterAsyncRoute(asyncRoutes, role);
      console.log(accessRoutes);

      // 执行设置路由的方法
      commit(type.SET_ROUTES, accessRoutes);

      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

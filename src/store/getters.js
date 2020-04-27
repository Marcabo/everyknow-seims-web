const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.id,
  username: state => state.user.username,
  nickname: state => state.user.nickname,
  role: state => state.user.role,
  rolename: state => state.user.rolename,
  permission_routes: state => state.permission.routes,
  routes: state => state.permission.routes,
  addRouters: state => state.permission.addRouters
}
export default getters

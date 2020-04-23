import store from "@/store";

export function hasPermission(permission) {
    let myPermissions = store.getters.permissions;
    return myPermissions.indexOf(permission) > -1;
}

export function isRole(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role)
  }
  return true
}

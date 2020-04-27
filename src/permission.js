import router from './router'
import store from './store'
import {Message, Notification} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  console.log(router)
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  console.log('hasToken' + hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断有没有获取到用户信息
      const hasRole = store.getters.rolename;

      if (hasRole) {
        // 获取到用户信息
        next()
      } else {
        // 没有获取到用户信息
        try {
          // get user info. role 是角色.一个用户只能有一种 角色
          // const { rolename } = await store.dispatch('user/getInfo')
          store.dispatch('user/getInfo').then(res => {
            const rolename = res.roleName;


            store.dispatch('permission/generateRoutes', rolename).then(res => {
              router.addRoutes(res)
              next({...to, replace: true})
            })

          })










          // await store.dispatch()
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // Notification({
      //   title: '操作失败',
      //   message: '登录已失效,请重新登录',
      //   type: 'error',
      //   duration: 2000
      // });
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar

  NProgress.done()
})

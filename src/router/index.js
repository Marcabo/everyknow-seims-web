import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    eId: 20,
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    eId: 1,
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    eId: 5,
    path: '/datavisual',
    component: Layout,
    redirect: '/datavisual/school',
    name: 'Example',
    meta: { title: '数据可视化展现', icon: 'example' },
    children: [
      {
        path: 'school',
        name: 'SchoolData',
        component: () => import('@/views/datavisual/SchoolData'),
        meta: { title: '学校数据可视化', icon: 'table' }
      },
      {
        path: 'college',
        name: 'CollegeData',
        component: () => import('@/views/datavisual/CollegeData'),
        meta: { title: '学院数据可视化', icon: 'tree' }
      },
      {
        path: 'dept',
        name: 'DeptData',
        component: () => import('@/views/datavisual/DeptData'),
        meta: { title: '专业数据可视化', icon: 'tree' }
      },
      {
        path: 'clazz',
        name: 'ClazzData',
        component: () => import('@/views/datavisual/ClazzData'),
        meta: { title: '班级数据可视化', icon: 'tree' }
      }
    ]
  },

  {
    eId: 6,
    path: '/analysis',
    component: Layout,
    name: 'analysis',
    redirect: '/analysis/index',
    meta: { title: '历年分析对比', icon: 'example' },
    children: [
      {
        path: 'schoolAnalysis',
        name: 'SchoolAnalysis',
        component: () => import('@/views/yearanalysis/SchoolAnalysis'),
        meta: { title: '学校对比', icon: 'form' }
      },
      {
        path: 'collegeAnalysis',
        name: 'CollegeAnalysis',
        component: () => import('@/views/yearanalysis/CollegeAnalysis'),
        meta: { title: '学院对比', icon: 'form' }
      },
      {
        path: 'deptAnalysis',
        name: 'deptAnalysis',
        component: () => import('@/views/yearanalysis/DeptAnalysis'),
        meta: { title: '专业对比', icon: 'form' }
      }
    ]
  },

]

export const asyncRoutes = [
  {
    eId: 2,
    path: '/schoolbase',
    component: Layout,
    redirect: '/schoolbase/college',
    name: 'SchoolBaseInformation',
    meta: { title: '学校基础信息管理', icon: 'example', roles: ['admin','employ_teacher'] },
    children: [
      {
        path: 'college',
        name: 'College',
        component: () => import('@/views/schoolbaseinformation/College'),
        meta: { title: '学院管理', icon: 'college' }
      },
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('@/views/schoolbaseinformation/Dept'),
        meta: {title: '专业管理', icon: 'dept'}
      },
      {
        path: 'clazz',
        name: 'Clazz',
        component: () => import('@/views/schoolbaseinformation/Clazz'),
        meta: {title: '班级管理', icon: 'clazz'}
      }
    ]
  },
  {
    eId: 4,
    path: '/studentinfo',
    component: Layout,
    redirect: '',
    name: 'StudentInformation',
    meta: {title: '毕业生信息管理', icon: 'info-mannger', roles: ['admin', 'employ_teacher','college_leader']},
    children: [
      {
        path: 'baseInfo',
        name: 'BaseInfo',
        component: () => import('@/views/graduateinformation/BaseInfo'),
        meta: {title: '基础信息管理', icon: 'base-info'}
      },
      {
        path: 'noEmploy',
        component: () => import('@/views/graduateinformation/NoEmployStudentList'),
        meta: {title: '未登记就业信息统计', icon: 'student-employ'}
      },
      {
        path: 'noFile',
        component: () => import('@/views/graduateinformation/NoFileStudentList'),
        meta: {title: '未登记档案信息统计', icon: 'student-file'}
      },
      {
        path: 'import',
        name: 'Import',
        component: () => import('@/views/graduateinformation/upload-excel'),
        meta: {title: '基础数据导入(excel)', icon: 'upload'}
      },
      {
        path: 'addStudent',
        component: () => import('@/views/graduateinformation/add-student'),
        name: 'AddStudent',
        hidden: true,
        meta: {title: '新增学生', icon: 'addition'}
      },
      {
        path: 'editStudent/:id(\\d+)',
        component: () => import('@/views/graduateinformation/edit-student'),
        name: 'EditStudent',
        hidden: true,
        meta: { title: '编辑学生信息', icon: 'editor', noCache: true }
      },
      {
        path: 'editFile/:stuId',
        component: () => import('@/views/graduateinformation/StudentFileEdit'),
        name: 'StudentFileEdit',
        hidden: true,
        meta: { title: '编辑档案信息', icon: 'editor', noCache: true }
      },
      {
        path: 'editEmploy/:stuId',
        component: () => import('@/views/graduateinformation/StudentEmployEdit'),
        name: 'StudentEmployEdit',
        hidden: true,
        meta: { title: '编辑就业信息', icon: 'editor', noCache: true }
      },
    ]

  },
  {
    eId: 7,
    path: '/usermanager',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'UserManager',
    meta: {
      title: '用户管理',
      icon: 'nested',
      roles: ['admin', 'employ_teacher','college_leader', 'instructor']
    },
    children: [
      {
        path: 'admin',
        name: 'AmdinManager',
        component: () => import('@/views/usermanager/UserList'),
        meta: { title: '管理员管理', icon: 'example', roles: ['admin'] }
      },
      {
        path: 'employ_teacher',
        name: 'EmployTeacherManager',
        component: () => import('@/views/usermanager/UserList'),
        meta: { title: '就业处老师管理', icon: 'example', roles: ['admin'] }
      },
      {
        path: 'college_leader',
        name: 'CollegeLeaderManager',
        component: () => import('@/views/usermanager/UserList'),
        meta: { title: '学院领导管理', icon: 'example', roles: ['admin', 'employ_teacher'] }
      },
      {
        path: 'instructor',
        name: 'InstructorManager',
        component: () => import('@/views/usermanager/UserList'),
        meta: { title: '辅导员管理', icon: 'example', roles: ['admin', 'employ_teacher', 'college_leader'] }
      },
      {
        path: 'student',
        name: 'StudentManager',
        component: () => import('@/views/usermanager/UserList'),
        meta: { title: '学生管理', icon: 'example', roles: ['admin', 'employ_teacher', 'college_leader', 'instructor'] }
      },

    ]
  },
  {
    eId: 3,
    path: '/studentperson',
    component: Layout,
    redirect: '/studentperson/editStudent',
    name: 'StudentPersonInfo',
    meta: {title: '毕业生个人中心', icon: 'example', roles: ['student']},
    children: [
      {
        path: 'editStudent',
        component: () => import('@/views/studentperson/StudentPersonDetail'),
        name: 'StudentPersonEdit',
        hidden: false,
        meta: { title: '毕业生个人信息', icon: 'editor', noCache: true }
      },
      {
        path: 'editEmploy',
        component: () => import('@/views/studentperson/StudentPersonEmployEdit'),
        name: 'StudentPersonEmployEdit',
        hidden: false,
        meta: { title: '就业信息', icon: 'editor', noCache: true }
      },
      {
        path: 'editFile',
        component: () => import('@/views/studentperson/StudentPersonFileEdit'),
        name: 'StudentPersonFileEdit',
        hidden: false,
        meta: { title: '档案信息', icon: 'editor', noCache: true }
      }
    ]
  },
  {
    eId: 8,
    path: '/profile',
    component: Layout,
    name: 'Profile',
    redirect: '/profile/person',
    meta: { title: '个人中心', icon: 'example' },
    children: [
      {
        path: 'person',
        name: 'Person',
        component: () => import('@/views/profile/UserProfile'),
        meta: { title: '个人信息', icon: 'table' }
      },
      {
        path: 'password',
        name: 'Password',
        component: () => import('@/views/profile/UserPassword'),
        meta: { title: '密码修改', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

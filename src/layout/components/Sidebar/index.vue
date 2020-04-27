<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
<!--        this.$store.getters.routes-->
        <sidebar-item v-for="route in gettersRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    gettersRoutes() {
      // 路由重排序.根据 eId
      // TODO 可能需要重构. 所有没有 eId 的都要移动到最后
      let myRoutes = this.$store.getters.routes;
      let compare = function (obj1, obj2) {
        let var1 = obj1.eId;
        let var2 = obj2.eId;
        if (var1 < var2) {
          return -1;
        } else if (var1 > var2) {
          return 1;
        } else {
          return 0;
        }
      }
      return Array.from(new Set(myRoutes.sort(compare)))
    },
    routes() {
      // 方法已失效
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

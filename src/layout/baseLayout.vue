<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="bg_shaodw"></div>
      <div class="bg_image">
        <img :src="require('@/assets/sidebar.jpg')" alt="" />
      </div>
      <div class="logo" v-if="!collapsed">
        <h3>LOGO</h3>
        <h4>CONTROL CENTOR</h4>
      </div>
      <div class="logo_collapsed" v-else>
        <h3>LOGO</h3>
      </div>
      <div class="bg_menu">
        <a-menu
          :default-selected-keys="['1']"
          :default-open-keys="['2']"
          mode="inline"
          theme="dark"
          :inline-collapsed="collapsed"
          @click="menuClick"
        >
          <template v-for="item in currentRoute">
            <!-- item.isShow: {{ item }} -->
            <template v-if="item.meta.isShow !== false || typeof item.meta.isShow == 'undefined'">
              <a-menu-item v-if="!item.children" :key="item.path">
                <a-icon type="pie-chart" />
                <span>{{ item.title }}</span>
              </a-menu-item>
              <sub-menu v-else :key="item.path" :menu-info="item" />
            </template>
          </template>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout>
      <!-- <a-row>
        <a-col span="3"></a-col>
        <a-col span="22"> -->
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <template v-for="(item, index) in activeRoute">
            <a-breadcrumb-item :key="index">{{ item.meta.title }}</a-breadcrumb-item>
          </template>
        </a-breadcrumb>
        <div class="main_content">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <!-- Ant Design ©2020 Created by 9thArts -->
      </a-layout-footer>
      <!-- </a-col>
      </a-row> -->
    </a-layout>
  </a-layout>
</template>
<script>
// import Menu from './menu';
import systemRoutes from '@/router/menu';
import * as commonApi from '@/commonApi';

import { Menu } from 'ant-design-vue';
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.path">
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};

export default {
  components: { 'sub-menu': SubMenu },
  data() {
    return {
      collapsed: false,
      systemRoutes,
      activeRoute: [],
    };
  },
  mounted() {
    // this.getMenuList();
  },
  watch: {
    $route: {
      handler: function (val) {
        this.activeRoute = val.matched;
        // console.log('activeRoute:', this.activeRoute);
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    currentRoute() {
      return this.$store.state.menuList;
    },
  },
  methods: {
    async getMenuList() {
      const res = await commonApi.GetMenu();
      if (res.code == '0') {
        this.$store.commit('SET_DYNAMIC_MENU', res.menuList);
      }
    },
    menuClick(obj) {
      // console.log(obj);
      if (this.$route.fullPath == obj.key) return;
      // let { keyPath } = obj;
      // let str = '';
      // if (keyPath.length > 0) {
      //   keyPath.reverse().forEach(item => {
      //     str = str + '/' + item;
      //   });
      // } else {
      //   str = keyPath[0];
      // }
      // if (str.startsWith('//')) {
      //   str = str.substr(1, str.length);
      // }
      // if (this.$route.fullPath == str) return;
      // this.$router.push({
      //   path: str,
      // });

      this.$router.push({
        path: obj.key,
      });
    },
  },
};
</script>

<style lang="less">
.logo {
  height: 60px;
  box-sizing: border-box;
  padding: 10px 0 5px 10px;
  h3 {
    color: #fff;
    margin-bottom: 0;
    font-weight: 700;
    font-size: 16px;
  }
  h4 {
    color: #fff;
    margin-bottom: 0;
    font-weight: 500;
    font-size: 12px;
  }
}
.logo_collapsed {
  // padding: 5px;
  color: #fff;
  line-height: 60px;
  height: 60px;
  box-sizing: border-box;
  padding-left: 5px;
  h3 {
    color: #fff;
    margin-bottom: 0;
    font-weight: 700;
    font-size: 16px;
  }
}
.ant-layout-header {
  position: relative;
  height: 64px;
  padding: 0;
  background: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.ant-layout-content {
  background: #f0f2f5;
  min-height: 100% !important;
  .main_content {
    min-height: 100%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
  }
}
.ant-menu {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  // position: absolute;
  // z-index: 10;
  .ant-menu-item {
    margin-top: 0 !important;
  }
}
.ant-menu-dark,
.ant-menu-dark .ant-menu-sub {
  background: #00152900 !important;
  max-height: calc(100vh - 48px - 60px);
  overflow-y: scroll;
}
.ant-menu-submenu-popup.ant-menu-dark {
  background: #511194 !important;
}
.ant-layout-sider {
  background: linear-gradient(45deg, #113394, #0d959c) !important;
  position: relative;
}
.ant-layout-sider-trigger {
  background: #4a4e8238 !important;
}
.bg_image,
.bg_shaodw {
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  z-index: 0;
  img {
    display: block;
    height: 100%;
  }
}
.bg_shaodw {
  background: #0203588f;
  z-index: 1;
}
.bg_menu {
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 64px;
  border-top: 1px solid #00000017;
}
.logo,
.logo_collapsed {
  position: absolute;
  z-index: 10;
}
.ant-btn-primary {
  // border-color: #18adff;
  // background: linear-gradient(30deg, #1080e8, #0bb4da);
}
.ant-layout-sider {
  // width: 150px !important;
  // min-width: 150px !important;
  // max-width: 150px !important;
}
.stack {
  display: flex;
  .ant-btn {
    margin-right: 20px;
  }
}
.drawer_footer {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;
  z-index: 1;
}
.mt20 {
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 20px;
}
</style>

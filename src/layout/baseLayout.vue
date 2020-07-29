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
        <h3>HELLO</h3>
      </div>
      <div class="bg_menu">
        <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
          <template v-for="(item, index) in systemRoutes[0].children">
            <!-- {{ item.children }} -->
            <template v-if="typeof item.children === 'undefined' || item.children.length === 0">
              <a-menu-item :key="index">
                <router-link :to="item.path" :key="index">
                  <a-icon type="pie-chart" />
                  <span>{{ item.meta.title }}</span>
                </router-link>
              </a-menu-item>
            </template>
            <template v-else>
              <a-sub-menu :key="index">
                <span slot="title"
                  ><a-icon type="user" /><span>{{ item.meta.title }}</span></span
                >
                <template v-for="subItem in item.children">
                  <a-menu-item :key="subItem.meta.title">
                    <router-link :to="item.path + '/' + subItem.path" :key="index">
                      {{ subItem.meta.title }}
                    </router-link>
                  </a-menu-item>
                </template>
              </a-sub-menu>
            </template>
          </template>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <template v-for="(item, index) in currentRoute">
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
    </a-layout>
  </a-layout>
</template>
<script>
import systemRoutes from '@/router/menu';
export default {
  data() {
    return {
      collapsed: false,
      systemRoutes,
      currentRoute: [],
    };
  },
  watch: {
    $route: {
      handler: function(val) {
        this.currentRoute = val.matched;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less">
.logo {
  height: 60px;
  box-sizing: border-box;
  padding: 10px 0 5px 25px;
  h3 {
    color: #fff;
    margin-bottom: 0;
    font-weight: 700;
  }
  h4 {
    color: #fff;
    margin-bottom: 0;
    font-weight: 500;
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
    padding: 10px;
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
</style>

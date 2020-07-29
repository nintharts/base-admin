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
          <a-menu-item key="1">
            <a-icon type="pie-chart" />
            <span>Option 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="desktop" />
            <span>Option 2</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user" /><span>User</span></span>
            <a-menu-item key="3">
              Tom
            </a-menu-item>
            <a-menu-item key="4">
              Bill
            </a-menu-item>
            <a-menu-item key="5">
              Alex
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="team" /><span>Team</span></span>
            <a-menu-item key="6">
              Team 1
            </a-menu-item>
            <a-menu-item key="8">
              Team 2
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="9">
            <a-icon type="file" />
            <span>File</span>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="main_content">
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <!-- Ant Design ©2018 Created by Ant UED -->
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
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

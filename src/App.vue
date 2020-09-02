<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import * as commonApi from '@/commonApi';

export default {
  data() {
    return {};
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    async getMenuList() {
      const res = await commonApi.GetMenu();
      if (res.code == '0') {
        this.$store.commit('SET_DYNAMIC_MENU', res.menuList);
      }
    },
  },
};
</script>
<style lang="less"></style>

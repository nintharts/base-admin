<template>
  <div>
    <div id="container" class="map_container"></div>
    <!-- <div id="info">当前点击坐标为：<span id="position"></span></div> -->
  </div>
</template>

<script>
export default {
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const self = this;
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://map.qq.com/api/gljs?v=1.exp&key=D76BZ-R6HRO-QUOWS-SUOQI-H3Q3O-AMFH4';
      document.body.appendChild(script);
      script.onload = () => {
        var position = document.getElementById('position');
        var center = new TMap.LatLng(39.984104, 116.307503); //设置中心点坐标
        //初始化地图
        var map = new TMap.Map('container', {
          // center: center,
          zoom: 10,
        });

        //绑定点击事件
        map.on('click', function(evt) {
          var lat = evt.latLng.getLat().toFixed(6);
          var lng = evt.latLng.getLng().toFixed(6);
          self.$emit('change', { lat, lng });
        });
      };
    },
  },
};
</script>

<style lang="less">
.map_container {
  z-index: 1;
}
</style>

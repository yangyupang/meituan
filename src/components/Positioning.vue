<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      positionList: []
    };
  },
  props: {
    position: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {},
  mounted() {
    // var position = new AMap.LngLat(103.928313,30.698953);
    // 创建地图实例
   
      let markers = [];
      let map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 4
      });
      for (let i = 0; i < this.position.length; i += 1) {
        let marker;
        marker = new AMap.Marker({
          
          position: this.position[i].location.split(","),
          title: this.position[i].name,
          map: map,
          content: '<div class="marker" >' + (i + 1) + "</div>"
        });
        markers.push(marker);
      }
      map.setFitView();
    //    setTimeout(() => {
    // }, 500);
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
body,
#container {
  width: 230px;
  height: 220px;
}
/deep/.marker {
  background-image: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png);
  width: 19px;
  height: 33px;
  background-size: 100% 100%;
  text-align: center;
  color: #fff;
}
</style>
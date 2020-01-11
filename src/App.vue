<template>
  <div id="app">
    <BackTop :height="100" :bottom="200">
      <div class="back-top">返回顶端</div>
    </BackTop>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>
<style lang="scss">
@import "./styles/common";
.back-top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>

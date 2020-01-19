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
  components: {},
  mounted() {
    // console.log(localStorage.getItem("username"));
    if (localStorage.getItem("username") !== null) {
      this.$store.state.userName = localStorage.getItem("username");
    }
  }
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
.contentBottom {
  padding-bottom: 35px;
}
.flex {
  display: flex;
}
.textover {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

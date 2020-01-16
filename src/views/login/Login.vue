<template>
  <div>
    <div class="login-header">
      <div class="login-img" @click="home"></div>
    </div>
    <div class="login-body">
      <div class="site-body flex">
        <div class="body-img">
          <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" alt />
        </div>
        <div class="login-section"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    home() {
      this.$router.push("/");
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.login-header {
  max-width: 1190px;
  min-width: 1080px;
  height: auto;
  margin: 40px auto 30px;
  .login-img {
    background-image: url(http://s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png);
    width: 82px;
    height: 54px;
    background-position: -188px -808px;
  }
}
.site-body {
  max-width: 1190px;
  min-width: 1080px;
  margin: 0 auto 70px;
  background-color: skyblue;
  .body-img {
    height: 370px;
    margin: 0 115px 0 0;
    width: 480px;
  }
  .login-section {
    margin: 0 auto;
    width: 270px;
    background: #fff;
  }
}
</style>
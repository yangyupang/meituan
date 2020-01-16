<template>
  <div class="bgColor">
    <Headers></Headers>
    <BannerContainer></BannerContainer>
    <HaveStyle></HaveStyle>
    <Footers></Footers>
  </div>
</template>

<script>
import Headers from "../../src/components/Headers";
import BannerContainer from "../../src/components/BannerContainer";
import HaveStyle from "../../src/components/HaveStyle";
import Footers from "../../src/components/Footers";
export default {
  data() {
    return {};
  },
  components: { Headers, BannerContainer, HaveStyle, Footers },
  methods: {},
  mounted() {
    //注册
    // this.$api
    //   .getRegister({username:'yyp', password:'123',email:'1156619927@qq.com'})
    //   .then(res => {
    //     if (res.code === 200) {
    //       this.$Message.info(res.msg);
    //     }
    //     if(res.code === 500){
    //       this.$Message.info(res.msg);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  watch: {},
  computed: {},
  filters: {}
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$store.state.searchValue = from.query.keyword;
  //   });
  // }
};
</script>

<style scoped lang='scss'>
.bgColor {
  background-color: #f8f8f8;
  // position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  // width: 100%;
  // height: 100%;
}
</style>
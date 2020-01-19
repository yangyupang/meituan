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
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
<template>
  <div class="bgColor">
    <Headers :isShow="isShow"></Headers>
    <div></div>
    <Footers></Footers>
  </div>
</template>

<script>
import Headers from "../../../src/components/Headers";
import Footers from "../../../src/components/Footers";
export default {
  data() {
    return {
      isShow:true,
    };
  },
  components: { Headers, Footers },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.bgColor {
  background-color: #f8f8f8;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  /deep/ .contentBottom {
    padding: 0;
  }
}
</style>
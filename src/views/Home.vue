<template>
  <div style="background-color: #F8F8F8;">
    <Headers></Headers>
    <div class="bg"></div>
  </div>
</template>

<script>
import Headers from "../../src/components/Headers";
export default {
  data() {
    return {
    };
  },
  components: { Headers },
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
  filters: {},
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$store.state.searchValue = from.query.keyword;
  //   });
  // }
};
</script>

<style scoped lang='scss'>
</style>
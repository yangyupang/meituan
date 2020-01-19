<template>
  <div class="goodShow">
    <div class="alphabet flex">
      <h3 class="l-attr">按拼音首字母选择：</h3>
      <Anchor class="r-info flex" :affix="false" v-if="citys.data.cities">
        <AnchorLink
          v-for="(item,index) in citys.data.cities"
          :key="index"
          :href="`#${index}`"
          :title="index"
        ></AnchorLink>
      </Anchor>
    </div>
    <div class="alphabet-city-area" v-if="citys.data.cities">
      <div class="city-area" v-for="(item,index) in citys.data.cities" :key="index" :id="index">
        <span class="city-label">{{index}}</span>
        <span class="cities">
          <div
            v-for="(item0,index) in item"
            :key="index"
            class="city"
            @click="change(item0.name)"
          >{{item0.name}}</div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    citys: {
      type: Object,
      default: {}
    }
  },
  components: {},
  methods: {
    change(name) {}
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.goodShow {
  position: relative;
  overflow-y: scroll;
  // display: none;
}
.alphabet {
  padding: 30px 0;
  .l-attr {
    font-size: 15px;
    color: #333;
    font-weight: 500;
  }
  .r-info {
    font-size: 14px;
    vertical-align: top;
    margin-top: 2px;
    div {
      font-size: 15px;
      color: #666;
      display: inline-block;
      margin: 0 10px;
      width: 25px;
      height: 25px;
      padding-top: 2px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border-radius: 50%;
      /deep/.ivu-anchor-link-title {
        margin-left: -17px;
        margin-top: 4px;
      }
      &:hover {
        background-color: #f8f8f8;
        color: #000;
      }
    }
  }
}
.city-area {
  padding: 13px 30px 13px 10px;
  border-radius: 10px;
  transition: background-color 500ms;
  &:hover {
    background-color: #f8f8f8;
  }
  .city-label {
    box-sizing: border-box;
    vertical-align: top;
    padding-top: 10px;
    display: inline-block;
    text-align: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #222222;
    background: #ffd000;
  }
  .cities {
    display: inline-block;
    max-width: 1050px;
    .city {
      margin: 10px 20px;
      color: #666;
      display: inline-block;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #222222;
      }
    }
  }
}
</style>
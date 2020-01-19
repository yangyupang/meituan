<template>
  <div>
    <!-- 手搓搜索框 -->
    <div class="searchtop flex">
      <keep-alive include>
        <input
          type="text"
          v-model="$store.state.searchValue"
          placeholder="搜索商家和地点"
          @focus="changeFlag"
          @blur="changeFlag"
          @keyup.enter="history(value)"
        />
      </keep-alive>
      <div class="searchbtn" @click="history(value)">
        <Icon type="md-search" style="font-size: 24px !important;" />
      </div>
    </div>

    <div class="header-search-suggest" v-show="flag">
      <div class="header-search-noinput" v-if="inputList.length <=0">
        <!-- 搜索历史 -->
        <div class="header-search-history" v-if="this.$store.state.historyList.length >0">
          <h6>最近搜索</h6>
          <div @click="delhistory">删除搜索历史</div>
          <ul class="flex">
            <li
              v-for="(item,index) in this.$store.state.historyList"
              :key="index"
              class="history"
            >{{item}}</li>
          </ul>
        </div>
        <h6>热门搜索</h6>
        <!-- 热门词条 -->
        <div
          class="header-search-hotword"
          v-for="(item,index) in hotList.slice(0,10)"
          :key="index"
        >{{item.name}}</div>
      </div>
      <div class="header-search-hasinput" v-else>
        <ul>
          <li v-for="(item,index) in inputList.slice(0,10)" :key="index">
            <div>{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import util from "../../assets/js/util";
Vue.prototype.$util = util;
export default {
  data() {
    return {
      flag: false,
      value: "",
      hotList: [],
      // historyList: [],
      inputList: []
    };
  },
  props: {
    city: {
      type: String,
      default: ""
    }
  },

  components: {},
  methods: {
    //输入框监听
    changeFlag() {
      setTimeout(() => {
        this.flag = !this.flag;
      }, 200);
    },
    // 获取当地热门
    getHotPlace() {
      if (this.city !== "") {
        setTimeout(() => {
          this.$api
            .getHotPlace(this.city)
            .then(res => {
              if (res.code === 200) {
                this.hotList = res.data.result;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }, 1000);
      }
    },
    // 创建历史记录
    history(val) {
      if (val.trim() !== "") {
        if (!localStorage.getItem("history")) {
          let arr = [];
          arr.push(val);
          localStorage.setItem("history", JSON.stringify(arr));
        } else if (localStorage.getItem("history")) {
          let historyhArr = JSON.parse(localStorage.getItem("history"));
          if (!historyhArr.includes(val.trim())) {
            let historys = JSON.parse(localStorage.getItem("history"));
            historys.unshift(val.trim());
            localStorage.setItem("history", JSON.stringify(historys));
          }
        }
      }
      this.$router.push({
        name: "search",
        query: { keyword: val }
      });
    },
    //删除历史记录
    delhistory() {
      localStorage.removeItem("history");
      this.$store.state.historyList = [];
    }
  },
  mounted() {
    this.getHotPlace();
    //根据展示搜索
    this.$watch(
      "value",
      this.$util.throttle(() => {
        if (this.value === "") {
          this.inputList = [];
        } else {
          this.$api
            .getSearchTop(this.city, this.value.trim())
            .then(res => {
              if (res.code === 200) {
                this.inputList = res.data.top;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, 200)
    );
    if (localStorage.getItem("history")) {
      this.$store.state.historyList = JSON.parse(
        localStorage.getItem("history")
      );
    }
  },
  watch: {
    "$store.state.searchValue": function() {
      this.value = this.$store.state.searchValue;
    }
  },
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
//搜索框
.searchtop {
  width: 100%;
  height: 40px;
  input {
    width: 469.96px;
    height: 100%;
    padding: 15px;
    border: 1px solid rgb(235, 233, 233);
    border-right: none;
    outline: none;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .searchbtn {
    width: 80px;
    height: 100%;
    padding: 8px 28px;
    background-color: #ffc300;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
}
.header-search-suggest {
  width: 85.45%;
  // display: none;
  box-sizing: border-box;
  position: absolute;
  border: 1px solid #e5e5e5;
  border-top: none;
  background: #fff;
  z-index: 999;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #999;
  font-size: 12px;
  text-align: left;
  .header-search-noinput {
    padding: 10px;
    h6 {
      padding-bottom: 5px;
      font-weight: 700;
    }
    .header-search-history {
      div {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
      ul {
        padding: 5px 3px 10px;
        li {
          margin-right: 10px;
          &:hover {
            cursor: pointer;
            color: #ffc300;
          }
        }
      }
    }
    //热门词
    .header-search-hotword {
      width: auto;
      padding-top: 5px;
      margin-bottom: 5px;
      padding-left: 0;
      overflow: hidden;
      height: 25px;
      box-sizing: border-box;
      text-align: left;
      cursor: pointer;
      &:hover {
        color: #ffc300;
      }
    }
  }
  .header-search-hasinput {
    ul {
      li {
        &:hover {
          background: rgb(248, 248, 248);
          color: #ffc300;
        }
        div {
          padding: 3px 10px;
          color: #333;
          &:hover {
            color: #ffc300;
          }
        }
      }
    }
  }
}
</style>
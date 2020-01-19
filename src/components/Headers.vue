<template>
  <div>
    <div>
      <div class="header-bar">
        <!-- 左边 -->
        <div class="header-bar-position ivu__icon">
          <Icon type="md-pin" />
          <div>{{this.$store.state.city}}</div>
          <div class="change-city">切换城市</div>
          <div class="near-citys">
            [
            <span
              v-for="(item,index) in areasList.slice(0,3)"
              :key="index"
              class="city-guess"
              @click="change(item)"
            >{{item.type}}</span>
            ]
          </div>
          <div class="user-entry">
            <div class="user-up" @click="login">立即登录</div>
            <div class="user-register" @click="register">注册</div>
          </div>
        </div>
        <Right></Right>
      </div>
    </div>
    <div style="background-color: rgb(255, 255, 255);box-shadow: 0 2px 27px 0 rgba(0,0,0,0.10);">
      <div class="header-content contentBottom">
        <div class="header-title">
          <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt />
        </div>
        <div class="header-search">
          <Search :city="this.$store.state.city"></Search>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Headers/Search";
import Right from "../components/Headers/Right";
export default {
  data() {
    return {
      // city: "",
      areasList: []
    };
  },
  components: { Search, Right },
  methods: {
    //获取定位
    getPosition() {
      this.$api
        .getPosition()
        .then(res => {
          if (res.code === 200) {
            // console.log(res);
            this.$store.state.city = JSON.parse(res.data).city;
            // this.city = eval("(" + res.data + ")").city;
            this.$store.state.city = this.$store.state.city.slice(0, -1);
            // console.log(this.city);
            this.getHotCity();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHotCity() {
      if (this.$store.state.city !== "") {
        this.$api
          .getHotCity(this.$store.state.city)
          .then(res => {
            if (res.code === 200) {
              this.areasList = res.data.areas;
            }
          })
          .catch(err => {
            console.log(object);
          });
      }
    },
    //更改城市
    change(val) {
      this.areasList = this.areasList.filter(item => {
        return item.type !== val.type;
      });
      this.areasList.push(val);
      this.$store.state.city = val.type;
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    }
  },
  mounted() {
    this.getPosition();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.header-bar {
  max-width: 1190px;
  min-width: 1080px;
  height: 40px;
  margin: 0 auto;
  background-color: #f8f8f8;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  .header-bar-position {
    display: flex;
    padding-top: 12px;
    color: #666;
    .change-city {
      background: #f4f4f4;
      border: 1px solid #e5e5e5;
      border-radius: 2px;
      color: #666;
      margin: 0 4px;
      padding: 0 2px;
      height: 17px;
      &:hover {
        cursor: pointer;
        color: #fe8c00;
      }
    }
    .near-citys {
      display: flex;
      .city-guess {
        margin: 0 4px;
        &:hover {
          cursor: pointer;
          color: #fe8c00;
        }
      }
    }
    .user-entry {
      display: flex;
      margin-left: 15px;
      .user-up {
        color: #fe8c00;
        margin-left: 10px;
        &:hover {
          cursor: pointer;
        }
      }
      .user-register {
        margin-left: 10px;
        &:hover {
          cursor: pointer;
          color: #fe8c00;
        }
      }
    }
  }
}
.header-content {
  max-width: 1190px;
  min-width: 1080px;
  height: 157px;
  margin: 0 auto;
  // background-color: skyblue;
  display: flex;
  //图标
  .header-title {
    float: left;
    padding-top: 28px;
    padding-right: 60px;
    padding-bottom: 40px;
    font-size: 16px;
    min-width: 220px;
    width: 280px;
    img {
      width: 126px;
      height: 46px;
    }
  }
  //搜索框
  .header-search {
    float: left;
    padding-top: 28px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    z-index: 999;
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
        }
      }
      .header-search-hasinput {
      }
    }
  }
}
</style>
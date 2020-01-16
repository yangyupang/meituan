<template>
  <div>
    <div class="banner flex">
      <div class="left">
        <div class="category-container">
          <div class="category-title">
            <div class="title">全部分类</div>
          </div>
          <div class="category-content">
            <ul>
              <li
                v-for="(item,index) in menuList"
                :key="index"
                class="flex ivu_icon"
                @mouseleave="changeFlag1(-2)"
                @mouseenter="changeFlag(index,2)"
              >
                <i class="iconfont" :class="`icon-${item.type}`"></i>
                <div class="menuName">{{item.name}}</div>
                <div class="hot" v-if="item.type === 'hotel'">HOT</div>
                <Icon type="ios-arrow-forward" />
              </li>
            </ul>
          </div>
          <div
            @mouseenter="mouseShow(1)"
            @mouseleave="mouseShow(-1)"
            class="category-details"
            :style="{display:(flag>0 ? 'block':'none')}"
          >
            <div
              class="category-detail"
              v-for="(item,index) in menuList"
              :key="index"
              :class="[showDetail===index?'show':'']"
            >
              <div class="detail-area">
                <div class="detail" v-for="item0 in item.child" :key="item0.id">
                  <div class="detail-title">
                    <h2>{{item0.title}}</h2>
                    <div>
                      更多
                      <Icon type="ios-arrow-forward" />
                    </div>
                  </div>
                  <div v-for="item1 in item0.child" :key="item1" class="detail-content">{{item1}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right flex">
        <div class="home-header flex">
          <div class="takeout">美团外卖</div>
          <div class="movie">猫眼电影</div>
          <div class="hotel">美团酒店</div>
          <div class="homestay">民宿/公寓</div>
          <div class="enter">商家入驻</div>
          <div class="public">美团公益</div>
        </div>
        <div class="shuffling">
          <Carousel autoplay v-model="value" loop trigger="hover">
            <CarouselItem v-for="(item,index) in images" :key="index">
              <img :src="item" alt />
            </CarouselItem>
          </Carousel>
        </div>
        <div class="microphone" :style="{display:(showImg? 'block':'none')}">
          <img src="//p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg" alt />
        </div>
        <div class="login">
          <div class="default" style="display:block">
            <div class="nologin-img">
              <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt />
            </div>
            <div class="user-name">Hi！您好</div>
            <div class="btn-register" @click="register">注册</div>
            <div class="btn-login" @click="login">立即登录</div>
          </div>
        </div>
        <div class="in-hotel">
          <img src="//p0.meituan.net/codeman/843d7347cb20d945e4bc39b6403f0515182965.png" alt />
        </div>
        <div class="higher-position">
          <img src="//p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg" alt />
        </div>
        <div class="a-businessman" :style="{display:(showImg? 'block':'none')}">
          <img src="//p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg" alt />
        </div>
        <div class="qr-code">
          <div class="qr-img">
            <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt />
          </div>
          <div class="app">美团APP手机版</div>
          <div class="money">
            <span>1元起</span>
            <span>吃喝玩乐</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      flag: 0,
      value: 0,
      images: [
        "http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg",
        "http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg",
        "http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg",
        "http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg",
        "https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png"
      ],
      showDetail: -1,
      showImg: true
    };
  },
  components: {},
  methods: {
    getMenu() {
      this.$api
        .getMenu()
        .then(res => {
          if (res.code === 200) {
            this.menuList = res.data.menu;
            // console.log(this.menuList);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //鼠标移入移出  控制盒子显示隐藏
    changeFlag(index, n) {
      // this.flag = !this.flag;
      this.showDetail = index;
      this.flag += n;
    },
    //鼠标移入移出  控制盒子显示隐藏
    changeFlag1(n) {
      this.flag += n;
    },
    mouseShow(n) {
      this.flag += n;
    },
    register() {
      this.$router.push("/register");
    },
    login() {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getMenu();
    window.onresize = () => {
      if (document.body.clientWidth < 1190) {
        this.showImg = false;
      } else {
        this.showImg = true;
      }
    };
    // window.addEventListener("resize", e => {
    //   // console.log(e);
    //   let offsetWid = document.documentElement.clientWidth;
    //   // console.log(offsetWid);
    // });
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.banner {
  max-width: 1190px;
  min-width: 1080px;
  height: 427px;
  margin: 0 auto;
  justify-content: space-between;
  .left {
    width: 230px;
    height: 425px;
    .category-container {
      width: 230px;
      height: 475px;
      position: relative;
      text-align: left;
      box-sizing: border-box;
      float: left;
      margin-top: -50px;
      color: #646464;
      background: #fff;
      border: 1px solid #e5e5e5;
      .category-title {
        height: 50px;
        padding-top: 15px;
        box-sizing: border-box;
        .title {
          color: #222222;
          font-size: 16px;
          font-weight: 700;
          margin-left: 15px;
        }
      }
      .category-content {
        text-align: left;
        ul {
          padding: 10px 0 8px;
          height: 425px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          li {
            position: relative;
            box-sizing: border-box;
            padding: 2px 12px;
            height: 26px;
            cursor: pointer;
            .iconfont {
              font-weight: normal !important;
            }
            .icon-food {
              color: #ff8200;
            }
            .icon-takeout,
            .icon-homestay {
              color: #ffb500;
            }
            .icon-hotel {
              color: #9b5e3e;
            }
            .icon-airport,
            .icon-sport,
            .icon-health {
              color: #03a9f4;
            }
            .icon-ktv,
            .icon-life,
            .icon-furniture,
            .icon-study,
            .icon-bar {
              color: #00bf96;
            }
            .icon-movie,
            .icon-hair,
            .icon-marry,
            .icon-offspring {
              color: #ff4081;
            }
            &:hover {
              font-size: 14px;
              font-weight: 700;
              background-color: rgb(255, 247, 235);
            }
            .menuName {
              font-size: 13px;
              cursor: pointer;
              line-height: 20px;
              margin-left: 11px;
            }
            .hot {
              font-size: 12px;
              color: #222222;
              background: #fff3cc;
              border-radius: 10px;
              padding: 0 7px;
              height: 18px;
              margin-left: 5px;
              margin-top: 2px;
            }
            &:hover .hot {
              background-color: rgb(255, 201, 0);
            }
          }
        }
      }
      .category-details {
        position: absolute;
        top: 60px;
        left: 230px;
        width: 400px;
        height: 416px;
        background-color: #fff;
        z-index: 199;
        color: #666;
        overflow: hidden;
        .category-detail {
          display: none;
          .detail-area {
            padding: 0 30px;
            .detail {
              .detail-title {
                display: flex;
                margin-top: 24px;
                line-height: 22px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e5e5;
                justify-content: space-between;
                cursor: pointer;
              }
              .detail-content {
                display: flex;
                color: #999;
                font-size: 12px;
                line-height: 15px;
                display: inline-block;
                margin-right: 16px;
                margin-top: 10px;
                cursor: pointer;
                &:hover {
                  color: #fe8c00;
                }
              }
            }
          }
        }
      }
    }
  }
  .right {
    width: 950px;
    height: 417px;
    margin-left: 10px;
    margin-top: 10px;
    position: relative;
    // justify-content: flex-start;
    flex-wrap: wrap;
    .home-header {
      position: absolute;
      top: -45px;
      left: 20px;
      div {
        color: #222;
        font-weight: 700;
        font-size: 16px;
        margin: 0 20px;
        cursor: pointer;
        position: relative;
      }
      .takeout,
      .homestay {
        &:hover {
          color: rgb(251, 199, 0);
        }
      }
      .movie,
      .enter {
        &:hover {
          color: rgb(237, 30, 36);
        }
      }
      .hotel,
      .public {
        &:hover {
          color: rgb(240, 77, 78);
        }
      }
    }
    .shuffling {
      width: 550px;
      height: 240px;
      margin-right: 10px;
      img {
        width: 550px;
        height: 240px;
      }
    }
    .microphone {
      width: 150px;
      height: 240px;
      margin-right: 10px;
      img {
        width: 150px;
        height: 240px;
      }
    }
    .login {
      width: 228px;
      height: 238px;
      background-color: #ffff;
      border: 1px solid #e5e5e5;
      text-align: center;
      .default {
        padding-top: 30px;
        .nologin-img {
          border-radius: 30px;
          margin: 0px auto 4px auto;
          img {
            width: 47px;
            height: 47px;
            border-radius: 50%;
            border: 4px solid #e5e5e5;
          }
        }
        .user-name {
          font-size: 16px;
          color: #222;
          text-align: center;
          font-weight: 500;
          white-space: nowrap;
          width: 96px;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0 auto;
        }
        .btn-register,
        .btn-login {
          width: 118px;
          text-align: center;
          margin: 10px auto 15px auto;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 40px;
          font-size: 14px;
          color: #333;
          transition: background-color 0.5s;
          display: block;
          line-height: 38px;
          cursor: pointer;
          &:hover {
            background-color: rgb(246, 246, 246);
          }
        }
      }
    }
    .in-hotel {
      width: 270px;
      height: 165px;
      margin-top: 10px;
      margin-right: 10px;
      img {
        width: 270px;
        height: 165px;
      }
    }
    .higher-position {
      width: 270px;
      height: 165px;
      margin-top: 10px;
      margin-right: 10px;
      img {
        width: 270px;
        height: 165px;
      }
    }
    .a-businessman {
      width: 150px;
      height: 165px;
      margin-top: 10px;
      margin-right: 10px;
      img {
        width: 150px;
        height: 165px;
      }
    }
    // 二维码
    .qr-code {
      width: 228px;
      height: 165px;
      margin-top: 10px;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      text-align: center;
      .qr-img {
        margin: 10px auto 0 auto;
        img {
          width: 95px;
          height: 95px;
        }
      }
      .app {
        font-size: 16px;
        font-weight: 500;
        color: #222222;
      }
      .money {
        font-size: 12px;
        font-weight: 500;
        margin-top: 2px;
        span {
          &:nth-child(1) {
            color: #ec5330;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
.show {
  display: block !important;
}
</style>
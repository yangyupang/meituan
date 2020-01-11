<template>
  <div style="background-color: #F8F8F8;">
    <div class="header-bar">
      <!-- 左边 -->
      <div class="header-bar-position">
        <Icon type="md-pin" />
        <div>{{city}}</div>
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
          <div class="user-up">立即登录</div>
          <div class="user-register">注册</div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="header-bar-nav">
        <ul class="header-nav-first">
          <li @mouseenter="enter(0)" @mouseleave="leave(0)" class="has-child">
            <span>我的美团</span>
            <ul class="header-nav-my header-nav-second" :style="{display:my}">
              <li>我的订单</li>
              <li>我的收藏</li>
              <li>抵用券</li>
              <li>用户设置</li>
            </ul>
          </li>
          <li class="has-child-1">
            <span>手机APP</span>
          </li>
          <li @mouseenter="enter(2)" @mouseleave="leave(2)" class="has-child">
            <span>商家中心</span>
            <ul class="header-nav-merchant header-nav-second" :style="{display:merchant}">
              <li>美团餐饮商户中心</li>
              <li>登录商家中心</li>
              <li>美团智能收银</li>
              <li>我想合作</li>
              <li>手机免费开店</li>
              <li>餐饮代理商招募</li>
              <li>商家申请开票</li>
              <li>免费合作美团排队</li>
            </ul>
          </li>
          <li @mouseenter="enter(3)" @mouseleave="leave(3)" class="has-child">
            <span>美团规则</span>
            <ul class="header-nav-my header-nav-second" :style="{display:rules}">
              <li>规则中心</li>
              <li>规则目录</li>
              <li>规则评议院</li>
            </ul>
          </li>
          <li @mouseenter="enter(4)" @mouseleave="leave(4)" class="has-child">
            <span>网站导航</span>
            <div class="header-nav-site header-nav-second" :style="{display:site}">
              <!-- 酒店旅游 -->
              <dl class="header-jiulv header-nav-third">
                <dt>
                  <div>酒店旅游</div>
                </dt>
                <dd>
                  <div>国际机票</div>
                </dd>
                <dd>
                  <div>火车票</div>
                </dd>
                <dd>
                  <div>民宿</div>
                </dd>
                <dd>
                  <div>经济型酒店</div>
                </dd>
                <dd>
                  <div>主题酒店</div>
                </dd>
                <dd>
                  <div>商务酒店</div>
                </dd>
                <dd>
                  <div>公寓</div>
                </dd>
                <dd>
                  <div>豪华酒店</div>
                </dd>
                <dd>
                  <div>客栈</div>
                </dd>
                <dd>
                  <div>青年旅舍</div>
                </dd>
                <dd>
                  <div>度假酒店</div>
                </dd>
                <dd>
                  <div>别墅</div>
                </dd>
                <dd>
                  <div>农家院</div>
                </dd>
              </dl>
              <!-- 吃美食 -->
              <dl class="header-meishi header-nav-third">
                <dt>
                  <div>吃美食</div>
                </dt>
                <dd>
                  <div>烤鱼</div>
                </dd>
                <dd>
                  <div>特殊小吃</div>
                </dd>
                <dd>
                  <div>烧烤</div>
                </dd>
                <dd>
                  <div>自助餐</div>
                </dd>
                <dd>
                  <div>火锅</div>
                </dd>
                <dd>
                  <div>代金券</div>
                </dd>
              </dl>
              <!-- 看电影 -->
              <dl class="header-movie header-nav-third">
                <dt>
                  <div>看电影</div>
                </dt>
                <dd>
                  <div>热映电影</div>
                </dd>
                <dd>
                  <div>热门影院</div>
                </dd>
                <dd>
                  <div>热映电影口碑榜</div>
                </dd>
                <dd>
                  <div>受期待电影</div>
                </dd>
                <dd>
                  <div>国内票房榜</div>
                </dd>
                <dd>
                  <div>北美票房榜</div>
                </dd>
                <dd>
                  <div>电影排行榜</div>
                </dd>
              </dl>
              <!-- 手机应用 -->
              <dl class="header-app header-nav-third">
                <dt>
                  <div>手机应用</div>
                </dt>
                <dd>
                  <img
                    src="//s0.meituan.net/bs/fe-web-meituan/2d53095/img/appicons/meituan.png"
                    alt
                    class="appicon"
                  />
                </dd>
                <dd>
                  <img
                    src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/waimai.png"
                    alt
                    class="appicon"
                  />
                </dd>
                <dd>
                  <img
                    src="https://p0.meituan.net/travelcube/162c3308d9622f6d9cfaa49e60be4dca8573.png"
                    alt
                    class="appicon"
                  />
                </dd>
                <dd>
                  <img
                    src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/dianping.png"
                    alt
                    class="appicon"
                  />
                </dd>
                <dd>
                  <img
                    src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png"
                    alt
                    class="appicon"
                  />
                </dd>
              </dl>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      areasList: [],
      my: "none",
      merchant: "none",
      rules: "none",
      site: "none"
    };
  },
  components: {},
  methods: {
    //获取定位
    getPosition() {
      this.$api
        .getPosition()
        .then(res => {
          if (res.code === 200) {
            // console.log(res);
            this.city = JSON.parse(res.data).city;
            // this.city = eval("(" + res.data + ")").city;
            this.city = this.city.slice(0, -1);
            // console.log(this.city);
            this.getHotCity();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHotCity() {
      this.$api
        .getHotCity(this.city)
        .then(res => {
          if (res.code === 200) {
            this.areasList = res.data.areas;
            // console.log(this.areasList);
          }
        })
        .catch(err => {
          console.log(object);
        });
    },
    //更改城市
    change(val) {
      this.areasList = this.areasList.filter(item => {
        return item.type !== val.type;
      });
      this.areasList.push(val);
      this.city = val.type;
    },
    //鼠标进入显示
    enter(val) {
      if (val === 0) {
        this.my = "block";
      } else if (val === 2) {
        this.merchant = "block";
      } else if (val === 3) {
        this.rules = "block";
      } else if (val === 4) {
        this.site = "block";
      }
    },
    //鼠标离开
    leave(val) {
      // console.log(val);
      if (val === 0) {
        this.my = "none";
      } else if (val === 2) {
        this.merchant = "none";
      } else if (val === 3) {
        this.rules = "none";
      } else if (val === 4) {
        this.site = "none";
      }
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
  max-width: 1200px;
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
  .header-bar-nav {
    .header-nav-first {
      display: flex;
      .has-child-1 {
        height: 40px;
        padding: 12px 14px;
        position: relative;
        span {
          &:hover {
            cursor: pointer;
            color: #fe8c00;
          }
        }
      }
      .has-child {
        height: 40px;
        padding: 12px 14px;
        position: relative;
        &:hover {
          background-color: #fff;
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
        }
        span {
          &:hover {
            cursor: pointer;
            color: #fe8c00;
          }
        }
        //我的美团 美团规则
        .header-nav-my {
          line-height: 35px;
          width: 100%;
        }
        //商家中心
        .header-nav-merchant {
          width: 140%;
          line-height: 35px;
        }
        //展示的ul
        .header-nav-second {
          position: absolute;
          border: 1px solid #e5e5e5;
          background: #fff;
          text-align: center;
          z-index: 1000;
          right: -1px;
          top: 95%;
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          box-sizing: content-box;
          li {
            &:hover {
              cursor: pointer;
              color: #fe8c00;
            }
          }
        }
        //网站导航
        .header-nav-site {
          width: 1200px;
          max-width: 1200px;
          min-width: 1080px;
          box-sizing: border-box;
          border-top-left-radius: 4px;
          padding: 30px 36px 36px 47px;
          display: flex;
          //酒店旅游
          .header-jiulv {
            width: 234px;
            dd {
              width: 33%;
              text-align: center;
              float: left;
              div {
                padding: 5px 0;
                &:hover {
                  cursor: pointer;
                  color: #fe8c00;
                }
              }
            }
          }
          //吃美食
          .header-meishi {
            width: 156px;
            dd {
              width: 50%;
              text-align: center;
              float: left;
              div {
                padding: 5px 0;
                &:hover {
                  cursor: pointer;
                  color: #fe8c00;
                }
              }
            }
          }
          //看电影
          .header-movie {
            width: 90px;
            dd {
              margin: 0;
              div {
                padding: 5px 0;
                &:hover {
                  cursor: pointer;
                  color: #fe8c00;
                }
              }
            }
          }
          //手机应用
          .header-app {
            float: right !important;
            dd {
              display: inline-block;
              margin: 0 8px;
              img {
                width: 60px;
                height: 60px;
              }
            }
          }
          .header-nav-third {
            float: left;
            margin-right: 47px;
            dt {
              margin-bottom: 26px;
              font-size: 14px;
              color: #222222;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="bgColor">
    <Headers :isShow="isShow"></Headers>
    <div>
      <div class="list-container">
        <div class="flex crumb">
          <div class="crumb-item flex">{{city[0]}}美团</div>
          <Icon type="ios-arrow-forward" class="icon" />
          <div class="crumb-item">{{city[0]}}{{this.$store.state.searchValue}}</div>
        </div>
        <div class="center-content flex">
          <div class="left-content">
            <!-- 左边内容头部 分类和区域 -->
            <div class="filter-box">
              <div class="filter-section-wrapper">
                <!-- 全部分类 -->
                <div class="filter-component">
                  <div class="label flex">
                    <div class="classification">分类</div>
                    <div class="all">全部</div>
                  </div>
                  <div class="tags">
                    <div class="tag-group">
                      <div v-for="item in menuList" :key="item.name">
                        <a
                          class="tag"
                          @mouseenter.stop="enter(item,2)"
                          @mouseleave.stop="leave(item,-2)"
                        >
                          <span>{{item.name | screenName}}</span>
                          <i class="tag-after"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 区域 -->
                <div class="filter-component">
                  <div class="label flex">
                    <div class="classification">区域</div>
                    <div class="all">全部</div>
                  </div>
                  <div class="tags">
                    <div class="tag-group">
                      <div v-for="item in areasList" :key="item.type">
                        <a
                          class="tag"
                          @mouseenter.stop="enter(item,2)"
                          @mouseleave.stop="leave(item,-2)"
                        >
                          <span>{{item.type}}</span>
                          <i class="tag-after"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 鼠标移入选中的每一项  展示 -->
              <div
                class="popover"
                style="min-width: 510px;max-width: 570px;"
                :style="{display: (flag>0 ?'block':'none'),'top':showtop(names),'left':showleft(names)}"
              >
                <div class="arrow">
                  <span class="after"></span>
                </div>
                <div class="content">
                  <div
                    class="popover-content tile"
                    v-for="item in mergeList"
                    @mouseenter.stop="enter(item,1)"
                    @mouseleave.stop="leave(item,-1)"
                    :key="item.name"
                    :style="{display:((names ===item.name || names === item.type) ? 'block':'none')}"
                  >
                    <a>
                      <span v-if="item.name">{{item.name | screenName}}</span>
                      <span v-if="item.module">{{item.type}}</span>
                    </a>
                    <div class="popover-group">
                      <div>
                        <a class="merge">
                          <span class="merge-name">全部</span>
                        </a>
                      </div>

                      <div v-for="item0 in item.child" :key="item0.title" class="flex tile">
                        <a class="merge" v-for="item1 in item0.child" :key="item1.title">
                          <span class="merge-name">{{item1}}</span>
                        </a>
                      </div>

                      <div>
                        <a class="merge" v-for="item0 in item.module" :key="item0.type">
                          <span class="merge-name">{{item0}}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="common-list">
              <div class="sort-option">
                <div class="tag-group tag-group-sort flex">
                  <div class="group">
                    <span>智能排序</span>
                  </div>
                  <div class="flex group">
                    <span>价格排序</span>
                    <div class="icons">
                      <Icon type="md-arrow-dropup" class="dropup" />
                      <Icon type="md-arrow-dropdown" class="dropdown" />
                    </div>
                  </div>
                  <div class="group">
                    <span>人气最高</span>
                  </div>
                  <div class="group">
                    <span>评论最高</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right-content">
            <div v-for="item in mergeList" :key="item.name">
              <div v-if="item.name">{{item.child}}</div>
              <div v-else>{{item.module}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footers></Footers>
  </div>
</template>

<script>
import Headers from "../../../src/components/Headers";
import Footers from "../../../src/components/Footers";
export default {
  data() {
    return {
      isShow: true,
      city: "",
      menuList: [],
      areasList: [],
      mergeList: [],
      tileLists: [],
      names: "",
      flag: 0
    };
  },
  components: { Headers, Footers },
  methods: {
    //获取分类
    getMenu() {
      this.$api
        .getMenu()
        .then(res => {
          if (res.code === 200) {
            this.menuList = res.data.menu;
            this.newArr();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取周边城市
    getHotCity() {
      if (this.$store.state.city !== "" || this.city[0] !== "") {
        this.$api
          .getHotCity(this.$store.state.city || this.city[0])
          .then(res => {
            if (res.code === 200) {
              this.areasList = res.data.areas;
              this.newArr();
            }
          })
          .catch(err => {
            console.log(object);
          });
      }
    },
    enter(item, num) {
      this.flag += num;
      if (item.name) {
        this.names = item.name;
      } else {
        this.names = item.type;
      }
    },
    leave(item, num) {
      this.names = "";
      this.flag += num;
    },
    showtop(name) {
      if (
        name === "美食" ||
        name === "外卖" ||
        name === "酒店" ||
        name === "榛果民宿" ||
        name === "猫眼电影" ||
        name === "机票 / 火车票"
      ) {
        return "255.8px";
      } else if (
        name === "休闲娱乐 / KTV" ||
        name === "生活服务" ||
        name === "丽人 / 美发 / 医学美容" ||
        name === "结婚 / 婚纱摄影 / 婚宴" ||
        name === "亲子 / 儿童乐园 / 幼教" ||
        name === "运动健身 / 健身中心"
      ) {
        return "282.8px";
      } else if (
        name === "家装 / 建材 / 家居" ||
        name === "学习培训 / 音乐培训" ||
        name === "医疗健康 / 宠物 / 爱车" ||
        name === "酒吧 / 密室逃脱"
      ) {
        return "311.8px";
      } else if (
        name === "双流区" ||
        name === "郫县" ||
        name === "彭州市" ||
        name === "蒲江县" ||
        name === "成都" ||
        name === "青白江区"
      ) {
        return "362.8px";
      } else if (
        name === "新都区" ||
        name === "温江区" ||
        name === "大邑县" ||
        name === "金堂县" ||
        name === "简阳市" ||
        name === "邛崃市"
      ) {
        return "390.8px";
      } else if (
        name === "都江堰市" ||
        name === "新津县" ||
        name === "天台山"
      ) {
        return "417.8px";
      }
    },
    showleft(name) {
      if (
        name === "美食" ||
        name === "休闲娱乐 / KTV" ||
        name === "家装 / 建材 / 家居" ||
        name === "双流区" ||
        name === "新都区" ||
        name === "都江堰市"
      ) {
        return "340px";
      } else if (
        name === "外卖" ||
        name === "生活服务" ||
        name === "学习培训 / 音乐培训" ||
        name === "郫县" ||
        name === "温江区" ||
        name === "新津县"
      ) {
        return "474px";
      } else if (
        name === "酒店" ||
        name === "丽人 / 美发 / 医学美容" ||
        name === "医疗健康 / 宠物 / 爱车" ||
        name === "彭州市" ||
        name === "大邑县" ||
        name === "天台山"
      ) {
        return "587px";
      } else if (
        name === "榛果民宿" ||
        name === "结婚 / 婚纱摄影 / 婚宴" ||
        name === "酒吧 / 密室逃脱" ||
        name === "蒲江县" ||
        name === "金堂县"
      ) {
        return "714px";
      } else if (
        name === "猫眼电影" ||
        name === "亲子 / 儿童乐园 / 幼教" ||
        name === "成都" ||
        name === "简阳市"
      ) {
        return "832px";
      } else if (
        name === "机票 / 火车票" ||
        name === "运动健身 / 健身中心" ||
        name === "青白江区" ||
        name === "邛崃市"
      ) {
        return "945px";
      }
    },
    newArr() {
      // console.log(this.menuList);
      // console.log(this.areasList);
      let arr = [];
      this.menuList.forEach(val1 => {
        arr.push(val1);
      });
      this.areasList.forEach(val => {
        arr.push(val);
      });
      this.mergeList = arr;
      console.log(this.mergeList);
    }
  },
  mounted() {
    this.$store.state.searchValue = this.$route.query.keyword;
    if (localStorage.getItem("recentsCity")) {
      this.city = JSON.parse(localStorage.getItem("recentsCity")).slice(0, 1);
    } else {
      this.city = this.$store.state.city;
    }
    this.getMenu();
    this.getHotCity();
    // this.tileList();
  },
  watch: {},
  computed: {},
  filters: {
    screenName(name) {
      let arr = [];
      arr = name.split("/");
      return arr[0];
    }
  }
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
  .list-container {
    margin: 0 auto;
    max-width: 1190px;
    min-width: 1080px;
    padding-top: 10px;
    .crumb {
      margin: 10px 0;
      color: #222;
      align-items: center;
      .crumb-item {
        font-size: 12px;
        margin-right: 13px;
        position: relative;
        cursor: pointer;
        &:hover {
          color: #fe8c00;
        }
      }
      .icon {
        position: relative;
        margin-left: -15px;
        font-size: 12px;
      }
    }
    .center-content {
      justify-content: space-between;
      .left-content {
        width: 950px;
        .filter-box {
          margin-top: 10px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          color: #333;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          .filter-section-wrapper {
            padding-bottom: 15px;
            .filter-component {
              padding: 15px 20px 0;
              .label {
                position: absolute;
                width: 160px;
                .classification {
                  height: 22px;
                  line-height: 22px;
                  width: 80px;
                  float: left;
                }
                .all {
                  height: 22px;
                  width: 48px;
                  line-height: 22px;
                  border-radius: 100px;
                  background: #ffbd00;
                  color: #222222;
                  text-align: center;
                  cursor: pointer;
                }
              }
              .tags {
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e5e5;
                line-height: 28px;
                margin-top: -3px;
                margin-left: 160px;
                .tag-group {
                  display: inline-block;
                  vertical-align: top;
                  div {
                    min-width: 120px;
                    display: inline-block;
                    .tag {
                      padding: 0 10px;
                      color: #666;
                      display: inline-block;
                      font-weight: normal;
                      .tag-after {
                        display: inline-block;
                        margin-left: 4px;
                        vertical-align: -2px;
                        height: 0;
                        width: 0;
                        border: 4px solid transparent;
                        border-top-color: #666;
                      }
                    }
                  }
                }
              }
            }
          }
          .popover {
            position: absolute;
            top: 200px;
            left: 100px;
            z-index: 1000;
            cursor: auto;
            user-select: text;
            white-space: normal;
            font-size: 12px;
            line-height: 1.5;
            font-weight: 500;
            text-align: left;
            background: #fff;
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e5e5;
            border-radius: 4px;
            // 手搓三角形
            .arrow {
              left: 26px;
              top: -10px;
              border-width: 5px;
              position: absolute;
              display: block;
              width: 0;
              height: 0;
              border-color: transparent;
              border-style: solid;
              border-bottom-color: #e5e5e5;
              .after {
                margin-top: -3px;
                margin-left: -4px;
                border-width: 4px;
                border-bottom-color: #fff;
                position: absolute;
                display: block;
                width: 0;
                height: 0;
                border-color: transparent;
                border-style: solid;
                border-bottom-color: #e5e5e5;
              }
            }
            //装东西用
            .content {
              background-color: #fff;
              background-clip: padding-box;
              border-radius: 4px;
              .popover-content {
                padding: 19px 15px;
                padding-bottom: 9px;
                a {
                  margin-left: -5px;
                  min-height: 22px;
                  line-height: 22px;
                  padding: 0 10px;
                  display: inline-block;
                  span {
                    color: #ccc;
                    font-size: 16px;
                    margin-bottom: 11px;
                  }
                }
                .popover-group {
                  div {
                    min-width: 120px;
                    .merge {
                      margin-bottom: 5px;
                      margin-left: -5px;
                      padding: 0 10px;
                      color: #666;
                      display: inline-block;
                      .merge-name {
                        color: #666;
                        font-size: 12px;
                      }
                    }
                  }
                  .tile {
                    flex-wrap: wrap;
                  }
                }
              }
            }
          }
        }
        .common-list {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          color: #333;
          font-size: 14px;
          line-height: 20px;
          margin-top: 10px;
          div {
            padding: 11px 20px;
          }
          .sort-option {
            padding-top: 15px;
            padding-bottom: 2px;
            .tag-group {
              padding: 0;
              .group {
                min-width: 96px;
                cursor: pointer;
                padding: 0;
                position: relative;
                .icons {
                  padding: 0;
                  .dropup {
                    position: absolute;
                    top: -1px;
                    color: #ccc;
                  }
                  .dropdown {
                    position: absolute;
                    top: 6px;
                    color: #ccc;
                  }
                }
              }
            }
            .tag-group-sort {
              vertical-align: top;
            }
          }
        }
      }
      .right-content {
        width: 230px;
        min-height: 150px;
        background: skyblue;
      }
    }
  }
}
</style>
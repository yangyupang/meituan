<template>
  <div class="bgColor" @click.stop="close">
    <Headers></Headers>
    <div>
      <div class="page">
        <div class="op-area flex">
          <!-- 选择省份城市 -->
          <div class="choose-by-province flex">
            <h3 class="l-attr">按省份选择：</h3>
            <div>
              <div class="province-choose" v-text="province" @click.stop="provinceChoose"></div>
              <Icon type="md-arrow-dropdown" class="province-chooseicon" />
            </div>
            <!-- 省份列表展示 -->
            <div class="province-list" :style="{ display:(chooseProvince? 'none':'block')}">
              <p>省份</p>
              <div class="provinces-wrapper flex">
                <div
                  v-for="item in provinceList"
                  :key="item.id"
                  @click="choosePro(item.name,item.id)"
                >{{item.name}}</div>
              </div>
              <div class="list-triangle-before"></div>
              <div class="list-triangle-after"></div>
            </div>
            <!-- 城市选择框 -->
            <div style="cursor:not-allowed;">
              <div
                class="city-choose"
                v-text="city"
                @click.stop="provinceCity"
                :style="{pointerEvents:(chooseCity? 'none':'initial')}"
              ></div>
              <Icon type="md-arrow-dropdown" class="city-chooseicon" />
            </div>
            <!-- 点击城市选择后展示城市用的 -->
            <div class="cities-list" :style="{ display:(chooseCities? 'none':'block')}">
              <p>城市</p>
              <div class="cities-wrapper flex">
                <div v-for="item in cityList" :key="item.id" class="city-col">
                  <div
                    v-if="item.name !=='市辖区'"
                    class="city-name"
                    @click="chooseCit(item.name,item.id)"
                  >{{item.name}}</div>
                  <div v-else class="city-name" @click="chooseCits(item.province)">{{item.province}}</div>
                </div>
              </div>
              <div class="list-triangle-before"></div>
              <div class="list-triangle-after"></div>
            </div>
          </div>
          <!-- 直接收拾城市 -->
          <div class="search flex">
            <h3 class="l-attr">直接搜索：</h3>
            <input type="text" placeholder="请输入城市中文或拼音" class="search-text" v-model="searchValue" />
          </div>
          <div class="suggest-city-containner" v-if="searchValue.trim() !== '' ">
            <div class="list-triangle-before"></div>
            <div class="suggest-city" v-if="DataList.length === 0">
              <div class="city">未找到匹配城市</div>
            </div>
            <div class="suggest-city" v-else>
              <div
                class="city"
                v-for="item in DataList"
                :key="item.id"
                @click="change(item.name)"
              >{{item.name}}</div>
            </div>
            <div class="list-triangle-after"></div>
          </div>
        </div>
        <div class="hotcity flex">
          <h3 class="l-attr">热门城市:</h3>
          <div class="r-info flex">
            <div
              class="city"
              v-for="item in citys.data.hotCities"
              :key="item.id"
              @click="change(item.name)"
            >{{item.name}}</div>
          </div>
        </div>
        <!-- 最近访问的城市 -->
        <div class="recents flex" v-if="recentsList.length >0">
          <h3 class="l-attr">最近访问:</h3>
          <div class="r-info flex">
            <div class="city" v-for="item in recentsList" :key="item" @click="change(item)">{{item}}</div>
          </div>
        </div>
        <Anchor :citys="citys"></Anchor>
      </div>
    </div>
    <Footers></Footers>
  </div>
</template>

<script>
import Headers from "../../../src/components/Headers";
import Footers from "../../../src/components/Footers";
import Anchor from "../../../src/components/Anchor";

import Vue from "vue";
import util from "../../assets/js/util";
Vue.prototype.$util = util;

import city from "../../assets/js/city";

export default {
  data() {
    return {
      province: "省份",
      city: "城市",
      chooseCity: true,
      chooseCities: true,
      chooseProvince: true,
      provinceList: [],
      cityList: [],
      citys: city,
      searchValue: "",
      citiesname: []
    };
  },
  components: { Headers, Footers, Anchor },
  methods: {
    getProvinces() {
      this.$api
        .getProvinces()
        .then(res => {
          if (res.code === 200) {
            this.provinceList = res.data.province;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    close() {
      if (this.chooseCities === false) {
        this.chooseCities = true;
      }
      if (this.chooseProvince === false) {
        this.chooseProvince = true;
      }
    },
    choosePro(name, id) {
      this.province = name;
      this.chooseProvince = true;
      this.chooseCity = false;
      this.$api
        .getCitys(id)
        .then(res => {
          if (res.code === 200) {
            this.cityList = res.data.city;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    chooseCit(name, id) {
      this.city = name;
      this.$store.state.city = name.slice(0, -1);
      this.recentsCity(name.slice(0, -1));
      this.$router.push("/");
      this.chooseCities = true;
    },
    chooseCits(name) {
      this.city = name;
      this.$store.state.city = name.slice(0, -1);
      this.recentsCity(name.slice(0, -1));
      this.$router.push("/");
      this.chooseCities = true;
    },
    provinceChoose() {
      this.chooseProvince = !this.chooseProvince;
      this.chooseCities = true;
    },
    provinceCity() {
      this.chooseCities = !this.chooseCities;
      this.chooseProvince = true;
    },
    getList() {
      Object.keys(this.citys.data.cities).map(item => {
        this.citiesname.push(...this.citys.data.cities[item]);
      });
    },
    //改变定位地址
    change(name) {
      this.$store.state.city = name;
      this.recentsCity(name);
      this.$router.push("/");
    },
    //存最近访问
    recentsCity(name) {
      setTimeout(() => {
        if (name !== "") {
          if (!localStorage.getItem("recentsCity")) {
            let city = [];
            city.push(name);
            localStorage.setItem("recentsCity", JSON.stringify(city));
            console.log(name);
          } else if (localStorage.getItem("recentsCity")) {
            let cityArr = JSON.parse(localStorage.getItem("recentsCity"));
            if (!cityArr.some(item => item === name)) {
              let citys = JSON.parse(localStorage.getItem("recentsCity"));
              citys.unshift(name);
              localStorage.setItem("recentsCity", JSON.stringify(citys));
            } else {
              let haveCity = cityArr.filter(item => {
                return item !== name;
              });
              haveCity.unshift(name);
              localStorage.setItem("recentsCity", JSON.stringify(haveCity));
            }
          }
        }
      }, 500);
    }
  },
  mounted() {
    this.getProvinces();
    this.getList();

  },
  watch: {},
  computed: {
    DataList() {
      return this.citiesname.filter(item => {
        return JSON.stringify(item).includes(this.searchValue);
      });
    },
    recentsList() {
      if (localStorage.getItem("recentsCity")) {
        return JSON.parse(localStorage.getItem("recentsCity"));
      } else return [];
    }
  },
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
  .page {
    max-width: 1190px;
    min-width: 1080px;
    box-sizing: border-box;
    margin: 20px auto 0;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    min-height: 1000px;
    padding: 20px;
    .op-area {
      padding-bottom: 30px;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      .choose-by-province {
        align-items: center;
        .province-choose,
        .city-choose {
          padding: 10px 0 10px 10px;
          cursor: pointer;
          border-radius: 4px;
          vertical-align: middle;
          display: inline-block;
          width: 150px;
          height: 40px;
          box-sizing: border-box;
          border: 1px solid #e5e5e5;
          margin: 0 10px 0 20px;
          position: relative;
          font-size: 14px;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .province-list {
          display: block;
          position: absolute;
          cursor: default;
          top: 45px;
          left: 116px;
          width: 264px;
          height: 375px;
          padding: 20px 0 20px 15px;
          box-sizing: border-box;
          background-color: #fff;
          border: 1px solid #e5e5e5;
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          z-index: 1;
          p {
            font-size: 16px;
            color: #ccc;
            margin-bottom: 11px;
          }
          .provinces-wrapper {
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
            flex-wrap: wrap;
            height: 318px;
            div {
              cursor: pointer;
              font-size: 12px;
              height: 20px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin: 6px 3px 6px 0;
              padding: 1px 2px;
              width: 40px;
              &:hover {
                background-color: #f4f4f4;
                border-radius: 5px;
              }
            }
          }
        }
        .cities-list {
          display: none;
          position: absolute;
          cursor: default;
          top: 45px;
          left: 296px;
          width: 345px;
          height: 375px;
          padding: 20px 0 20px 15px;
          box-sizing: border-box;
          background-color: #fff;
          border: 1px solid #e5e5e5;
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          z-index: 1;
          p {
            font-size: 16px;
            color: #ccc;
            margin-bottom: 11px;
          }
          .cities-wrapper {
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
            flex-wrap: wrap;
            height: 318px;
            .city-col {
              .city-name {
                cursor: pointer;
                font-size: 12px;
                color: #666;
                display: block;
                box-sizing: border-box;
                min-width: 40px;
                height: 20px;
                padding: 1px 8px;
                margin: 6px 38px 6px 0;
                white-space: nowrap;
                &:hover {
                  background-color: #f4f4f4;
                  border-radius: 5px;
                }
              }
            }
          }
        }
      }
      .search {
        align-items: center;
        .search-text {
          padding-left: 10px;
          width: 220px;
          height: 40px;
          border-radius: 4px;
          border: 1px solid #e5e5e5;
          margin-left: 10px;
          font-size: 14px;
          color: #666;
          box-sizing: border-box;
        }
      }
    }
    .hotcity {
      border-bottom: 1px solid #e5e5e5;
      padding: 30px 0;
      align-items: center;
      .city {
        cursor: pointer;
        margin: 0 20px;
        &:hover {
          color: #222222;
        }
      }
    }
    .recents {
      border-bottom: 1px solid #e5e5e5;
      padding: 30px 0;
      align-items: center;
      .city {
        cursor: pointer;
        margin: 0 20px;
        &:hover {
          color: #222222;
        }
      }
    }
  }
}
.l-attr {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  vertical-align: top;
  display: inline-block;
}
.r-attr {
  font-size: 14px;
  vertical-align: top;
  display: inline-block;
  margin-top: 2px;
}
.province-chooseicon {
  position: absolute;
  left: 245px;
  cursor: pointer;
  top: 13px;
}
.city-chooseicon {
  position: absolute;
  left: 427px;
  cursor: pointer;
  top: 13px;
}
.list-triangle-before {
  position: absolute;
  top: -6px;
  left: 26px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #e5e5e5;
  border-top: 0;
}
.list-triangle-after {
  position: absolute;
  top: -5px;
  left: 26px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;
  border-top: 0;
}
.suggest-city-containner {
  position: absolute;
  cursor: default;
  top: 46px;
  left: 548px;
  border-radius: 4px;
  z-index: 1;
  .suggest-city {
    overflow-y: scroll;
    min-width: 150px;
    max-height: 375px;
    padding: 0 20px 0 15px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    .city {
      cursor: pointer;
      font-size: 12px;
      color: #666;
      display: block;
      box-sizing: border-box;
      min-width: 40px;
      height: 20px;
      padding: 1px 8px;
      margin: 6px 38px 6px 0;
      white-space: nowrap;
      &:hover {
        color: #222222;
      }
    }
  }
}

// .choosebg {
//   background-color: #ffd000;
//   border-radius: 5px;
// }
</style>
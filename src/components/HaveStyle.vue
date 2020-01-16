<template>
  <div>
    <div class="have-style">
      <ul class="flex styles">
        <li>有格调</li>
        <li v-for="(item,index) in styleList" :key="index" @mouseenter="getResults(index)">
          {{item}}
          <i :class="[num===index?'triangle':'']"></i>
        </li>
      </ul>
      <div class="card">
        <Row>
          <Col span="8" v-for="(item,index) in storeList.slice(0,6)" :key="index">
            <Card :bordered="false" dis-hover>
              <div slot="title" class="card-img">
                <img :src="item.photos[0].url" alt v-if="item.photos.length >0" />
                <img
                  src="//p0.meituan.net/deal/201212/29/133712_6240123.jpg@460w_260h_1e_1c"
                  alt
                  v-else
                />
              </div>
              <div class="card-info">
                <div class="info-name">{{item.name}}</div>
                <div class="info-type">{{item.type}}</div>
                <div class="info-cost flex" v-if="item.biz_ext.cost.length >0">
                  <div>
                    <span>￥</span>
                    <span>{{item.biz_ext.cost}}</span>
                    <span>/起</span>
                  </div>
                  <div class="info-adname">{{item.adname}}</div>
                </div>
                <div class="info-cost flex" v-else>
                  <div class="no-cost">具体价格不知</div>
                  <div class="info-adnames">{{item.adname}}</div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let timeer;
    return {
      styleList: ["全部", "约会聚餐", "丽人SPA", "电影演出", "品质出游"],
      nameList: ["景点", " 美食", "丽人", "电影", "旅游"],
      num: 0,
      storeList: []
    };
  },
  components: {},
  methods: {
    //获取数据
    getResults(index) {
      clearTimeout(this.timeer)
      this.num = index;
      if (this.$store.state.city !== "") {
        this.timeer = setTimeout(() => {
          this.$api
            .getResults(this.$store.state.city, this.nameList[index])
            .then(res => {
              if (res.code === 200) {
                this.storeList = res.data.pois;
                // console.log(this.storeList);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }, 100);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.getResults(0);
    }, 330);
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.have-style {
  max-width: 1190px;
  min-width: 1080px;
  height: 795px;
  background-color: #fff;
  margin: 40px auto;
  border-radius: 5px;
  .styles {
    background-color: rgb(190, 164, 116);
    height: 44px;
    font-size: 14px;
    color: #fff;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    align-items: center;
    li {
      padding: 0 5px;
      cursor: pointer;
      position: relative;
      &:nth-child(1) {
        font-family: "LiSu" !important;
        font-size: 22px;
        margin-left: 13px;
        margin-right: 10px;
      }
    }
    .triangle {
      width: 2px;
      position: absolute;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 7px solid #fff;
      top: 25px;
      left: 0px;
      right: 0;
      margin: auto;
    }
  }
  .card {
    padding: 11px 10px 10px;
    .card-img {
      width: 368px;
      height: 208px;
      margin-bottom: 11px;
      img {
        width: 368px;
        height: 208px;
        border-radius: 5px;
      }
    }
    .card-info {
      .info-name {
        font-size: 16px;
        color: #222;
        height: 22px;
        line-height: 22px;
        margin-bottom: 8px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .info-type {
        font-size: 12px;
        color: #999;
        line-height: 18px;
        height: 18px;
        margin-bottom: 7px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info-cost {
        height: 27px;
        overflow: hidden;
        margin-bottom: 10px;
        justify-content: space-between;
        div {
          &:nth-child(1) {
            span {
              &:nth-child(1) {
                font-size: 14px;
                color: #be9e4d;
                font-weight: 500;
              }
              &:nth-child(2) {
                font-size: 22px;
                color: #be9e4d;
                margin-right: 6px;
                letter-spacing: -0.8px;
                cursor: pointer;
              }
              &:nth-child(3) {
                font-size: 12px;
                color: #be9e4d;
              }
            }
          }
        }
        .no-cost {
          font-size: 16px;
          font-weight: 500;
        }
        .info-adname {
          font-size: 12px;
          color: #999;
          margin-top: 10px;
        }
        .info-adnames {
          font-size: 12px;
          color: #999;
          margin-top: 6px;
        }
      }
    }
    /deep/ .ivu-col {
      transition: 0.5s !important;
      &:hover {
        border-radius: 5px;
        box-shadow: 1px 1px 5px 1px #999;
        background: #f4f4f4;
      }
    }
    /deep/ .ivu-card {
      margin: 10px 10px;
    }
    /deep/ .ivu-card-head {
      padding: 0;
      border-bottom: 0;
    }
  }
}
</style>
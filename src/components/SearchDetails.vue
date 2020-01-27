<template>
  <div>
    <!-- 搜索跳转数据展示页 -->
    <div class="common-list-main">
      <div v-for="(item,index) in searchList" :key="index">
        <div class="default-card">
          <div class="default-list-item flex">
            <div class="list-item-pic">
              <span>{{index+1}}</span>
              <img :src="item.photos[0].url" alt />
            </div>
            <div class="list-item-desc">
              <div class="list-item-desc-top">
                <div class="item-title">{{item.name}}</div>
                <div class="item-eval-info flex ivu-rate_star">
                  <Rate
                    allow-half
                    disabled
                    :value="Number(item.biz_ext.rating)"
                    class="stars-wrapper"
                  />

                  <span v-if="item.biz_ext.rating === 5">很好</span>
                  <span v-else-if="item.biz_ext.rating >= 4 && item.biz_ext.rating < 5 ">好</span>
                  <span v-else-if="item.biz_ext.rating <4  && item.biz_ext.rating >= 3 ">不错</span>
                  <span v-else-if="item.biz_ext.rating <3  && item.biz_ext.rating >= 2 ">一般</span>
                  <span v-else-if="item.biz_ext.rating <2  && item.biz_ext.rating >= 1 ">差</span>
                  <span v-else-if="item.biz_ext.rating <1 ">很差</span>
                  <span>{{item.biz_ext.rating}}分</span>
                  <span class="highlight">111111人评价</span>
                </div>
                <div class="item-site-info flex">
                  <div class="address-info flex">
                    <div class="cate-info">
                      <span v-if="item.tag.length >0">{{item.tag}}</span>
                      <span v-else>无</span>
                    </div>
                    <div class="address">{{item.address}}</div>
                  </div>
                </div>
                <div class="item-bottom-info flex">
                  <div class="item-price-info" v-if="item.biz_ext.cost>0">人均￥{{item.biz_ext.cost}}</div>
                  <div class="item-price-info" v-else>详情不知</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    searchList: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {},
  mounted() {
    console.log(this.searchList);
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.common-list-main {
}
.default-card {
  padding-top: 0;
  .default-list-item {
    padding: 20px 0 16px;
    min-height: 225px;
    border-top: 1px solid #e5e5e5;
    .list-item-pic {
      position: absolute;
      height: 125px;
      width: 220px;
      cursor: pointer;
      span {
        background: #fb6433;
        border-radius: 2px;
        position: absolute;
        line-height: 13px;
        width: 20px;
        margin-left: -3px;
        margin-top: 3px;
        text-align: center;
        font-size: 12px;
        color: #fff;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }

    .list-item-desc {
      margin-left: 220px;
      padding-left: 20px;
      font-size: 12px;
      color: #666;
      .list-item-desc-top {
        position: relative;
        padding-bottom: 10px;
        cursor: pointer;
        .item-title {
          font-weight: 500;
          font-size: 16px;
          color: #333;
        }
        .item-eval-info {
          margin-top: 6px;
          align-items: baseline;
          .stars-wrapper {
            margin-right: 10px;
            width: 84px;
          }
          span {
            margin-right: 10px;
          }
          .highlight {
            color: #ff9900;
          }
        }
        .item-site-info {
          margin-top: 6px;
          align-items: baseline;
          .address-info {
            margin-right: 10px;
            .cate-info {
              margin-right: 10px;
              max-width: 110px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .address {
              margin-right: 10px;
              max-width: 460px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .item-bottom-info {
          margin-top: 6px;
          align-items: baseline;
          .item-price-info {
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
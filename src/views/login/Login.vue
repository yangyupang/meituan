<template>
  <div>
    <div class="login-header">
      <div class="login-img" @click="home"></div>
    </div>
    <div class="login-body">
      <div class="site-body flex">
        <div class="body-img">
          <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" alt />
        </div>
        <div class="login-section" v-if="falg">
          <div class="blank"></div>
          <Form
            ref="formCustom"
            :model="formCustom"
            :rules="ruleCustom"
            :label-width="80"
            class="form-common"
          >
            <div class="flex common">
              <span>账号登录</span>
              <div class="flex way" @click="changeWay">
                普通方式登录
                <div class="common-img"></div>
              </div>
            </div>
            <FormItem prop="username">
              <Input type="text" v-model="formCustom.username" placeholder="请输入用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formCustom.password" password placeholder="请输入密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <div class="forget">忘记密码？</div>
            <FormItem>
              <Button type="warning" class="btn-login" @click="handleSubmit('formCustom')">登陆</Button>
            </FormItem>
          </Form>
          <div class="prompt">
            提示：未注册美团账号的手机号，登录时将自动注册美团账号，且代表您已同意
            <span>《美团点评用户服务协议》</span>
            <span>《美团点评隐私政策》</span>
          </div>
          <Divider class="divider">用合作网站账号登录</Divider>
          <div class="flex" style="margin-left: 85px;margin-top: 10px;">
            <div class="qq"></div>
            <div class="zhifubao"></div>
            <div class="weibo"></div>
          </div>
        </div>
        <div class="login-section" v-else>
          <div class="blank"></div>
          <Form
            ref="formPhone"
            :model="formPhone"
            :rules="rulePhone"
            :label-width="80"
            class="form-common"
          >
            <div class="flex common">
              <span>账号登录</span>
              <div class="flex way" @click="changeWay">
                手机动态码登录
                <div class="common-img"></div>
              </div>
            </div>
            <FormItem prop="phone">
              <Input type="text" v-model="formPhone.phone" placeholder="请输入手机号">
                <Icon type="ios-call-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Input placeholder="请输入验证码" class="code">
                <Icon type="ios-calculator-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <Button type="info" size="small" class="gain-code" v-if="!retry" @click="sendCode">点击获取</Button>
            <Button type="info" size="small" class="gain-code" disabled v-else>{{retry}}秒后再试</Button>
            <div class="forget">忘记密码？</div>
            <FormItem>
              <Button type="warning" class="btn-login">登陆</Button>
            </FormItem>
          </Form>
          <div class="prompts">
            还没有账号？
            <span>免费注册</span>
          </div>
          <Divider class="divider">用合作网站账号登录</Divider>
          <div class="flex" style="margin-left: 85px;margin-top: 10px;">
            <div class="qq"></div>
            <div class="zhifubao"></div>
            <div class="weibo"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <div class="site-info">
        <ul class="flex">
          <li v-for="item in infoList" :key="item">
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
      <div class="copyright">
        ©2020
        <span>美团网团购</span>meituan.com
        <span>京ICP证070791号</span>京公网安备11010502025545号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您用的手机号码"));
      } else {
        if (value.length != 11 || !/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
          callback(new Error("请输入正确的手机号码"));
        }
        callback();
      }
    };
    return {
      falg: true,
      retry: "", // 5秒倒计时
      dataTimer: 5, // 5秒倒计时;
      timer: null,
      infoList: ["关于美团", "加入我们", "商家入驻", "帮助中心", "美团手机版"],
      formCustom: {
        username: "",
        password: ""
      },
      ruleCustom: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      formPhone: {
        phone: ""
      },
      rulePhone: {
        phone: [
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    home() {
      this.$router.push("/");
    },
    //改变登陆方式
    changeWay() {
      this.falg = !this.falg;
      // console.log(11);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$api
            .getLogin({
              username: this.formCustom.username,
              password: this.formCustom.password
            })
            .then(res => {
              if (res.code === 200) {
                this.$Message.success(res.msg);
                localStorage.setItem("username",res.data.username);
                this.$store.state.userName = res.data.username;
                this.$router.push("/")
              } else if (res.code === 500) {
                this.$Message.error(res.msg);
                this.formCustom.username = "";
                this.formCustom.password = "";
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$Message.error("登录信息还没填完哟~");
        }
      });
    },
    // 发送验证码
    sendCode() {
      if (
        !this.formPhone.phone ||
        this.formPhone.phone.length != 11 ||
        !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.formPhone.phone)
      ) {
        this.$Message.error("请输入正确的手机号");
      } else {
        this.dataTimer = 5;
        let t = setInterval(() => {
          if (this.dataTimer <= 0) {
            this.retry = "";
            clearInterval(t);
            return;
          }
          this.retry = this.dataTimer--;
        }, 1000);
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.login-header {
  max-width: 1190px;
  min-width: 1080px;
  height: auto;
  margin: 40px auto 30px;
  .login-img {
    background-image: url(http://s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png);
    width: 82px;
    height: 54px;
    background-position: -188px -808px;
  }
}
.site-body {
  max-width: 1190px;
  min-width: 1080px;
  margin: 0 auto 70px;
  .body-img {
    height: 370px;
    margin: 0 115px 0 0;
    width: 480px;
  }
  .login-section {
    margin: 0 auto;
    width: 270px;
    position: relative;
    .blank {
      min-height: 18px;
    }
    .prompt {
      padding: 10px 0;
      color: #999;
      font-size: 12px;
      span {
        cursor: pointer;
        color: #fe8c00;
      }
    }
  }
}
.common {
  justify-content: space-between;
  .way {
    cursor: pointer;
    align-items: center;
    .common-img {
      background: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/normal.97888a3.png);
      background-size: contain;
      width: 14px;
      height: 14px;
    }
  }
}
.forget {
  cursor: pointer;
  color: #fe8c00;
  font-size: 12px;
  text-align: right;
  margin-top: 18px;
}
.divider {
  font-size: 14px;
  color: #666;
  margin: 0 !important;
}
.qq,
.weibo,
.zhifubao {
  width: 18px;
  height: 18px;
  margin-right: 20px;
  background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png);
  background-position: -1250px -491px;
}
.zhifubao {
  background-position: -1250px -563px;
}
.weibo {
  background-position: -1250px -545px;
}
.prompts {
  padding: 10px 0;
  font-size: 14px;
  span {
    cursor: pointer;
    color: #fe8c00;
  }
}
.gain-code {
  right: 0;
  position: absolute;
  top: 116px;
}
.code {
  width: 150px;
}
.login-footer {
  margin: 0 auto 30px;
  clear: both;
  max-width: 1190px;
  min-width: 1080px;
  font-size: 12px;
  color: #999;
  .site-info {
    margin-bottom: 20px;
    padding: 12px 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    ul {
      li {
        margin: 5px 0;
        padding: 0 16px;
        line-height: 14px;
        border-right: 1px solid #eee;
        cursor: pointer;
      }
    }
  }
  .copyright {
    span {
      cursor: pointer;
    }
  }
}
</style>
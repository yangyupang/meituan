<template>
  <div>
    <div class="regist-header">
      <div class="header-container flex">
        <div class="header-log">
          <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt @click="home" />
        </div>
        <div class="header-have flex">
          <div>已有美团账号？</div>
          <Button type="warning" size="small" style="color: #222;" to="/login">登录</Button>
        </div>
      </div>
    </div>
    <div class="regist-content">
      <div class="flex vertical-center">
        <div>手机号</div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="form-phone">
          <FormItem prop="phone">
            <Input
              v-model="formInline.phone"
              placeholder="请输入手机号"
              type="tel"
              style="width: 260px;"
            />
          </FormItem>
        </Form>
        <div class="pass flex" v-if="flag">
          <Icon type="md-checkbox" color="green" />
          <div>验证通过</div>
        </div>
      </div>
      <Button type="info" size="small" class="gain-code" v-if="!retry" @click="sendCode">免费获取短信动态码</Button>
      <Button type="info" size="small" class="gain-code" disabled v-else>{{retry}}秒后再试</Button>
      <div class="flex vertical-center">
        <div>短信验证码</div>
        <Input v-model="code" placeholder="请输入短信验证码" style="width: 260px;" />
      </div>
      <!-- 用户名 -->
      <div class="flex vertical-center">
        <div>用户名</div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="username">
            <Input
              prefix="ios-contact"
              placeholder="请输入用户名"
              v-model="formInline.username"
              style="width: 260px;"
            />
          </FormItem>
        </Form>
      </div>
      <!-- 邮箱 -->
      <div class="flex vertical-center">
        <div>邮箱</div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="form-email">
          <FormItem prop="email">
            <Input
              prefix="ios-at"
              placeholder="请输入邮箱号"
              v-model="formInline.email"
              style="width: 260px;"
            />
          </FormItem>
        </Form>
        <div class="pass flex" v-if="flag2">
          <Icon type="md-checkbox" color="green" />
          <div>验证通过</div>
        </div>
      </div>
      <!-- <div class="flex vertical-center"></div> -->
      <!-- 密码验证 -->
      <div class="authentication">
        <div class="container">
          <label style="position: relative;top: 28px;">创建密码</label>
          <Form
            ref="formInline"
            :model="formInline"
            :rules="ruleInline"
            inline
            class="create-password"
          >
            <FormItem prop="passwd">
              <Input
                v-model="formInline.passwd"
                id="inputValue"
                type="password"
                placeholder="请创建密码"
                style="width: 270px;"
              />
            </FormItem>
          </Form>
          <div class="input_span">
            <span id="weak">弱</span>
            <span id="middle">中</span>
            <span id="strong">强</span>
          </div>
        </div>
      </div>
      <!-- 二次密码 -->
      <div class="flex vertical-center">
        <div>确认密码</div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="passwdCheck">
            <Input
              v-model="formInline.passwdCheck"
              type="password"
              placeholder="请确认密码"
              style="width: 260px;"
            />
          </FormItem>
        </Form>
        <div class="pass flex" v-if="flag1">
          <Icon type="md-checkbox" color="green" />
          <div>验证通过</div>
        </div>
      </div>
      <!-- <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem>
          <Button type="warning" class="btn-register" @click="handleSubmit('formInline')">同意以下协议并注册</Button>
        </FormItem>
      </Form>-->
      <Button type="warning" class="btn-register" @click="register">同意以下协议并注册</Button>
      <div class="term flex">
        <span>《美团点评用户服务协议》</span>
        <span>《美团点评隐私政策》</span>
      </div>
    </div>
    <div class="regist-footer">
      <p>@meituan.com &nbsp;京ICP证070791号 &nbsp;京公网安备11010502025545号</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    //验证手机号
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        this.flag = false;
        callback(new Error("请输入您用的手机号码"));
        return;
      } else {
        if (value.length != 11 || !/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
          this.flag = false;
          callback(new Error("请输入正确的手机号码"));
          return;
        }
        this.flag = true;
        callback();
      }
    };
    //第一次验证密码
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请创建密码"));
      } else {
        if (this.formInline.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formInline.validateField("passwdCheck");
        }
        callback();
      }
    };
    //第二次验证密码
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        this.flag1 = false;
        callback(new Error("请确认密码"));
        return
      } else if (value !== this.formInline.passwd) {
        this.flag1 = false;
        callback(new Error("两次密码不同"));
        return
      } else {
        this.flag1 = true;
        callback();
      }
    };
    //验证邮箱
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        this.flag2 = false;
        callback(new Error("请输入您用的邮箱号码"));
        return
      } else {
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
          this.flag2 = false;
          callback(new Error("请输入正确的邮箱号码"));
          return
        }
        this.flag2 = true;
        callback();
      }
    };
    return {
      msgText: "",
      code: "",
      retry: "", // 5秒倒计时
      dataTimer: 5, // 5秒倒计时;
      timer: null,
      flag: false,
      flag1: false,
      flag2: false,
      formInline: {
        phone: "",
        username: "",
        passwd: "",
        passwdCheck: "",
        email: ""
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        phone: [
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    home() {
      this.$router.push("/");
    },
    // 发送验证码
    sendCode() {
      if (
        !this.formInline.phone ||
        this.formInline.phone.length != 11 ||
        !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.formInline.phone)
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
    },
    //密码强弱验证
    checkStrong(sValue) {
      var modes = 0;
      //正则表达式验证符合要求的
      if (sValue.length < 1) return modes;
      if (/\d/.test(sValue)) modes++; //数字
      if (/[a-z]/.test(sValue)) modes++; //小写
      if (/[A-Z]/.test(sValue)) modes++; //大写
      if (/\W/.test(sValue)) modes++; //特殊字符
      //逻辑处理
      switch (modes) {
        case 1:
          return 1;
          break;
        case 2:
          return 2;
          break;
        case 3:
        case 4:
          return sValue.length < 4 ? 3 : 4;
          break;
      }
      return modes;
    },
    //点击注册
    register() {
      if (
        this.formInline.username.trim() !== "" &&
        this.formInline.passwd.trim() === this.formInline.passwdCheck.trim() &&
        this.formInline.email.trim() !== ""
      ) {
        this.$api
          .getRegister({
            username: this.formInline.username.trim(),
            password: this.formInline.passwd.trim(),
            email: this.formInline.email.trim()
          })
          .then(res => {
            if (res.code === 200) {
              this.$Message.success(res.msg);
              this.$router.push("/login");
            }
            if (res.code === 500) {
              this.$Message.error(res.msg);
              this.formInline.username = "";
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$Message.error("有重要信息未填写");
      }
    }
    // handleSubmit(name) {
    //   // console.log(111);
    //   console.log(name);
    //   this.$refs[name].validate(valid => {

    //     if (valid) {
    //       this.$Message.success("Success!");
    // this.$api
    //   .getRegister(
    //     this.formInline.username.trim(),
    //     this.formInline.passwd.trim(),
    //     this.formInline.email.trim()
    //   )
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    //     } else {
    //       console.log(222);
    //       this.$Message.error("Fail!");
    //     }
    //   });
    // }
  },
  mounted() {},
  watch: {
    // 监听密码变化
    "formInline.passwd"(newpass, oldpass) {
      // console.log(newpass);
      this.msgText = this.checkStrong(newpass);
      if (this.msgText > 1 || this.msgText == 1) {
        document.getElementById("weak").style.background = "red";
      } else {
        document.getElementById("weak").style.background = "#eee";
      }
      if (this.msgText > 2 || this.msgText == 2) {
        document.getElementById("middle").style.background = "orange";
      } else {
        document.getElementById("middle").style.background = "#eee";
      }
      if (this.msgText == 4) {
        document.getElementById("strong").style.background = "#00D1B2";
      } else {
        document.getElementById("strong").style.background = "#eee";
      }
    }
  },
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.regist-header {
  border-bottom: 2px solid #d8d8d8;
  .header-container {
    max-width: 1190px;
    min-width: 1080px;
    margin: 0 auto;
    padding: 10px 0;
    justify-content: space-between;
    .header-log {
      width: 128px;
      img {
        width: 128px;
      }
    }
    .header-have {
      align-items: center;
    }
  }
}
.regist-content {
  max-width: 1190px;
  min-width: 1080px;
  margin: 0 auto 30px;
  padding-top: 30px;
  min-height: 300px;
  .vertical-center {
    align-items: center;
    margin: 20px 0;
    div {
      &:nth-child(1) {
        width: 100px;
        text-align: right;
        margin-right: 20px;
      }
    }
  }
  .gain-code {
    margin-left: 120px;
  }
}
.regist-footer {
  border-top: 1px solid #eee;
  padding-top: 20px;
  text-align: center;
  p {
    cursor: pointer;
    font-size: 13px;
    color: #999;
  }
}
.authentication {
  margin-left: 42px;
}
.form-phone,
.form-email {
  /deep/.ivu-form-item-error-tip {
    width: 140px;
  }
}
/deep/.ivu-form-item {
  margin: 0;
}
.create-password {
  margin-left: 54px;
  /deep/.ivu-form-item-error-tip {
    margin-left: 21px;
  }
}
.btn-register {
  margin-left: 120px;
}
.term {
  position: relative;
  padding: 3px 10px 3px 110px;
  margin: 0 auto 8px;
  zoom: 1;
  span {
    cursor: pointer;
    font-size: 13px;
    color: #fe8c00;
  }
}
.pass {
  margin-left: 150px;
  align-items: center;
}
#inputValue {
  width: 260px;
  margin-left: 12px;
  padding-left: 10px;
  border-radius: 3px;
}
.input_span {
  margin-left: 65px;
  margin-top: 30px;
}
.input_span span {
  display: inline-block;
  width: 87px;
  height: 16px;
  background: #eee;
  line-height: 20px;
  color: #ffff;
}

#weak {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 0px solid;
  margin-left: 13px;
  height: 16px;
  text-align: center;
}

#middle {
  border-left: 0px solid;
  border-right: 0px solid;
  height: 16px;
  text-align: center;
}

#strong {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 0px solid;
  height: 16px;
  text-align: center;
}
</style>
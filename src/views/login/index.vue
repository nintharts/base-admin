<template>
  <div class="login_container">
    <div class="bg_shadow"></div>
    <div class="bg_image">
      <img src="http://www.banlan.com.cn/Uploads/article/original_img3/1514294627.jpg" alt="" />
    </div>
    <a-row class="form_container">
      <a-col>
        <div class="login_logo">
          <h3>LOGO</h3>
          <h4>CONTROL CENTOR</h4>
        </div>
        <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入登录账号"
              v-decorator="[
                'username',
                {
                  rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }],
                  validateTrigger: 'change',
                },
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              size="large"
              placeholder="请输入登录密码"
              v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' },
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input-password>
          </a-form-item>
          <!-- 图形验证码 -->
          <!-- <a-form-item>
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="16">
                <a-form-item>
                  <a-input
                    size="large"
                    type="text"
                    placeholder="图形验证码"
                    v-decorator="[
                      'imgCaptchaCode',
                      { rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur' },
                    ]"
                  >
                    <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="8">
                <img class="img_captcha" :src="" @click="getCaptcha" />
              </a-col>
            </a-row>
          </a-form-item> -->

          <a-form-item class="login_btn">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
              >确定</a-button
            >
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import * as Api from './api';

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      state: {
        loginBtn: false,
      },
    };
  },
  methods: {
    handleSubmit() {
      e.preventDefault();
      // 表单验证
      validateFields(validateFieldsKey, { force: true }, async (err, values) => {
        // 执行登录操作
      });
    },
    // 获取图形验证码
    // async getCaptcha() {
    //   this.uuid = new Date().getTime();
    // },
    loginSuccess() {
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$router.push({ path: '/' });
        this.$notification.success({
          message: '欢迎',
          description: `欢迎回来`,
        });
      }, 1000);
      this.isLoginError = false;
    },

    requestFailed(err) {
      this.isLoginError = true;
      this.$notification['error']({
        message: '错误',
        description: err || '请求出现错误，请稍后再试',
        duration: 4,
      });
    },
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this;
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        state.loginType = 0;
      } else {
        state.loginType = 1;
      }
      callback();
    },
  },
};
</script>

<style lang="less">
.login_container {
  background: #f0f2f5;
  height: 100vh;
  position: relative;
  .bg_image,
  .bg_shadow {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    z-index: 1;
    img {
      width: 100%;
      opacity: 0.9;
    }
  }
  .bg_shadow {
    background: #02035852;
    z-index: 2;
  }
  .form_container {
    position: absolute;
    z-index: 3;
    width: 400px;
    left: 50%;
    margin-left: -200px;
    top: 20%;
    background: #ffffffdb;
    padding: 20px;
    border-radius: 3px;
  }
  .login_logo {
    margin-bottom: 20px;
    h3 {
      font-size: 25px;
      font-weight: 700;
      margin-bottom: 0;
    }
    h4 {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 40px;
    }
  }
  .img_captcha {
    border: 1px solid rgb(195, 195, 195);
    box-sizing: border-box;
    height: 40px;
    width: 100%;
    border-radius: 3px;
    margin-top: -3px;
  }
  .login_btn {
    .ant-btn-lg {
      width: 100%;
    }
  }
  .ant-form-item {
    margin-bottom: 15px;
  }
}
</style>

<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-inline">
            <validation-provider name="用户名" rules="required|email" v-slot="{ errors }">
              <input v-model="username" type="text" name="" placeholder="请输入" autocomplete="off" class="layui-input">
              <span style="color: crimson">{{ errors[0] }}</span>
            </validation-provider>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-block">
            <validation-provider name="密码" rules="required" v-slot="{ errors }">
              <input v-model="password" type="password" name="" placeholder="请输入" autocomplete="off"
                     class="layui-input">
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <validation-provider name="验证码" rules="required" v-slot="{ errors }">
              <input v-model="code" type="text" name="" placeholder="请输入" autocomplete="off" class="layui-input">
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <img :src="imgStr" alt="" @click="getCaptcha()">
        </div>

        <button type="button" class="layui-btn">登陆</button>
        <a href="http://www.layui.itze.cn" class="layui-btn">找回密码</a>
      </form>
    </div>
  </div>
</template>

<script>
import _axios from 'axios'
import {Base64} from "js-base64";
import {required, email} from 'vee-validate/dist/rules';
import {extend} from "vee-validate";

// No message specified.
extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  message: 'This {_field_} is required'
});

export default {
  name: 'App',


  data() {
    return {
      imgStr: '',
      username: '',
      password: '',
      code: '',
    }
  },
  mounted() {
    this.getCaptcha()
  },
  components: {},

  methods: {
    getCaptcha() {
      _axios.get('login/captcha')
          .then((res) => {
                if (res.status === 200) {
                  let obj = res.data;
                  if (obj.code === 200) {

                    this.imgStr = obj.data.captcha
                    console.log(Base64.decode(obj.data.captcha))
                  }
                }
                console.log(res)
              }
          )
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  width: 190px;
}
</style>

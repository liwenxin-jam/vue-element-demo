<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input type="text" ref="username" v-model="loginForm.username" placeholder="Username" name="username" tabindex="1" autocomplete="on"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return  {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入帐号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

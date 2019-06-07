<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">数据字典后台管理系统</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <c-svg-icon icon-class="user" />
        </span>
        <el-input type="text" ref="username" v-model.trim="loginForm.username" placeholder="Username" name="username" tabindex="1" autocomplete="on"/>
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写锁定已开启" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <c-svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" ref="password" v-model.trim="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <c-svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" class="login-button" @click.native.prevent="handleLogin">登 录</el-button>
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
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
    }
  },
  methods: {
    //  检查大写锁定
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if ((shiftKey && (key >= 'a' && key <= 'z')) || (!shiftKey && (key >= 'A' && key <= 'Z'))) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    // 是否显示密码框
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录方法
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取url中query除了redirect外的参数
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss">
@import "./reset.scss";
</style>
<style lang="scss" scoped>
@import "./index.scss";
</style>

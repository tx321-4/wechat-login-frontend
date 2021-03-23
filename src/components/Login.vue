<template>
  <el-dialog
    title="用户登陆"
    width="400px"
    :visible="visible"
    :before-close="handleClose"
  >
    <el-form v-show="!showQrcode">
      <el-form-item label="账户">
        <el-input v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="loginForm.userpass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div v-show="showQrcode">
      <div class="mask" @click="getQrcode" v-show="showmask">二维码已过期</div>
      <img class="qrcode" :src="qrcode" alt="" />
      <div>{{ loginHint }}</div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleShowQrcode" v-show="!showQrcode"
        >二维码登陆</el-button
      >
      <el-button @click="handleShowUserpass" v-show="showQrcode"
        >账户密码登陆</el-button
      >
      <el-button v-show="!showQrcode">确认登陆</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { autoLogin, getQrcode, login } from '../api/login'
export default {
  name: 'Login',
  data () {
    return {
      showQrcode: false,
      loginForm: {
        username: '',
        userpass: ''
      },
      qrcode: '',
      key: '',
      loginInterval: null,
      loginHint: '',
      showmask: false

    }
  },
  props: ['visible'],
  created(){
    this.autoLogin();
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false);
    },
    handleShowQrcode () {
      this.showQrcode = true;
      this.getQrcode();
    },
    getQrcode () {
      const that = this;
      getQrcode().then(function (res) {
        if (res.code == 0) {
          that.qrcode = res.data.url;
          that.key = res.data.key;
          that.loginInterval = setInterval(that.login, 3000)
          that.showmask = false;
          that.loginHint = '请扫描二维码关注公众号进行登陆'
        }
      })
    },
    login () {
      const that = this;
      login({
        params: {
          key: this.key
        }
      }).then(function (res) {
        if (res.code == 0) {
          that.handleClose();
          that.autoLogin();
          that.$message({
            message: '登录成功',
            type: 'success'
          })
          clearInterval(that.loginInterval)
        } else if (res.code == 1) {
          // 二维码过期
          clearInterval(that.loginInterval)
          that.loginHint = "二维码已过期，请点击二维码重新获取"
          that.showmask = true
        }
      })
    },
    autoLogin () {
      const that = this;
      autoLogin().then(function (res) {
        if (res.code == 0) {
          // store 里的操作
          //console.log('login success')
          that.$store.dispatch('user/setUserInfo',res.data.userInfo)
        }
      })
    },
    handleShowUserpass () {
      this.showQrcode = false;
    }
  }

}
</script>

<style>
.qrcode {
  width: 200px;
  height: 200px;
  border: 1px solid #e2e2e2;
}
.mask {
  width: 200px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  left: 100px;
  font-weight: bold;
}
</style>
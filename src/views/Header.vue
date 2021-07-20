<template>
  <div>
    <el-menu mode="horizontal" :router="true">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/menu1">菜单一</el-menu-item>
      <el-menu-item index="/menu2">菜单二</el-menu-item>
      <el-menu-item index="/ucenter">个人中心</el-menu-item>
      <el-submenu index="2" v-if="this.$store.getters.userInfo" style="float: right">
          <template slot="title">
           <img class="avatar" :src="this.$store.getters.userInfo.avatarUrl" alt="">
          {{this.$store.getters.userInfo.nickName}}
          </template>
          <el-menu-item @click="handleLogOut">退出登陆</el-menu-item>
        </el-submenu> 
      <el-menu-item v-else style="float: right">
        <div  @click="handleLogin">登陆</div>
      </el-menu-item>
    </el-menu>
    <login :visible.sync="show"></login>
  </div>
</template>

<script>
import login from '@/components/Login.vue'
import store from '@/store'

export default {
  name: 'Header', 
  data(){
    return{
      show: false
    }
  },
  components: {
    login
  },
  methods:{
    handleLogin(){
      this.show = true
    },
    handleLogOut(){
      store.dispatch('user/logOut')
       //this.$router.push('/')
    }
  }
}
</script>
<style>
.avatar{
  width:40px;
  height: 40px;
  border-radius: 40px;
}
</style>

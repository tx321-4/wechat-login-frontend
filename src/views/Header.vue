<template>
  <div>
    <el-menu mode="horizontal" :router="true">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item>菜单一</el-menu-item>
      <el-menu-item>菜单二</el-menu-item>
      <el-menu-item index="/ucenter">个人中心</el-menu-item>
      <el-menu-item style="float: right">
        <template v-if="this.$store.getters.userInfo">
          <img class="avatar" :src="this.$store.getters.userInfo.avatarUrl" alt="">
          {{this.$store.getters.userInfo.nickName}}
        </template>
        <div  v-else @click="handleLogin">登陆</div>
      </el-menu-item>
    </el-menu>
    <login :visible.sync="show"></login>
  </div>
</template>

<script>
import login from '@/components/Login.vue'
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

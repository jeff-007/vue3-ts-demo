<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <el-row :gutter="20" class="navigation">
            <el-col :span="4">
                <img :src="require('../assets/logo.png')" class="logo" alt="">
            </el-col>
            <el-col :span="16">
                <p class="main-title">后台管理系统</p>
            </el-col>
            <el-col :span="4">
                <p>登录信息</p>
            </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
            router
      >
        <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
            <el-icon><setting /></el-icon>
            <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const router = useRouter()
const menuList = router.getRoutes().filter(route => {
  const { meta } = route
  return meta.isShow
})

onMounted(() => {
  console.log('router', router, router.getRoutes())
})

</script>

<style lang="scss" scoped>
.header{
    background: rgba(9, 41, 68, 0.6);
    .navigation{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 8px 16px;
        color: rgba(255, 255, 255, 1);
        height: var(--el-header-height);
        .logo{
            width: 32px;
            height: auto;
        }
        .main-title{
            text-align: center;
            font-size: 20px;
            font-weight: bold;
        }
    }
}
.el-menu{
    height: calc(100vh - 60px);
}
</style>

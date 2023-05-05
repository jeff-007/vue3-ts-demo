<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <el-row :gutter="20" class="navigation">
            <el-col :span="4">
                <img :src="require('../assets/logo.png')" class="logo" alt="">
            </el-col>
            <el-col :span="16">
              <div class="figure">
                <div v-for="index in 6" :key="index" class="title-wrap">
                  <p class="main-title">后台管理系统</p>
                </div>
                <!-- <p>后台管理系统</p> -->
              </div>
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

  <!-- <div class="container">
    <div class="cube">
      <div class="face front">1</div>
      <div class="face back">2</div>
      <div class="face right">3</div>
      <div class="face left">4</div>
      <div class="face top">5</div>
      <div class="face bottom">6</div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { extend } from 'lodash'
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

// 实现一个通用First<T>，它接受一个数组T并返回它的第一个元素的类型
type First<T extends any[]> = T extends [infer L, ...infer R] ? L :never
type FirstPlus<T extends any[]> = T extends [] ? T[0] : never

// 实现 Capitalize<T> 它将字符串的第一个字母转换为大写，其余字母保持原样
type Capitalize<S extends string> = S extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : S

// 实现泛型TupleToUnion<T>，返回元组所有值的类型组成的联合类型
type TupleToUnion<T extends any[]> = T[number]
type TupleToUnionPlus<T extends any[]> = T extends [infer L, ...infer R] ? L | TupleToUnionPlus<R>: never

// 将联合类型转换为交叉类型
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

interface Dog {
  bark: () => void;
}

function dogBark<T extends Dog> (args: T) {
  args.bark()
}

type NameOf<T extends { name: unknown }> = T['name']

type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// Record<K, T>用来将K的每一个键(k)指定为T类型
type keys = 'Cat' | 'Dot'
type Animal = {
  name: string;
  age: number
}

type AppendToObject2<T, K extends keyof any, V> = {
  [P in keyof T | K]: P extends keyof T ? T[P] : V
}

type foo = {
  name: string;
  age: number
}

type coo = {
  age: number;
  sex: string
}

type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never
}

const data = {
  a: 3,
  hello: 'world'
}

onMounted(() => {
  console.log('router', router, router.getRoutes())
})

</script>

<style lang="scss" scoped>
.container {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border: none;
  .cube {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    perspective: 250px;
    backface-visibility: visible;
    // perspective-origin: 150% 150%;
    .face {
      display: block;
      position: absolute;
      width: 100px;
      height: 100px;
      border: none;
      line-height: 100px;
      font-family: sans-serif;
      font-size: 60px;
      color: white;
      text-align: center;
    }
    .front {
      background: rgba(0, 0, 0, 0.3);
      transform: translateZ(50px);
    }
    .back {
      background: rgba(0, 255, 0, 1);
      color: black;
      transform: rotateY(180deg) translateZ(50px);
    }
    .right {
      background: rgba(196, 0, 0, 0.7);
      transform: rotateY(90deg) translateZ(50px);
    }
    .left {
      background: rgba(0, 0, 196, 0.7);
      transform: rotateY(-90deg) translateZ(50px);
    }

    .top {
      background: rgba(196, 196, 0, 0.7);
      transform: rotateX(90deg) translateZ(50px);
    }

    .bottom {
      background: rgba(196, 0, 196, 0.7);
      transform: rotateX(-90deg) translateZ(50px);
    }
  }
}
.header{
    background: rgba(9, 41, 68, 0.6);
    height: 80px;
    .navigation{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        color: rgba(255, 255, 255, 1);
        height: 80px;
        .logo{
            width: 32px;
            height: auto;
        }
        .figure{
          animation: wobble 5s ease-in-out infinite;
          transform-style: preserve-3d;
          // perspective: 1000px;
          transform-origin: center center;
          position: relative;
          .title-wrap{
            display: block;
            width: 100%;
            position: absolute;
            animation: glow 5s ease-in-out infinite;
            &:nth-child(2) {
              transform: translateZ(4px);
            }
            &:nth-child(3) {
              transform: translateZ(8px);
            }
            &:nth-child(4) {
              transform: translateZ(12px);
            }
            &:nth-child(5) {
              transform: translateZ(16px);
            }
            &:nth-child(6) {
              transform: translateZ(20px);
            }
            &:nth-child(7) {
              transform: translateZ(24px);
            }
            .main-title{
              text-align: center;
              color: #333;
              font-size: 40px;
              position: relative;
              &::after{
                content: '后台管理系统';
                color: transparent;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
                background-clip: text;
                -webkit-background-clip: text;
                clip-path: circle(100px at 0% 50%);
                -webkit-clip-path: circle(100px at 0% 50%);
                animation: light 5s infinite;
              }
            }
          }
        }
    }
}
.el-menu{
    height: calc(100vh - 60px);
}
@keyframes light {
    0% {
    clip-path: circle(100px at 0% 50%);
    -webkit-clip-path: circle(100px at 0% 50%);
    }
    50% {
    clip-path: circle(100px at 100% 50%);
    -webkit-clip-path: circle(100px at 100% 50%);
    }
    100% {
    clip-path: circle(100px at 0% 50%);
    -webkit-clip-path: circle(100px at 0% 50%);
    }
}
@keyframes wobble {
    0%, 100% {
      transform: rotate3d(1, 1, 0, 40deg);
    }
    25% {
      transform: rotate3d(-1, 1, 0, 40deg);
    }
    50% {
      transform: rotate3d(-1, -1, 0, 40deg);
    }
    75% {
      transform: rotate3d(1, -1, 0, 40deg);
    }
  }
  @keyframes glow {
    0%, 100% {
      text-shadow: 0 0 10px #03a9f4;
    }
    25% {
      text-shadow: 0 0 10px #f441a5;
    }
    50% {
      text-shadow: 0 0 10px #ffeb3b;
    }
    75% {
      text-shadow: 0 0 10px #03a9f4;
    }
  }
</style>

<template>
    <div class="game-wrapper">
        <div class="camera">
            <!-- 地面 -->
            <div class="ground">
                <div class="box">
                    <div class="box-con">
                        <div class="wall">z</div>
                        <div class="wall">z</div>
                        <div class="wall">y</div>
                        <div class="wall">y</div>
                        <div class="wall">x</div>
                        <div class="wall">x</div>
                        <div class="linex"></div>
                        <div class="liney"></div>
                        <div class="linez"></div>
                    </div>
                    <!-- 棋盘 -->
                    <div class="pan"></div>
                </div>
            </div>
            <!-- 障碍物 -->
            <div class="block">
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
                <div class="wall"></div>
            </div>
            <div class="step">0步</div>
            <div class="per-step">在0步内走到终点</div>
            <div class="tip">提示</div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { onMounted } from 'vue'

// 二维数组棋盘地图
const grid = [
  0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
  0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1,
  0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0,
  1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
  1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1,
  0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
  1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0
]

const generatePan = () => {
  const con = document.getElementsByClassName('pan')[0]
  const block = document.getElementsByClassName('block')[0]
  const elArr = []
  grid.forEach((item, index) => {
    // 行
    const row = Math.floor(index / 15)
    // 列
    const column = index % 15
    const gezi = document.createElement('div')
    gezi.classList.add('pan-item')
    gezi.style.transformStyle = 'preserve-3d'
    // gezi.className = 'pan-item'
    con.appendChild(gezi)
    const newBlock = block.cloneNode(true)
    // 障碍物
    if (item === 1) {
      gezi.appendChild(newBlock)
    //   blockArr.push(c + '-' + r)
    }
    elArr.push(gezi)
  })
}

onMounted(() => {
  generatePan()
})

</script>

<style lang="scss" scoped>
.game-wrapper {
    font-size: 24px;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e0e0e0 10%, #ffffff 90%);
    overflow: hidden;
    position: relative;
    display: flex;
    background: url('../assets/bg.jpeg') center center no-repeat;
}

.camera {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 1220px;
    height: 1080px;
    perspective: 1200px;
    -webkit-perspective: 1200px;
    perspective-origin: 500px -200px;
    transform-style: preserve-3d;
    border: 5px solid #f45262;
}

.camera .ground {
    position: absolute;
    width: 900px;
    height: 900px;
    top: 50%;
    left: 50%;
    border: 2px solid #17b1e7;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;
    transform: translateX(-50%) translateY(-80%) rotateX(90deg) rotateZ(220deg);
}

.step {
    position: absolute;
    right: 50px;
    width: auto;
    color: #23c1f0;

}

.per-step {
    position: absolute;
    left: 50%;
    width: auto;
    color: #23c1f0;
}

.per-step span {
    color: red;
}

.tip {
    position: absolute;
    right: 20px;
    top: 100px;
    width: 100px;
    height: 40px;
    border-radius: 20px;
    background: #23c1f0;
    color: #fff;
    line-height: 40px;
    text-align: center;
}

.pan {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    transform-style: preserve-3d;
}

.pan-item {
    width: 48px;
    height: 48px;
    border: 1px solid #17b1e7;
    color: #fff;
    transform-style: preserve-3d;
}

.pan .pan-item {
    width: 48px;
    height: 48px;
    border: 1px solid #17b1e7;
    color: #fff;
    transform-style: preserve-3d;
}

.pan .pan-item:last-child {
    background: #fb7922;
}

.pan .pan-path {
    background-color: #b6f977;
    animation: light 1s ease-in infinite;
}

.box {
    transform-style: preserve-3d;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 750px;
    height: 750px;
    perspective: 800px;
    -webkit-perspective: 800px;
    perspective-origin: 400px 400px;
    border: 2px solid #17b1e7;
    transform: translateX(-50%) translateY(-50%) rotateZ(0deg);

    .box-con {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        /* border: 1px solid #f45262; */
        transform-style: preserve-3d;
        transform-origin: 50% 50%;
        transform: translateZ(25px);
        transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
}

.block {
    transform-style: preserve-3d;
    width: 48px;
    height: 48px;
    transform-origin: 25px 25px;
    transform: translateZ(-25px);
    transform: translateZ(25px);
    transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.linex {
    width: 200px;
    height: 2px;
    position: absolute;
    left: -75px;
    top: 25px;
    background: red;
}

.liney {
    width: 200px;
    height: 2px;
    position: absolute;
    left: -75px;
    top: 25px;
    background: #0f0;
    transform: rotateZ(90deg);
}

.linez {
    width: 200px;
    height: 2px;
    position: absolute;
    left: -75px;
    top: 25px;
    background: #00f;
    transform: rotateY(90deg);
}

.wall {
    color: #fff;
    content: "";
    position: absolute;
    font-size: 24px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fdd894;
    background-color: #fb7922;
    /* opacity: 0; */
    color: #f9fde6;
}

.block .wall {
    background-color: #152534;
    border: 1px solid #0c94e0;
}

.wall:nth-child(1) {
    transform: translateZ(25px);
}

.wall:nth-child(2) {
    transform: rotateX(180deg) translateZ(25px);
}

.wall:nth-child(3) {
    transform: rotateX(90deg) translateZ(25px);
}

.wall:nth-child(4) {
    transform: rotateX(-90deg) translateZ(25px);
}

.wall:nth-child(5) {
    transform: rotateY(90deg) translateZ(25px);
}

.wall:nth-child(6) {
    transform: rotateY(-90deg) translateZ(25px);
}

@keyframes light {
    0% {
        opacity: 0.2;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.2;
    }
}
</style>

<script setup>
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {onMounted, reactive, ref} from "vue";

const router = useRouter()
const store = useStore()

const resList = reactive([])

// 在组件挂载后执行操作
onMounted(() => {
  resList.splice(0, resList.length)
  for (let i = 0; i < store.state.levelInfo.length; i++) {
    for (let j = 0; j < store.state.levelInfo[i].count; j++) {
      store.state.levelInfo[i].res.push('')
    }
    resList.push(store.state.levelInfo[i].res)
  }
  console.log(resList)
})

// 控制是否正在运行的标志
const isRunning = ref(false)

// 定时器 ID
let intervalId = null

const start = () => {

  if (isRunning.value) return // 防止重复点击
  isRunning.value = true
  let tmpList = []

  intervalId = setInterval(() => {
    // 随机选择一个数字
    tmpList = []
    resList.splice(0, resList.length)
    for (let i = 0; i < store.state.num;) {
      const randomIndex = Math.floor(Math.random() * store.state.lotteryList.length)
      const randomValue = store.state.lotteryList[randomIndex]

      // 确保不重复，若随机到的数字已存在，则继续随机
      if (tmpList.indexOf(randomValue) === -1) {
        tmpList.push(randomValue)
        i++
      }
    }
    let k = 0
    for (let i = 0; i < store.state.levelInfo.length; i++) {
      for (let j = 0; j < store.state.levelInfo[i].count; j++) {
        store.state.levelInfo[i].res[j] = tmpList[j + k]
      }
      k += store.state.levelInfo[i].count
      resList.push(store.state.levelInfo[i].res)
    }

    console.log(resList)
  }, 20) // 每 0.1 秒选择一个数字
}

// 停止按钮的事件处理函数
const stop = () => {
  if (!isRunning.value) return // 如果没有在运行，直接返回

  isRunning.value = false
  clearInterval(intervalId) // 清除定时器
}

function aaa() {
  console.log(store.state.lotteryList)
  console.log(store.state.levelInfo)
}
</script>

<template>
  <el-container>
    <el-main>
      <el-text class="mx-1" size="large" type="danger">
        抽奖结果
      </el-text>
      <el-divider/>
      <div style="margin-top: 5%" v-for="(info, index) in store.state.levelInfo" :key="index">
        <el-text class="mx-1" size="large"> {{ info.name }}</el-text>

        <div style="margin-top: 1%" v-for="(res ,index2) in resList[index]" :key="index2">
          <el-input style="width: 240px" v-model="resList[index][index2]"></el-input>
        </div>
      </div>
      <el-divider/>
      <div>
        <el-button @click="start"> 开始</el-button>
        <el-button @click="stop"> 停止</el-button>
      </div>

    </el-main>
  </el-container>
</template>

<style scoped>

</style>
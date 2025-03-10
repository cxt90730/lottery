<script setup>
import {reactive, ref} from 'vue'
import {ImportFile} from "../../wailsjs/go/pkg/App.js";
import { ElMessage } from 'element-plus'
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()
const data = reactive({
  levels: [{
    name: '一等奖',
    count: 1,
    res : [],
  }, {
    name: '二等奖',
    count: 2,
    res : [],
  }, {
    name: '三等奖',
    count: 3,
    res : [],
  }],
})

const list = ref([])

const addLevel = () => {
  data.levels.push({
    name: '新奖项' + (data.levels.length + 1),
    res : [],
  })
}

const deleteLevel = (index) => {
  data.levels.splice(index, 1)
}

const importFile = () => {
  ImportFile().then((res) => {
    console.log(res)
    if (res.Err === null) {
      ElMessage({
        message: 'Import success. Count: ' + res.List.length,
        type: 'success',
      })
      list.value = res.List
      console.log(list)
    } else {
      console.log('Import failed' + res.Err)
    }
  })
}

const lottery = () => {
  if (list.value.length === 0) {
    ElMessage({
      message: '请先导入文件',
      type: 'error',
    })
    return
  }
  let num = 0
  for (let i = 0; i < data.levels.length; i++) {
    num += data.levels[i].count
  }
  if (num === 0) {
    ElMessage({
      message: '奖品数量不能为0',
      type: 'error',
    })
    return
  }
  if (num === 1 && list.value.length === 1) {
    ElMessage({
      message: '奖品数量和人数不能同时为1',
      type: 'error',
    })
    return
  }
  if (list.value.length < num) {
    ElMessage({
      message: '奖品数量大于参与人数',
      type: 'error',
    })
    return
  }
  store.commit('setLevelInfo', data.levels)
  store.commit('setLotteryList', list.value)
  store.commit('setNum', num)
  router.push({
    path: '/main'
  })
}

</script>

<template>
  <el-container>
    <el-main>
      <div>
        <img id="logo" alt="Wails logo" src="../assets/images/lottery.png"/>
      </div>
      <el-text>
        <h1>Your Title of Lottery</h1></el-text>
      <div style="display: block">
        <el-button type="primary" @click="addLevel">
          <el-icon style="padding-right: 2%">
            <Plus/>
          </el-icon>
          添加奖项
        </el-button>
        <el-button type="primary" @click="importFile">
          <el-icon style="padding-right: 2%">
            <UploadFilled/>
          </el-icon>
          导入文件
        </el-button>
        <div v-show="list && list.length > 0">
          <el-text>导入文件成功，共{{ list.length }}条数据</el-text>
        </div>
        <div v-for="(level, index) in data.levels" :key="index">
          <el-space wrap style="margin: 1%">
            <el-text>奖项{{ index + 1 }}</el-text>
            <el-input type="text" v-model="level.name" placeholder="名称"/>
            <el-text>数量</el-text>
            <el-input type="text" v-model="level.count" placeholder="数量"/>
            <el-button type="danger" @click="deleteLevel(index)" circle>
              <el-icon>
                <Minus/>
              </el-icon>
            </el-button>
          </el-space>

        </div>
        <el-button type="danger" @click="lottery" round >
          <el-icon style="padding-right: 2%">
            <Promotion/>
          </el-icon>
          开始抽奖
        </el-button>
      </div>
    </el-main>
  </el-container>


</template>

<style scoped>

</style>

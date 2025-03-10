import {createApp} from 'vue'
import App from './App.vue'
import './style.css';
import router from "./router";
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import {createStore} from 'vuex'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

const store = createStore({
    state: {
        lotteryList: [],
        levelInfo: [],
        num: 0
    },
    mutations: {
        setLotteryList(state, payload) {
            state.lotteryList = payload;
        },
        setLevelInfo(state, payload) {
            state.levelInfo = payload;
        },
        setNum(state, payload) {
            state.num = payload;
        }
    }
})

app.use(ElementPlus).use(router).use(store).mount('#app')
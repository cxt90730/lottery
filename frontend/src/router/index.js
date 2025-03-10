import { createRouter, createWebHashHistory } from "vue-router";
import lottery from "../components/Lottery.vue";
import main from "../components/Main.vue";

const routes = [
    {
        path: "/",
        name: "Lottery",
        component: lottery,
    },
    {
        path: "/main",
        name: "Main",
        component: main,
    }
];


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
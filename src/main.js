import './assets/main.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import locale from 'element-plus/dist/locale/zh-cn.js'
import ECharts from 'vue-echarts'
import { createI18n } from "vue-i18n"
import zh from "./lang/zh.js"
import en from "./lang/en.js"
import App from './App.vue'
const messages = {
    en,
    zh,
};
const i18n = createI18n({

    globalInjection: true,

    locale: "zh",

    messages,

    legacy: false,

});

const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist)

app.use(ElementPlus, { locale }).use(router).use(pinia).use(i18n).use(ECharts).mount('#app')

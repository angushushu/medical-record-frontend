import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

import 'dayjs/locale/zh-cn';
import locale from "element-plus/lib/locale/lang/zh-cn";

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000'

const app = createApp(App)

app.use(store).use(router).use(ElementPlus, {locale})
app.mount('#app')

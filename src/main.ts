import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import * as mockData from './mock'
import "highlight.js/styles/monokai.css";;
import {v4 as uuidv4} from 'uuid';

// @ts-ignore
axios.get = async (url: string) => {
    if (url === '/posts') {
        // 延迟加载
        return Promise.resolve({
            data: [mockData.todayPost,mockData.thisWeek,mockData.thisMonth]
        })
    }
}

// @ts-ignore
axios.post = async (url: string, paylod:Post) => {
    if (url === '/posts') {
        // 延迟加载
        const id = uuidv4();
        return Promise.resolve({
            data: {...paylod, id}
        })
    }

    if (url === '/users') {
        // 延迟加载
        const id = uuidv4();
        
        return Promise.resolve({
            data: {...paylod, id}
        })
    }
}

// @ts-ignore
axios.put = async (url: string, paylod:Post) => {
    if (url === '/posts') {
        // 延迟加载
        return Promise.resolve({
            data: {...paylod}
        })
    }
}


createApp(App).use(router).mount('#app')

// import {createApp} from 'vue/dist/vue.esm-bundler';
import {createApp} from 'vue';//编写.vue时没有问题的

import axios from 'axios'
import {sum} from 'js/math';
const {priceFormat} = require('./js/format');

import App from '@/vue/App';

import "./js/element";

//开启模块热替换
if(module.hot){
    module.hot.accept("./js/element.js",()=>{
        console.log("element模块发生更新了");
    })
}

console.log(sum(20,30));
console.log(priceFormat());


const app = createApp(App);
app.mount("#app");

console.log("123");
console.log("Hello World");

// axios.get("/api/moment").then(res=>{
//     //本质上请求/api/moment时会自动给加上http://localhost:7777/api/moment,
//     //而我们真正要请求到的是8888这个端口服务器地址
   
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })
// import _ from '../node_modules/lodash-es/lodash.default.js';

import _ from 'lodash-es';
import {createApp} from 'vue';

import {sum} from './js/math'
import mul from './ts/mul'
import App from './vue/App.vue';

import "./css/style.css"//不需要css-loader style-loader vite已经帮我们做好了
import "./css/title.less"

console.log("Hello World");
console.log(sum(20,30));
console.log(mul(200,300));

console.log(_.join(["abc","cba"],"-"));

//不用构建工具其实也可以 原生浏览器支持ES module的
//但是有些弊端
//某些文件是不识别的 ts vue
//如果包之间依赖太多，那么会发送过多的网络请求

const titleEl = document.createElement('div');
titleEl.className = "title";
titleEl.innerHTML = "Hello Vite";
document.body.appendChild(titleEl);

//vue
createApp(App).mount("#app");
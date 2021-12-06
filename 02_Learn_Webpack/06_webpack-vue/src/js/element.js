// import "css-loader!../css/style.css"
import "../css/style.css"
import "../css/title.less"
import "../css/image.css"
import "../../font/iconfont.css"

import zznhImage from '../img/zznh.jpg'
const divEl = document.createElement("div");
divEl.className = "title";
divEl.innerHTML = "你好啊，李银河";

//设置背景图片
//这种情况下不需要loader配置也能加载
const bgDivEl = document.createElement('div');
bgDivEl.className = "image-bg";

//设置img元素的src
const imgEl = document.createElement('img');
imgEl.src = zznhImage;

//i元素
const iEl = document.createElement("i");
iEl.className = "iconfont icon-RectangleCopy1"


document.body.appendChild(divEl);
// document.body.appendChild(bgDivEl);
document.body.appendChild(imgEl);
document.body.appendChild(iEl);


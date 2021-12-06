class Dep{
    constructor(){
        this.subscribers = new Set()  //订阅者集合 集合里面元素不能重复的 不会存在多个只执行一次就可以啦
    }
    //修改counter后产生的副作用
    addEffect(effect){
        this.subscribers.add(effect)//集合里用add
    }

    //通知所有的subscribers做一个执行
    notify(){
        this.subscribers.forEach(effect=>{
            effect();
        })
    }
}


const info ={counter:100};

const dep = new Dep();

function doubleCounter(){
    console.log(info.counter*2);
}

function powerCounter(){
    console.log(info.counter*info.counter);
}

dep.addEffect(doubleCounter);
dep.addEffect(powerCounter);

info.counter++;
dep.notify();

//如果要实现响应式  要把他依赖的函数做一个收集

//如果info.counter++;发生变化了
//所有收集到的函数就重新进行一个执行就可以了
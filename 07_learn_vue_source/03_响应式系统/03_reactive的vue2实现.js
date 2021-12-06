class Dep{
    constructor(){
        this.subscribers = new Set()  //订阅者集合 集合里面元素不能重复的 不会存在多个只执行一次就可以啦
    }


    depend(){
        if(activeEffect){
            this.subscribers.add(activeEffect);
        }
    }

    //通知所有的subscribers做一个执行
    notify(){
        this.subscribers.forEach(effect=>{
            effect();
        })
    }
}

let activeEffect = null;
function watchEffect(effect){
    activeEffect = effect;
    // dep.depend();
    effect();//加这行初始值也执行一次
    activeEffect = null;
}


//Map（key:value)是一个字符串
//WeakMap({key(对象):value}):key是一个对象,弱引用(垃圾回收可以把target=null回收掉)

const targetMap = new WeakMap();
function getDep(target,key){
    //1.根据对象(target)取出对应的Map对象
    let depsMap = targetMap.get(target); //取出value
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target,depsMap);
    }

    //2.取出具体的dep对象
    let dep = depsMap.get(key);
    if(!dep){
        dep = new Dep();
        depsMap.set(key,dep);
    }
    return dep;
}

/**操作
 * 1.让数据依赖收集变成自动收集(对counter,name依赖)，对raw进行数据劫持，
 *   一旦调用key的get时候,在这自动收集(前提dep.depend())
 *   设置值时拿到这个depend做一个通知,而不是手动做通知
 * 2.让不同的target和key可以获取到不同的dep,
 *   因为我们的每个dep肯定保留的数据是不一样的,依赖是不一样的
 *  所以getDep目的根据不同的target和key拿到不同的dep
 * 
 */

// vue2对raw进行数据劫持
function reactive(raw){//raw未加工的原始数据

    Object.keys(raw).forEach(key=>{

        const dep = getDep(raw,key);
        let value = raw[key];

        Object.defineProperty(raw,key,{
            get(){
                dep.depend();
                return value;
            },
            set(newValue){
                if(value!==newValue){
                     value = newValue;
                     dep.notify();//当我们的值发生改变时，就拿到dep,去通知它所有的依赖让他发生变化；
                }
            }
        })
    })
    return raw;
}



//测试代码
const info =reactive({counter:100,name:"why"});
const foo =reactive({height:1.88});

// const dep = new Dep();

//watchEffect1
watchEffect(function (){
    console.log("effect1",info.counter*2,info.name);
})

//watchEffect2
watchEffect(function (){
    console.log("effect2",info.counter*info.counter);
})

//watchEffect3
watchEffect(function (){
    console.log("effect3",info.counter+10,info.name);
})

//watchEffect4
watchEffect(function (){
    console.log("effect4",foo.height);
})


// info.counter++;

// info.name ="why";

foo.height = 2;

//如果要实现响应式  要把他依赖的函数做一个收集

//如果info.counter++;发生变化了
//所有收集到的函数就重新进行一个执行就可以了


//dep不应该随便收集 要有多个dep  这个dep是counter的，那么只收集counter的订阅者；
// dep1(info.counter) subscribers
// dep2(info.name) subscribers
// dep3(foo.height) subscribers
// dep应用某种某种数据结构对它进行一个管理

// const targetMap = new Map();
// targetMap[info] = new Map(info);
// infoMap[counter] = dep1.subscribers;
// infoMap[name] = dep2.subscribers;
// targetMap[foo] = new Map(foo);
// fooMap[height] = dep3.subscribers

// 哪个对象哪个属性发生改变了到底应该执行哪个副作用函数
// info.counter =


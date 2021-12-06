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

/**vue3
 * 新增属性，原来我只有{name,age}属性，后来我动态的给这里面添加了height属性，
 * 那么这个属性是不会做数据劫持的，你要想它做数据劫持，你必须再调用一次defienProperty
 * 对height调一次才可以，所以说对新增对象往往是无能为力的；
 * 
 * 但是vue给我们提供了一些api比如Vue.$set,相当于它帮你做一次重写操作，但是太麻烦了，
 * 而且这里还得有多余的api
 * 
 * 所以在vue3里使用Proxy进行劫持，proxy劫持的是整个对象的,即使新增属性也可以劫持，
 * 
 * 再一个就是修改对象不同，原来的修改的是原来的对象(把raw传进去最终又把raw返回了)
 * 但是使用proxy时它代理的是这个Proxy对象,修改的也是Proxy代理,只不过又回到set,get方法里
 * 又对原来对象做了一个处理
 * 
 * 第三个Proxy能比defienProperty观察更加丰富的api
 * 比如说可以观察has(不止get set)in操作符的捕获器
 * 删除操作，删除对象里某个属性 delete info[name]
 * 
 * Proxy作为新标准更受到浏览器的重视和性能优化
 * 
 * 缺点:Proxy不兼容IE
 */
// vue3对raw进行数据劫持
function reactive(raw){//raw未加工的原始数据

   return new Proxy(raw,{
       get(target,key){
          const dep = getDep(target,key);
          dep.depend();
          return target[key];
          //不对raw进行调用，否则容易循环引用
       },
       set(target,key,newValue){
         const dep = getDep(target,key);
         target[key] = newValue;
         dep.notify();
       }
   });
}

// const info = reactive({name:"123"});
// Proxy.name = "321";//修改的proxy对象值

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


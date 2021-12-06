function foo(){
    var m = 100;
}

foo(); //执行完那就被销毁掉了
console.log(m);//ReferenceError: m is not defined


function foo(){
    m = 100;
}
//这种语法本身就是一个语法错误
//js引擎特殊处理   var m是加入到这个函数AO里面的
//           m没有声明  会认为它是定义在全局下的  
foo(); 
console.log(m);//100

function foo(){
    var a = b =10;
    //转成两行代码
    //var a = 10;
    //b = 10;
}

foo();

console.log(a);// a is not defined
console.log(b);//10
 
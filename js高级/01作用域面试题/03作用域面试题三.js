var n = 100;

function foo1(){
    console.log(n);//100
}

function foo2(){
    var n=200;
    console.log(n);//200
    foo1();
}

foo2();
console.log(n);//100
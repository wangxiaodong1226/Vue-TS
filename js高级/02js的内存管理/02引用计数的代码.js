// var obj = {name:'why'}

// var info ={name:'kobe',friend:obj};

// var p = {name:'james',friend:obj};

// //弊端：循环引用
// var obj1 = {friend:obj2}
// var obj2 = {friend:obj1};

const b = 'inner';


function inner(){
    const b = 'inner b';
    function out(){
        console.log(b);
    }
    out();
}
inner();
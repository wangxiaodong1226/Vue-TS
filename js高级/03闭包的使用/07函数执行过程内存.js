function foo(){
    var name = "foo";
    var age = 18;

    function bar(){
        console.log(name);
        console.log(age);
    }
    return bar;
}

var fn = foo();
fn();


fn=null;
foo=null;
console.log(1=1);


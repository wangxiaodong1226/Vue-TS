var nums = [10,5,11,100,55];

// var newNums = [];
// for(var i=0;i<nums.length;i++){
//     var num = nums[i];
//     if(num%2===0){
//         newNums.push(num);
//     }
// }
// console.log(newNums);//[10,100]

//函数function:独立的function，那么称之为一个函数
//方法method:当我们的函数属于某一个对象时，称这个函数是这个对象的方法
// function foo(){}
// var obj={
//     foo:function(){}
// }
// obj.foo();

// var newNums = nums.filter(function(item,index,arr){
//     return item%2===0;
// })
// console.log(newNums);

//map：映射
// var newNums = nums.map(function(item){
//     return item*10;
// })
// console.log(newNums);

//forEach：迭代
// nums.forEach(function(item){
//     console.log(item);
// })

//find/findIndex
//es6-12
// var item = nums.find(function(item){
//     return item===11;
// })
// console.log(item);

// var friends =[
//     {name:"why",age:18},
//     {name:"kobe",age:40},
//     {name:"james",age:35},
//     {name:"curry",age:30}
// ]
// const findFriend = friends.find(function(item){
//     return item.name ==='james'
// })
// console.log(findFriend);

// var friendIndex = friends.findIndex(function(item){
//     return item.name==='james'
// })
// console.log(friendIndex);



//reduce：累加
// nums.reduce()
var total = 0;
for(var i=0;i<nums.length;i++){
    total +=nums[i]; 
}
console.log(total);

var newNums = nums.reduce(function(pre,cur){
    return pre+cur
},0);
console.log(newNums);

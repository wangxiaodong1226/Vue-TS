<template>
    <div>
    <h2>我是Vue渲染出来的</h2>
    <h2>{{title}}</h2>
    <hello-world></hello-world>
    </div>
</template>


<script>
import HelloWorld from './HelloWorld.vue'

export default {
    components:{
        HelloWorld:HelloWorld
    },
     data(){
        return {
            title:"Hello World",
            message:"哈哈哈"
        }
    },
    methods: {
        
    },
}
</script>

<style scoped>
/* App样式里添加作用域
    z这个样式只会在我当前组件里有效
*/
    h2{
        color:red;
    }
</style>
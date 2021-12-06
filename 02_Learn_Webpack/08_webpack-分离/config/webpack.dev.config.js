const {merge} = require('webpack-merge')

const commonConfig = require('./webpack.comm.config')

module.exports=merge(commonConfig,{
    mode:"development",//设置开发模式
    //development:开发阶段，会设置development
    //production 准备打包上线的时候，设置production
    devtool:"source-map",//生成源代码时会生成对应的source-map文件
    //设置source-map文件，建立js映射文件，方便调试代码和错误；
    //映射好处:报错时看到报错信息
    //不会说看到我们打包后的这个bundle文件找不到错误
    //映射到真实的代码文件里面

      //信息会被webpack内部读取到
    //在打包build时会用到 还是要把资源复制过去的 只不过开发不想复制了  直接提供服务
    devServer:{
        //如果我们有的资源没有从webpack里面加载到，那么我们会从另外一个地方加载
        contentBase:"./public",
        hot:true,
        // host:"0.0.0.0",
        port:7777,
        open:true,
        // compress:true
        proxy:{
            //请求这个api时可以代理到localhost
            // "/api":"http://localhost:8888"
            "/api":{
                target:"https://localhost:8888",
                pathRewrite:{
                    "^/api":""//以api开头重写为""
                },
                secure:false,//默认情况下为true,将不接受在HTTPS上运行且证书无效的后端服务器，如果需要，配置secure
                changeOrigin:true//修改源,服务器解析header看源对不对，如果有这个校验,服务器会拒绝返回数据的
                //让devServer内部把源默认改为https://localhost:8888这个源
            }
            //对/api/moment的请求会将请求代理到http://localhost:8888/api/moment
            //这样其实是有问题的，我们是不需要/api的
            //如果不希望传递/api,则需要重写路径
        }
    },
})
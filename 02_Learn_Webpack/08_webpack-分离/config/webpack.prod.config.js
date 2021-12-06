const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.comm.config')

module.exports=merge(commonConfig,{
    mode:"production",//设置开发模式
    plugins:[
        new CleanWebpackPlugin(),//自动会读取上下文里面的output
        new CopyWebpackPlugin({
            //匹配
            patterns:[
                {
                    from:"./public",
                    // to:"./",
                    globOptions:{
                        //忽略哪些文件
                        ignore:[
                            "**/index.html"
                        ]
                    }
                }
            ]
        }),
    ]
})
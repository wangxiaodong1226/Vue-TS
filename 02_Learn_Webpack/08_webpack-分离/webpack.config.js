const path = require('path');
//这是一个类
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const  HtmlWebpackPlugin= require("html-webpack-plugin")
const {DefinePlugin} = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {VueLoaderPlugin} = require('vue-loader/dist/index');


module.exports={
    //指定为 什么环境打包的
    target:"web",
    mode:"development",//设置开发模式
    //development:开发阶段，会设置development
    //production 准备打包上线的时候，设置production
    devtool:"source-map",//生成源代码时会生成对应的source-map文件
    //设置source-map文件，建立js映射文件，方便调试代码和错误；
    //映射好处:报错时看到报错信息
    //不会说看到我们打包后的这个bundle文件找不到错误
    //映射到真实的代码文件里面
    // watch:true,
    entry:"./src/main.js",
    output:{
        //绝对路径
        path:path.resolve(__dirname,"./build"),
        filename:"js/bundle.js"
    },
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
    resolve:{
        extensions:[".js",".json",".mjs",'.vue','ts'],
        alias:{//别名
            "@":path.resolve(__dirname,"./src"),
            "js":path.resolve(__dirname,"./src/js")
        }
    },
    module:{
        //很多的规则
        rules:[
           {
            test:/\.css$/, //正则表达式
            //1.loader的写法(语法糖)
            // loader:"css-loader"

            //2.完整的写法
            use:[
            //    {loader:"css-loader"}
            "style-loader",
             "css-loader",
             //从后往前加载的
            //  {
            //      loader:"postcss-loader",
            //      options:{
            //          postcssOptions:{
            //             plugins:[
            //                 //自动加上浏览器前缀了
            //                 require("autoprefixer")
            //             ]
            //          }
            //      }
            //  }
             "postcss-loader"
            ]
           },
           {
               test:/\.less$/,
               use:[
                  "style-loader",
                   "css-loader",
                   "less-loader"
               ]
           },
        //    {
        //        test:/\.(jpe?g|png|gif|svg)$/,
        //     //    use:"file-loader"
        //        use:{
        //            loader:"file-loader",
        //            options:{
        //             //    outputPath:"img",
        //                name:"img/[name]_[hash:6].[ext]"//hash防止名字重复
        //            }
        //        }
        //    },
        //    {
        //     test:/\.(jpe?g|png|gif|svg)$/,
        //     use:{
        //         loader:"url-loader",
        //         options:{
        //          //    outputPath:"img",
        //             name:"img/[name]_[hash:6].[ext]",//hash防止名字重复
        //             //一般我们有base64小的图片  否则会白屏
        //             //所以限制limit图片大小  大于限制的直接就不打包在bundle里了
        //             //只有在limit内的才会打包在bundle.js里面
        //             //提高从服务端请求的性能
        //             limit:100*1024
        //         }
        //     }
        //    }

        {
            test:/\.(jpe?g|png|gif|svg)$/,
            type:"asset",
            generator:{
                filename:"img/[name]_[hash:6][ext]"
            },
            parser:{
                dataUrlCondition:{
                    maxSize:100*1024
                }
            }
        },
        // {
        //     test:/\.(eot|ttf|woff2?)$/,
        //     use:{
        //         loader:"file-loader",
        //         options:{
        //             // outputPath:"font",
        //             name:"font/[name]_[hash:6].[ext]"
        //         }
        //     }
        // },
        {
            test:/\.(eot|ttf|woff2?)$/,
            type:"asset/resource",
            generator:{
                filename:"font/[name]_[hash:6][ext]"
            }
        },
        // {
        //     test:/\.js$/,
        //     use:{
        //         loader:"babel-loader",
        //         options:{
        //         //    plugins:[
        //         //     "@babel/plugin-transform-arrow-functions",
        //         //     "@babel/plugin-transform-block-scoping",
        //         //    ]
        //             presets:[
        //                 "@babel/preset-env"
        //             ]
        //         }
        //     }
        // }
        {
            test:/\.js$/,
            loader:"babel-loader"
        },
        {
            test:/\.vue$/,
            loader:"vue-loader"
        }
        ]
    },
    plugins:[
        //一个个的插件对象
        new CleanWebpackPlugin(),//自动会读取上下文里面的output
        // new HtmlWebpackPlugin()
        new HtmlWebpackPlugin({//添加index.html模板
            title:"webpack项目",
            template:"./public/index.html"
        }),
        new DefinePlugin({
            BASE_URL:"'./'",
            __VUE_OPTIONS_API__:true,
            __VUE_PROD_DEVTOOLS__:false

        }),
        // new CopyWebpackPlugin({
        //     //匹配
        //     patterns:[
        //         {
        //             from:"public",
        //             to:"./",
        //             globOptions:{
        //                 //忽略哪些文件
        //                 ignore:[
        //                     "**/index.html"
        //                 ]
        //             }
        //         }
        //     ]
        // }),
        new VueLoaderPlugin()

    ]
}
const path = require('path');
//这是一个类
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const  HtmlWebpackPlugin= require("html-webpack-plugin")
const {DefinePlugin} = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {VueLoaderPlugin} = require('vue-loader/dist/index');


module.exports={
    mode:"development",//设置开发模式
    //development:开发阶段，会设置development
    //production 准备打包上线的时候，设置production
    devtool:"source-map",//生成源代码时会生成对应的source-map文件
    //设置source-map文件，建立js映射文件，方便调试代码和错误；
    //映射好处:报错时看到报错信息
    //不会说看到我们打包后的这个bundle文件找不到错误
    //映射到真实的代码文件里面
    entry:"./src/main.js",
    output:{
        //绝对路径
        path:path.resolve(__dirname,"./build"),
        filename:"js/bundle.js"
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
        new CopyWebpackPlugin({
            //匹配
            patterns:[
                {
                    from:"public",
                    to:"./",
                    globOptions:{
                        //忽略哪些文件
                        ignore:[
                            "**/index.html"
                        ]
                    }
                }
            ]
        }),
        new VueLoaderPlugin()

    ]
}
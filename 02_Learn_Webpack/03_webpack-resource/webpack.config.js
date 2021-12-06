const path = require('path');

module.exports={
    entry:"./src/main.js",
    output:{
        //绝对路径
        path:path.resolve(__dirname,"./build"),
        filename:"bundle.js"
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
        }

        ]
    }
}
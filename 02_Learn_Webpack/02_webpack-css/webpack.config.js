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
        //     test:/\.(less|css)$/,
        //     use:[
        //        "style-loader",
        //         "css-loader",
        //         "less-loader"
        //     ]
        //   }
        ]
    }
}
module.exports = {
    devServer:{
        proxy:{
            "/dish":{
                target:"https://way.jd.com/jisuapi",
                changeOrigin:true,
                pathRewrite:{"^/dish":""}
            },
        }
    }
}
module.exports = {
    devServer: {
        proxy: {
            "/api": {
                ws: false,
                target: "http://localhost:8888/",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}
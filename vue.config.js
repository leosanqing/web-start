module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:9999/',
                changeOrigin: true
            }
        }
    }
}


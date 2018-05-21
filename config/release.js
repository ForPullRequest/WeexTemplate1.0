const webpack = require('webpack');
const path = require('path');

var banner = '// { "framework": "Vue" }\n'
var bannerExcludeFiles = [];
var bannerPlugin = new webpack.BannerPlugin(banner, {
    raw: true,
    exclude: bannerExcludeFiles
})
module.exports = {
    plugins: [
        bannerPlugin,
         new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        //保留banner
        comments: /{ "framework": "Vue" }/,
        sourceMap: true
    }),
],
};
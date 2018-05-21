const webpack = require('webpack');
const path = require('path');
var bannerExcludeFiles = [];
var banner = '// { "framework": "Vue" }\n'
var bannerPlugin = new webpack.BannerPlugin(banner, {
    raw: true,
    exclude: bannerExcludeFiles
})
module.exports = {
    plugins: [bannerPlugin],
};
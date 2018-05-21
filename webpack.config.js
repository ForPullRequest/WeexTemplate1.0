var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var cssnext = require('postcss-cssnext');


const production = process.env.NODE_ENV === 'production';
console.log(production);
const config = production ? require('./config/release.js'): require('./config/debug.js');


var entry = {};
var bannerExcludeFiles = [];

function walk(dir, root) {
    dir = dir || '.'
    var directory = path.join(__dirname, root, dir);
    fs.readdirSync(directory)
        .forEach(function (file) {
            var fullpath = path.join(directory, file);
            var stat = fs.statSync(fullpath);
            var extname = path.extname(fullpath);
            if (stat.isFile() && (extname === '.vue'||'.we')) {
                var name = path.join(dir, path.basename(file, extname));
                entry[name] = fullpath + '?entry=true';
                if (extname === '.we') {
                    bannerExcludeFiles.push(name + '.js')
                }
            } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
                var subdir = path.join(dir, file);
                walk(subdir, root);
            }
        });
}

walk("./", "src/project");
module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(we|vue)(\?[^?]+)?$/,
                loader: 'weex'
            },
        ]
    },
    resolveLoader: {
        modulesDirectories: ['./node_modules']
    },
    postcss: function () {
        return [cssnext({
            features: {
                autoprefixer: false
            },
        })]
    },
    vue: {
        lang: {
            cssnext: ['postcss']
        }
    },
    weex: {
        lang: {
            cssnext: ['postcss']
        }
    },
    plugins:config.plugins,

}
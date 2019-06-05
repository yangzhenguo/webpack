/**
 * Created by Sam on 2019/5/31.
 */
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { optimize: { CommonsChunkPlugin }, HotModuleReplacementPlugin } = require('webpack');

const PAGES = path.resolve(__dirname, './src/pages');
const dirs = fs.readdirSync(PAGES);

module.exports = {
    entry: () => new Promise(resolve => {
        let result = {
            jquery: 'jquery'
        }
        resolve(dirs.reduce((prev, next) => Object.assign({}, prev, {[next]: PAGES + '/' + next + '/index.js'}), result))
    }),
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/index-[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.(ttf|woff)$/,
            use: 'file-loader'
        }]
    },
    plugins: [
        ...['index', 'help', 'items'].map(chunk => new HtmlWebpackPlugin({
            title: chunk,
            chunks: ['jquery', chunk],
            template: `${PAGES}/${chunk}/index.html`,
            filename: `${chunk}/index.html`
        })),
        new VueLoaderPlugin(),
        new HotModuleReplacementPlugin(),
        /*
        new CommonsChunkPlugin({
            name: 'common',
            chunks: ['jquery']
        })
        */
    ],
    devServer: {
        hot: true,
        contentBase: false
    }
}
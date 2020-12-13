const webpack = require("webpack");
const path = require("path");
const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = merge(base, {
    mode: 'development',
    devtool: "eval-source-map",
    output: {
        filename: "[name].js",
        chunkFilename: '[name].js',
        sourceMapFilename: "[file].map",
        devtoolModuleFilenameTemplate: function (info) {
            return "file:///" + info.absoluteResourcePath;
        },
        umdNamedDefine: true
    },
    module: {
    },
    watchOptions: {
        ignored: ['/node_modules/', '/.traces/', '/dist/', '/.rpt2_cache/', '/_site/', '/.vscode/', '/tests/'],
        poll: 1000
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "fly to the moon",
            template: "!!ejs-loader!src/index.html",
            inject: false
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: false,
            }
        }
    },
    devServer: {
        contentBase: path.join(__dirname, "../"),
        compress: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 8666,
        hot: true,
        inline: true,
        open: true,
        watchContentBase: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
});

module.exports = config;

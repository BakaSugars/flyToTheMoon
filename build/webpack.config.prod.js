const webpack = require("webpack");
const path = require("path");
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.config.base');

var config = merge(base, {
    mode: 'production',
    devtool: false,
    output: {
        path: path.resolve("./docs"),
        filename: "[name].min.js",
        sourceMapFilename: "[file].map",
    },
    plugins: [
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: false,
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "fly to the moon",
            template: "!!ejs-loader!src/index.html",
            inject: false,
            filename: 'index.html'
        }),
    ]
})

module.exports = config;

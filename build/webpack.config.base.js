const webpack = require("webpack");
const path = require("path");
const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";
const isCastle = process.env.CASTLE && process.env.CASTLE.toLowerCase() === 'true';
const pkg = require('../package.json');

var config = {
    devtool: isProd ? false : "eval-source-map",
    entry: {
        game: ["./src/index.ts"]
    },
    output: {
        filename: "[name].min.js",
        chunkFilename: '[name].js',
        sourceMapFilename: "[name].min.map",
        devtoolModuleFilenameTemplate: function (info) {
            return "file:///" + info.absoluteResourcePath;
        },
        libraryTarget: 'umd',
        umdNamedDefine: true,
        jsonpFunction: 'FlyToTheMoonFunc'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(t|j)s?$/,
                use: [
                    'babel-loader',
                    {
                        loader: "ts-loader",
                        options: {
                            happyPackMode: true
                        }
                    },
                    'source-map-loader'
                ]
            },
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.(png|jpe?g|gif|svg)$/, loader: "url-loader?limit=8192" },
            // the configuration below is to fix: Can't import the named export 'feature' from non EcmaScript module
            {
                type: 'javascript/auto',
                test: /\.mjs$/,
                use: []
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.ts'
        ]
    },
    plugins: [
        // new ForkTsCheckerWebpackPlugin({
        //   checkSyntacticErrors: true
        // }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(nodeEnv)
            },
            __DEV__: JSON.stringify(!isProd),
            __CASTLE__: JSON.stringify(isCastle),
            __PACKAGE_VERSION__: JSON.stringify(pkg.version)
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        })
    ]
};

module.exports = config;

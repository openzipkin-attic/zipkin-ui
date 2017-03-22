var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const ZIPKIN_HOST = process.env.ZIPKIN_HOST;
const ZIPKIN_PORT = process.env.ZIPKIN_PORT;

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('target/classes/zipkin-ui'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'ZIPKIN_HOST': JSON.stringify(ZIPKIN_HOST),
                'ZIPKIN_PORT': JSON.stringify(ZIPKIN_PORT)
            }
        }),
        new webpack.LoaderOptionsPlugin({
         // test: /\.xxx$/, // may apply this only for some modules
            test: /\.css$/,
            options: {
                htmlLoader: {
                    minimize: false // workaround for ng2
                }
            }
       })
    ]
});

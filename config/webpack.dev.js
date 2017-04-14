var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ZIPKIN_BASE_URL = process.env.ZIPKIN_BASE_URL || 'http://localhost:9411';

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:3000/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ZIPKIN_BASE_URL': JSON.stringify(ZIPKIN_BASE_URL)
            }
        }),
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});

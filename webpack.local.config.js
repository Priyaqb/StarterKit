const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path')

module.exports = [{
        entry: ['./src/index.js'],
        output: {
            path: __dirname + '/dist',
            filename: 'bundle-[hash].js'
        },
        module: {
            rules: [{
                test: /\.html$/,
                use: {
                    loader: 'html-loader?interpolate'
                }
            }]
        },
        plugins: [
            new CleanWebpackPlugin(['dist/bundle-*.js'], { watch: true }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: false,
                template: './src/index.html'
            })
        ],
        mode: 'development'
    },
    {
        entry: ['./src/assets/stylesheets/index.scss'],
        output: {
            path: __dirname + '/dist/styles',
            filename: '[name].css'
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            }]
        },
        plugins: [
            new ExtractTextPlugin('style.css')
        ]
    }
]
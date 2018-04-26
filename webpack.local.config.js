const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer');
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
            new CleanWebpackPlugin(['dist/bundle-*.js'], {
                watch: true
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: false,
                template: './src/index.html'
            }),
            new CopyWebpackPlugin([
                {from:'./src/assets/fonts',to:'fonts'},
                {from:'./src/assets/images',to:'images'} 
            ]), 
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
                        use: ['css-loader?-autoprefixer!postcss-loader', 'sass-loader']
                    })
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader'
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('style.css'),
        ]
    },
    {
        entry: ['./src/assets/javascripts/index.js'],
        output: {
            path: __dirname + '/dist/js',
            filename: '[name].js'
        },
        plugins: [
            new webpack.ProvidePlugin({
                "$": "jquery",
                "jquery": "jquery",
                "jQuery": "jquery",
                "window.jQuery": "jquery"
            }),
        ]
    }
]
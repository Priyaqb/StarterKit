const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const glob = require("glob");


module.exports = [{
        entry: ['./src/index.js'],
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
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
            new CleanWebpackPlugin(['dist/bundle.js'], {
                watch: true
            }),
            new HtmlWebpackPlugin({
                filename: 'components/sidebar.html',
                inject: false,
                template: './src/components/sidebar.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: false,
                template: './src/index.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'views/header.html',
                inject: false,
                template: './src/views/header.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'views/footer.html',
                inject: false,
                template: './src/views/footer.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'views/form.html',
                inject: false,
                template: './src/views/form.html'
            }),
            new CopyWebpackPlugin([
                {from:'./src/assets/fonts',to:'fonts'},
                {from:'./src/assets/images',to:'images'},
                {from:'./src/assets/libs',to:'libs'},
            ])
        ],
        mode: 'development'
    },
    {
        entry: ['./src/assets/stylesheets/index.scss'],
        //entry: ['./src/assets/stylesheets/index.scss'],
        output: {
            filename: '[name].css',
            path: path.resolve(__dirname, 'dist/styles')
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
            new ExtractTextPlugin('[name].css'),
        ]
    },
    {
        entry: {
            header: "./src/assets/stylesheets/components/header/index.scss",
            footer: "./src/assets/stylesheets/components/footer/index.scss",
            normalForm: "./src/assets/stylesheets/components/normal-form/index.scss",
            shippingForm: "./src/assets/stylesheets/components/shipping-form/index.scss"
        },
        //entry: glob.sync('./src/assets/stylesheets/**/*.scss'),
        output: {
            filename: '[name].css',
            path: path.resolve(__dirname, 'dist/styles/components')
        },
        output: {
            path: path.resolve(__dirname, 'dist/styles'),
            filename: '[name].css',
            publicPath: '/'
        },
        module: {
            rules: [{
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ['css-loader',
                          {
                            loader: 'postcss-loader',
                            options: {
                              plugins: () => [autoprefixer()]
                            }
                          },
                          'sass-loader'    ]
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
            new ExtractTextPlugin('[name].css'),
        ]
    },
    {
        entry: ['./src/assets/javascripts/index.js'],
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist/js'),

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
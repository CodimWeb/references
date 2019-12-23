let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let autoprefixer = require('autoprefixer');
let cssnano = require('cssnano');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, options) => {
    let production = options.mode === 'production';

    let conf = {
        entry: './src/js/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/app.js',
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),   
            overlay: true,
            disableHostCheck: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /jquery.+\.js$/,
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },{
                        loader: 'expose-loader',
                        options: '$'
                    }]
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    url: false,
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer({
                                            browsers:['> 1%', 'last 2 version']
                                        }),
                                        cssnano ({})
                                    ],
                                    sourceMap: production ? false : 'inline'
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                        ]
                    })
                },
            ]
        },
        plugins: [
            new ExtractTextPlugin("./css/style.css"),
            new HtmlWebpackPlugin({
                filename: 'login.html',
                template: 'src/login.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'references.html',
                template: 'src/references.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'my-shares.html',
                template: 'src/my-shares.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'my-views.html',
                template: 'src/my-views.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'share-all.html',
                template: 'src/share-all.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'playlist.html',
                template: 'src/playlist.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'article-page.html',
                template: 'src/article-page.html'
            }),
            //img,
            new CopyWebpackPlugin([{
                from: './src/img',
                to: './img'
              },
              {
                from: './src/fonts',
                to: './fonts'
              }
            ])
        ]
    }

    conf.devtool = production ? false : 'eval-sourcemap';
    return conf;
}
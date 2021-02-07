const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: './src/js/index.js',

    devtool: 'source-map',

    output: {
        publicPath: '/dist/'
    },

    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: ['ejs-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            url: false,
                            minimize: false,
                            sourceMap: true
                        }
                    }]
                })
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/ejs/index.ejs',
            minify: true
        }),
        new ExtractTextPlugin({
            filename: 'main_style.css'
        })
    ]
}
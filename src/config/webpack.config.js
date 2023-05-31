const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config().parsed;

module.exports = {
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            templateParameters: {
                'GOOGLE_API_KEY': dotenv.GOOGLE_API_KEY
            }
        })
    ]
};

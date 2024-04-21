const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('./src/index.tsx')
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from:
                        path.resolve('src/manifest.json'),
                    to:
                        path.resolve('dist')
                },
                {
                    from:
                        path.resolve('images/'),
                    to:
                        path.resolve('dist')
                },
            ],
        }),
        new HtmlWebpackPlugin({
            title: "Extension Groups",
            filename: "popup.html",
            chunks: ['popup']
        })
    ],
    resolve: {
        extensions: ['.tsx', '.js', '.ts']
    },
    output: {
        filename: '[name].js'
    }
}
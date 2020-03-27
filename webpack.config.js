const { resolve } = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    output: {
        path: resolve("./public"),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader",
            },
            {
                test: /\.less/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            title: "Settlement",
        }),
        new MiniCSSExtractPlugin(),
    ],
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm",
        },
    },
};

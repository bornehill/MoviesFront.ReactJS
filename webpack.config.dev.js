const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
	mode: "development",
	entry: ["./src/index.js"],
	output: {
		path: path.join(__dirname, "/dev"),
		filename: "[name].bundle.js",
		chunkFilename: "[name].bundle.js",
	},
	devtool: "source-map",
	devServer: {
		compress: true,
		port: 3000,
		open: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /nodeModules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		],
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
	plugins: [
		new HtmlWebpackPlugin({ template: "./public/index.html" }),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[name].css",
		}),
		new Dotenv(),
	],
};

const path = require('path');

module.exports = {
	mode: "development",
	entry: './src/main.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				include: [path.resolve(__dirname, 'src')]
			},
			{
				test: /\.less$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{loader: 'less-loader'}
				],
				include: [path.resolve(__dirname, 'src')]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	output: {
		publicPath: "public",
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'public')
	}
};
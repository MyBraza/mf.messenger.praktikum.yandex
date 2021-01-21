const path = require('path');

module.exports = {
	mode: "development",
	entry: './src/main.ts',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		port: 3000,
		historyApiFallback: {
			index: 'index.html'
		}
	},
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
			},
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
			}
		]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.ts', '.js', '.json'],
		alias: {
			'handlebars' : 'handlebars/dist/handlebars.js',
			components: path.resolve(__dirname, 'src/components'),
			pages: path.resolve(__dirname, 'src/pages'),
			api: path.resolve(__dirname, 'src/api'),
			utils: path.resolve(__dirname, 'src/utils'),
		}
	},
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'public')
	}
};
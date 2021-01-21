const register = require('@babel/register').default;

register({
	extensions: ['.ts', '.tsx', '.js', '.jsx'],
	plugins: ['@babel/plugin-proposal-class-properties',
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				root: ["./"],
				alias: {
					"components": "./src/components",
					"pages": "./src/pages",
					"api": "./src/api",
					"utils": "./src/utils"
				}
			}
		]
	],
});
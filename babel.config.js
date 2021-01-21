module.exports = (api) => {
	api.cache(false);
	const presets = ["@babel/preset-typescript", "@babel/preset-env"];
	const plugins = ["@babel/plugin-proposal-class-properties",
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
	];
	return {presets, plugins};
}
	;
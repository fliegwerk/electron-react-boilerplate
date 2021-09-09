const path = require('path');
const nodeExternals = require('webpack-node-externals');

const coreModules = [
	'path',
	'fs',
	'tls',
	'net',
	'os',
	'process',
	'http',
	'https'
];

module.exports = {
	mode: 'production',
	externals: [...coreModules, nodeExternals()],

	entry: './electron/main/electron.ts',
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.main.json'
						}
					}
				],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'electron.js',
		libraryTarget: 'commonjs2'
	},
	/**
	 * Disables webpack processing of __dirname and __filename.
	 * If you run the bundle in node.js it falls back to these values of node.js.
	 * https://github.com/webpack/webpack/issues/2010
	 */
	node: {
		__dirname: false,
		__filename: false
	}
};

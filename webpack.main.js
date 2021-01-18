const path = require('path');
const webpack = require('webpack');
const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');

const appPackageJson = require(path.join(__dirname, 'public', 'package.json'));

const nativeModules = Object.keys(appPackageJson.dependencies);

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
	externals: [...coreModules, ...nativeModules],

	mode: 'production',

	/**
	 * Special target to build electron main files.
	 * See https://webpack.js.org/concepts/targets/ for more information.
	 */
	target: 'electron-main',

	entry: './electron/main/main.ts',
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
		filename: 'main.js',
		libraryTarget: 'commonjs2'
	},
	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'production'
		}),
		new LicenseCheckerWebpackPlugin({
			allow: '(Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT OR ISC OR (MIT AND Zlib))',
			outputFilename: 'oss-licenses-main.txt'
		}),
		new webpack.BannerPlugin({
			banner:
				'See oss-licenses-main.txt for licenses of open-source projects used here.'
		})
	],
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

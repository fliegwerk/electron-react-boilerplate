const webpack = require("webpack");
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");

module.exports = {
	webpack: {
		plugins: [
			new LicenseCheckerWebpackPlugin({
				allow: '(Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT OR ISC OR (MIT AND Zlib))',
				outputFilename: 'oss-licenses-renderer.txt'
			}),
			new webpack.BannerPlugin({
				banner:
					'See oss-licenses-renderer.txt for licenses of open-source projects used here.'
			})
		]
	}
};

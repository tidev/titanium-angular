'use strict';

const { AngularCompilerPlugin } = require('@ngtools/webpack');
const path = require('path');
const webpack = require('webpack');
const { GenerateAppJsPlugin, titaniumTarget } = require('webpack-dev-titanium');

module.exports = env => {
	const enableAot = env && env.production;
	const tsConfigPath = enableAot ? 'tsconfig.aot.json' : 'tsconfig.json';
	return {
		context: __dirname,
		target: titaniumTarget,
		entry: {
			bundle: enableAot ? './src/main.aot.ts' : './src/main.ts',
			vendor: './vendor/vendor.js',
		},
		output: {
			pathinfo: true,
			path: path.resolve('../Resources'),
			libraryTarget: 'commonjs2',
			filename: '[name].js',
		},
		resolve: {
			extensions: ['.ts', '.js', '.scss', '.css'],
			symlinks: false
		},
		resolveLoader: {
			symlinks: false
		},
		node: {
			fs: 'empty'
		},
		module: {
			rules: [
				{
					test: /\.html$|\.xml$/,
					use: 'raw-loader'
				},
				{
					test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
					loader: '@ngtools/webpack'
				}
			]
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				name: ['vendor'],
			}),
			new GenerateAppJsPlugin([
				'vendor',
				'bundle'
			]),
			// @todo Hack compiler to enable resource loading for platform sepcific templates
			new AngularCompilerPlugin({
				tsConfigPath: tsConfigPath,
				basePath: path.resolve('./src'),
				entryModule: path.resolve('./src/app.module#AppModule'),
				skipCodeGeneration: !enableAot
			})
			// @todo: Plugin for IPC communication with appc-daemon?
		]
	};
};

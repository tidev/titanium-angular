'use strict';

const { RawSource } = require('webpack-sources');

class GenerateAppJsPlugin {
	constructor(bundleNames) {
		this.bundleNames = bundleNames;
	}

	apply(compiler) {
		compiler.plugin('emit', (compilation, cb) => {
			compilation.assets['app.js'] = this.generateAppModule();

			cb();
		});
	}

	generateAppModule() {
		const appSource = this.bundleNames.map(bundleName => `require('${bundleName}');`).join('\n');
		return new RawSource(appSource);
	}
}

module.exports = GenerateAppJsPlugin;

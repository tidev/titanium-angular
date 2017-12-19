const WebpackBundler = require('../lib/WebpackBundler');

exports.id = 'ti.angular';
exports.init = (logger, config, cli) => {
	const bundler = new WebpackBundler(cli, logger);
	bundler.initialize();
};
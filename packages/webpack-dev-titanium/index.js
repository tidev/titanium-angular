const GenerateAppJsPlugin = require('./lib/plugins/GenerateAppJsPlugin');
const TitaniumAngularCompilerPlugin = require('./lib/plugins/TitaniumAngularCompilerPlugin');
const titaniumTarget = require('./lib/titanium-target');
const WatchStateNotifierPlugin = require('./lib/plugins/WatchStateNotifierPlugin');

module.exports = {
	GenerateAppJsPlugin,
	TitaniumAngularCompilerPlugin,
	titaniumTarget,
	WatchStateNotifierPlugin
};
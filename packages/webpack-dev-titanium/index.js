const GenerateAppJsPlugin = require('./plugins/GenerateAppJsPlugin');
const titaniumTarget = require('./titanium-target');
const WatchStateNotifierPlugin = require('./plugins/WatchStateNotifierPlugin');

module.exports = {
	GenerateAppJsPlugin,
	titaniumTarget,
	WatchStateNotifierPlugin
};
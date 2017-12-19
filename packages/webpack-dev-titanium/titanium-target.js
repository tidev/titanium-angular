module.exports = function titaniumTarget(compiler) {
	var options = this;
	var webpackLib = 'webpack/lib';

	var JsonpTemplatePlugin = require('./plugins/JsonpTemplatePlugin');
	var FunctionModulePlugin = require(webpackLib + '/FunctionModulePlugin');
	var NodeSourcePlugin = require(webpackLib + '/node/NodeSourcePlugin');
	var LoaderTargetPlugin = require(webpackLib + '/LoaderTargetPlugin');

	compiler.apply(
		new JsonpTemplatePlugin(options.output),
		new FunctionModulePlugin(options.output),
		new NodeSourcePlugin(options.node),
		new LoaderTargetPlugin('web')
	);
};
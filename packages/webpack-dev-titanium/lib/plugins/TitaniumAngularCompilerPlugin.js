const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { PlatformAwareFileSystem } = require('../PlatformAwareFileSystem');

class TitaniumAngularCompilerPlugin extends AngularCompilerPlugin {
	constructor(options) {
		super(options);

		this.targetPlatform = options.targetPlatform;
	}

	apply(compiler) {
		super.apply(compiler);

		compiler.plugin('environment', () => {
			compiler.inputFileSystem = new PlatformAwareFileSystem(compiler.inputFileSystem, this.targetPlatform);
			//compiler.watchFileSystem = new PlatformAwareWatchFileSystem(compiler.inputFileSystem);
		});
	}
}

module.exports = TitaniumAngularCompilerPlugin;
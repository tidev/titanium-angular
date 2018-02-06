const pathModule = require('path');

/**
 * A decorator around Angular's virtual file system to be able to load
 * platform specific files.
 */
class PlatformAwareFileSystem {
	constructor(virtualInputFileSystem, targetPlatform) {
		this.virtualInputFileSystem = virtualInputFileSystem;
		this.targetPlatform = targetPlatform;
	}

	stat(path, callback) {
		this.usePlatformPathIfExists(this.virtualInputFileSystem.stat, path, callback);
	}

	readdir(path, callback) {
		this.virtualInputFileSystem.readdir(path, callback);
	}

	readFile(path, callback) {
		this.usePlatformPathIfExists(this.virtualInputFileSystem.readFile, path, callback);
	}

	readJson(path, callback) {
		this.usePlatformPathIfExists(this.virtualInputFileSystem.readJson, path, callback);
	}

	readlink(path, callback) {
		this.usePlatformPathIfExists(this.virtualInputFileSystem.readlink, path, callback);
	}

	statSync(path) {
		return this.virtualInputFileSystem.statSync(path);
	}

	readdirSync(path) {
		return this.virtualInputFileSystem.readdirSync(path);
	}

	readFileSync(path) {
		return this.virtualInputFileSystem.readFileSync(path);
	}

	readJsonSync(path) {
		return this.virtualInputFileSystem.readJsonSync(path);
	}

	readlinkSync(path) {
		return this.virtualInputFileSystem.readlinkSync(path);
	}

	purge(changes) {
		return this.virtualInputFileSystem.purge(changes);
	}

	resolvePlatformSpecificPath(path) {
		const { dir, name, ext } = pathModule.parse(path);
		const platformPath = pathModule.join(dir, `${name}.${this.targetPlatform}${ext}`);
		return platformPath;
	}

	usePlatformPathIfExists(vfsFunction, originalPath, callback) {
		let candidatePath = originalPath;
		const platformPath = this.resolvePlatformSpecificPath(originalPath);
		this.virtualInputFileSystem.stat(platformPath, (err, stat) => {
			if (!err && stat.isFile()) {
				candidatePath = platformPath;
			}
			vfsFunction.apply(this.virtualInputFileSystem, [candidatePath, callback]);
		});
	}

	usePlatformPathIfExistsSync(vfsFunction, originalPath) {

	}
}

module.exports = {
	PlatformAwareFileSystem
};
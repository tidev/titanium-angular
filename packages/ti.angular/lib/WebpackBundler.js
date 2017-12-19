const path = require('path');
const spawn = require('child_process').spawn;

class WebpackBundler {
	constructor(cli, logger) {
		this.cli = cli;
		this.logger = logger;
	}

	initialize() {
		this.cli.on('build.pre.compile', (builder, callback) => {
			this.runWebpack(builder).then(callback).catch(callback);
		});
	}

	runWebpack(builder) {
		const config = {
			production: builder.deployType !== 'development' 
		};

		const args = [
			path.resolve(__dirname, '..', 'node_modules', 'webpack', 'bin', 'webpack.js'),
			'--progress',
			...this.generateEnvFlags(config)
		];

		console.log(args);

		return new Promise((resolve, reject) => {
			this.logger.info('Running initial Webpack build');
			const child = spawn('node', args, {
				stdio: 'inherit',
				cwd: path.join(this.cli.argv['project-dir'], 'app')
			});
			child.on('close', code => {
				if (code === 0) {
					resolve();
				} else {
					const error = new Error(`Webpack exited with non-zero exit code ${code}`);
					error.code = code;
					reject(error);
				}
			});
		});
	}

	generateEnvFlags(config) {
		return Object.keys(config).filter(settingName => config[settingName]).map(settingName => {
			let envFlag = `--env.${settingName}=`;
			switch (typeof config[settingName]) {
				case 'boolean': {
					envFlag += '1';
					break;
				}
				default: envFlag += config[settingName];
			}

			return envFlag;
		});
	}
}

module.exports = WebpackBundler;
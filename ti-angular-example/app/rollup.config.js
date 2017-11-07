import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import inject from 'rollup-plugin-inject';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';

class RxjsPatcher {
	resolveId(importee, importer) {
		if (importee.startsWith('rxjs/')) {
			return `${__dirname}/node_modules/rxjs/_esm5/${importee.replace('rxjs/', '')}.js`;
		}
	}
}
const patchRxjs = () => new RxjsPatcher();

class ZoneConfigurator {
	transformBundle(source) {
		let code = source.substring(0, 15);
		code += 'global.__Zone_disable_fs = true;\nglobal.__Zone_disable_nextTick = true;\n\n';
		code += source.substring(15);
		const map = {mappings: ''};
		return {
			code,
			map
		};
	}
}
const configureZone = () => new ZoneConfigurator();

export default {
	input: './build/main.js',
	output: {
		file: '../Resources/app.js',
		format: 'cjs'
	},
	name: 'Titanium-Angular-App',
	sourcemap: true,
	plugins: [
		configureZone(),
		patchRxjs(),
		inject({
			include: 'node_modules/@angular/**/*.js',
			Zone: 'zone.js'
		}),
		builtins(),
		nodeResolve({
			jsnext: true, main: true
		}),
		commonjs({
			include: 'node_modules/zone.js/**'
		}),
		babel()
	]
};
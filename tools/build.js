'use strict';
const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const pkg = require('../package.json');
const typescript = require('typescript');
const rollupPluginTypescript = require('rollup-plugin-typescript');

let promise = Promise.resolve();

// 清理输出目录
promise = promise.then(() => del(['dist/*']));

/**
 * rollup format选项注释
 *
 * String The formats of the generated bundle. One of the following:
 * amd – Asychronous Module Definition, used with module loaders like RequireJS
 * cjs – CommonJS, suitable for Node and Browserify/Webpack
 * es (default) – Keep the bundle as an ES module file
 * iife – A self-executing function, suitable for inclusion as a <script> tag
 * umd – Universal Module Definition, works as amd, cjs and iife all in one
 */

//格式
let formats = ['es', 'umd'];
formats.forEach((value)=> {
	promise = promise.then(() => rollup.rollup({
		entry: 'src/Main.ts',
		// external: Object.keys(pkg.dependencies),
		plugins: [
			rollupPluginTypescript({
				typescript: typescript
			})
		],
	}).then(bundle => bundle.write({
		dest: `dist/${value === 'umd' ? 'qiniu4js' : `qiniu4js.${value}`}.js`,
		format: value,
		sourceMap: true,
		moduleName: value === 'umd' ? 'Qiniu' : undefined,
	})));
});


// 复制 package.json 和 LICENSE.txt
promise = promise.then(() => {
	delete pkg.private;
	delete pkg.devDependencies;
	delete pkg.scripts;
	delete pkg.eslintConfig;
	delete pkg.babel;
	fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
	fs.writeFileSync('dist/LICENSE.txt', fs.readFileSync('LICENSE.txt', 'utf-8'), 'utf-8');
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console

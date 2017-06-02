'use strict'
const fs = require('fs')
const pkg = require('./package.json')

delete pkg.private
delete pkg.devDependencies
delete pkg.scripts
delete pkg.eslintConfig
delete pkg.babel
fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8')
fs.writeFileSync('dist/LICENSE.txt', fs.readFileSync('LICENSE.txt', 'utf-8'), 'utf-8')
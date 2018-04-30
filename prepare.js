var cp = require('child_process');
var rimraf = require('rimraf');
var path = require('path');
var root = __dirname;

// List of directories that require node_modules to be installed.
var list = [
    'packages/titanium-angular',
    'packages/webpack-dev-titanium',
    'ti-angular-example/app'
];

var currentDir;

console.log('Installing npm modules...');

// Loop the directories and clear + install npm modules.
for(var i = 0; i < list.length; i++) {
    currentDir = path.join(root, list[i]);
    process.chdir(currentDir);

    console.log(' ');
    console.log(list[i] + ' (' + (i + 1) + ' of ' + list.length + ')');
    console.log('Removing "' + path.join(list[i], 'node_modules') + '"...');
    rimraf.sync('node_modules', []);
    console.log('Installing "' + path.join(list[i], 'node_modules') + '"...');
    cp.execSync('npm install');
}
console.log('Done!');

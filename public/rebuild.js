const child_process = require('child_process');

let command = '../node_modules/.bin/electron-rebuild --parallel --types prod,dev --module-dir .';

if (process.platform === 'win32') {
	command = command.replace(/\//gm, '\\');
}

child_process.execSync(command, {
	stdio: 'inherit'
});

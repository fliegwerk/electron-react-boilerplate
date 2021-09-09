import { app, BrowserWindow, shell } from 'electron';
import { join } from 'path';
import isDev from 'electron-is-dev';

import IPCManager from './ipc';
import MenuBuilder from './menu';
import enableAutoUpdates from './autoUpdate';

let mainWindow: BrowserWindow | null = null;

function installExtensions() {
	const installer = require('electron-devtools-installer');
	const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
	const extensions = ['REACT_DEVELOPER_TOOLS'];

	installer
		.default(
			extensions.map(name => installer[name]),
			forceDownload
		)
		.then((name: string) => console.log(`Added extension: ${name}`))
		.catch((err: any) => console.log('An error occurred:', err));
}

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		backgroundColor: '#282c34',
		webPreferences: {
			nodeIntegration: false,
			nodeIntegrationInWorker: false,
			nodeIntegrationInSubFrames: false,
			contextIsolation: true,
			// disable devtools in packages apps
			devTools: isDev,
			spellcheck: false,
			// load built preload.js next to built electron.js
			preload: join(__dirname, 'preload.js')
		}
	});

	// and load the index.html of the app.
	mainWindow.loadURL(
		isDev ? 'http://localhost:3000/' : `file://${__dirname}/index.html`
	);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// generate additional components
	const ipcManager = new IPCManager(mainWindow);
	const menuBuilder = new MenuBuilder(mainWindow, ipcManager);

	// and add them to the window
	ipcManager.register();
	menuBuilder.buildMenu();

	// remove menu from window
	// to activate, also comment out the buildMenu() method above
	//mainWindow.removeMenu();

	//
	// event handlers for this specific window
	//

	// Open urls in the user's browser
	mainWindow.webContents.on('new-window', (event, url) => {
		event.preventDefault();
		shell.openExternal(url);
	});

	mainWindow.on('closed', () => {
		// remove all IPC handlers
		ipcManager.unregister();
	});
}

//
// app global events
//

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// install additional devtools if in development mode
	if (isDev) installExtensions();

	// create one window
	createWindow();

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// feed server, change this to your custom deployment server
const server = 'https://github.com/fliegwerk/electron-react-boilerplate';
const feedURL = `${server}/update/${process.platform}/${app.getVersion()}`;
const interval = 10 * 60 * 1000; // ms

// enable this if you want auto updates
//enableAutoUpdates(feedURL, interval);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

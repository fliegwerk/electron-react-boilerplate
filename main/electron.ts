import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import isDev from 'electron-is-dev';

import IPCManager from './ipc';
import MenuBuilder from './menu';

let mainWindow: BrowserWindow;

let ipcManager: IPCManager;
let menu: MenuBuilder;

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		backgroundColor: '#282c34',
		webPreferences: {
			contextIsolation: true,
			spellcheck: false
		}
	});

	// and load the index.html of the app.
	mainWindow.loadURL(
		isDev ? 'http://localhost:3000/' : `file://${join(__dirname, 'index.html')}`
	);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// build additional elements
	ipcManager = new IPCManager(mainWindow);
	menu = new MenuBuilder(mainWindow, ipcManager);

	// remove menu from window
	// to activate, also comment out the buildMenu() methods below
	//mainWindow.removeMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();
	ipcManager.register();
	menu.buildMenu();

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
			ipcManager.register();
			menu.buildMenu();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
		ipcManager.unregister();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

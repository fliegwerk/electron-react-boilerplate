import { ipcMain, Notification, BrowserWindow } from 'electron';
import { SHOW_NOTIFICATION } from "../src/model/IPC/IPCChannel";

export function register() {
	ipcMain.on(SHOW_NOTIFICATION, (_, message: string) => {
		showNotification(message);
	});
	// add more listeners
}

export function unregister() {
	ipcMain.removeAllListeners(SHOW_NOTIFICATION);
	// add more listeners to remove
}

function showNotification(message: string) {
	const notification = new Notification({
		title: 'New notification from electron-react-boilerplate',
		body: message
	});

	notification.show();
}

import {
	ipcMain,
	dialog,
	Notification,
	BrowserWindow,
	IpcMainEvent
} from 'electron';
import IPCChannel from '../../src/model/IPC/IPCChannel';

/**
 * Builds an ipc manager for an browser window.
 */
export default class IPCManager {
	private readonly browserWindow: BrowserWindow;

	/**
	 * Creates a new IPC manager and bind to a browser window.
	 * @param browserWindow the browser window
	 */
	constructor(browserWindow: BrowserWindow) {
		this.browserWindow = browserWindow;
	}

	register() {
		ipcMain.on(IPCChannel.SHOW_NOTIFICATION, this.showNotification);
		ipcMain.on(IPCChannel.TRIGGER_MODAL, this.triggerModal);
		// add more listeners
	}

	unregister() {
		ipcMain.removeAllListeners(IPCChannel.SHOW_NOTIFICATION);
		ipcMain.removeAllListeners(IPCChannel.TRIGGER_MODAL);
		// add more listeners to remove
	}

	showNotification(event: IpcMainEvent, message: string) {
		const notification = new Notification({
			title: 'New notification from electron-react-boilerplate',
			body: message
		});

		notification.show();
	}

	triggerModal(event: IpcMainEvent) {
		const choice = dialog.showMessageBoxSync(this.browserWindow, {
			type: 'question',
			buttons: ['Cancel', 'OK'],
			title: 'A nice modal',
			message: "What's your answer?"
		});

		event.reply(IPCChannel.REPLY_MODAL, choice === 1);
	}

	toggleMessage() {
		this.browserWindow.webContents.send(IPCChannel.TOGGLE_MESSAGE);
	}
}

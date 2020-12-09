import {
	ipcMain,
	dialog,
	Notification,
	BrowserWindow,
	IpcMainEvent
} from 'electron';
import {
	REPLY_MODAL,
	SHOW_NOTIFICATION,
	TRIGGER_MODAL
} from '../src/model/IPC/IPCChannel';

/**
 * Builds an ipc manager for an browser window.
 */
export default class IPCManager {
	private browserWindow: BrowserWindow;

	/**
	 * Creates a new IPC manager and bind to a browser window.
	 * @param browserWindow the browser window
	 */
	constructor(browserWindow: BrowserWindow) {
		this.browserWindow = browserWindow;
	}

	public register() {
		ipcMain.on(SHOW_NOTIFICATION, this.showNotification);
		ipcMain.on(TRIGGER_MODAL, this.triggerModal);
		// add more listeners
	}

	public unregister() {
		ipcMain.removeAllListeners(SHOW_NOTIFICATION);
		ipcMain.removeAllListeners(TRIGGER_MODAL);
		// add more listeners to remove
	}

	private showNotification(event: IpcMainEvent, message: string) {
		const notification = new Notification({
			title: 'New notification from electron-react-boilerplate',
			body: message
		});

		notification.show();
	}

	private triggerModal(event: IpcMainEvent) {
		const choice = dialog.showMessageBoxSync(this.browserWindow, {
			type: 'question',
			buttons: ['Cancel', 'OK'],
			title: 'A nice modal',
			message: "What's your answer?"
		});

		event.reply(REPLY_MODAL, choice === 1);
	}
}

/**
 * the IPC channels used in the app
 */
enum IPCChannel {
	// triggered by the electron menu
	TOGGLE_MESSAGE = 'ipcMain:toggle-message',
	// triggered by the render process
	SHOW_NOTIFICATION = 'ipcRenderer:show-notification',
	TRIGGER_MODAL = 'ipcRenderer:trigger:modal',
	// replies
	REPLY_MODAL = 'ipcMain:reply:modal'
}

export default IPCChannel;

/**
 * array of values of the IPC channels in the app
 */
export const channels = Object.keys(IPCChannel).map(
	key => IPCChannel[key as keyof typeof IPCChannel]
);

/**
 * the identification of registered handler (like `setTimeout`)
 */
export type HandlerID = number;

/**
 * the actual handler for incoming messages on the ipc bus
 */
export type Handler = (...args: any[]) => void;

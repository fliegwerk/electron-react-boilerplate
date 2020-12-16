import { contextBridge, ipcRenderer } from 'electron';
import IPCChannel, {
	channels,
	Handler,
	HandlerID
} from '../../src/model/IPC/IPCChannel';

type IPCHandler = Parameters<typeof ipcRenderer.on>[1];

// holds references to registered IPC handlers
const registeredHandlers: Array<IPCHandler> = [];

function registerHandler(channel: IPCChannel, handler: Handler): HandlerID {
	// create handler and store it for later usage
	const id = registeredHandlers.push((event, ...args) => handler(...args)) - 1;
	// and register it
	ipcRenderer.on(channel, registeredHandlers[id]);

	return id;
}

function unregisterHandler(channel: IPCChannel, id: HandlerID): boolean {
	if (id > 0 && id < registeredHandlers.length) {
		// unregister handler from IPC renderer via id
		ipcRenderer.removeListener(channel, registeredHandlers[id]);
		// and delete the stored reference
		delete registeredHandlers[id];

		return true;
	}

	return false;
}

contextBridge.exposeInMainWorld('ipc', {
	register: (channel: IPCChannel, handler: Handler): HandlerID => {
		// safety check if given channel is allowed in application
		if (channels.includes(channel)) {
			return registerHandler(channel, handler);
		}
		throw new TypeError(
			`Communication via channel ${channel} is not allowed in this application.`
		);
	},
	unregister: (channel: IPCChannel, id: HandlerID): boolean => {
		// safety check if given channel is allowed in application
		if (channels.includes(channel)) {
			return unregisterHandler(channel, id);
		}
		throw new TypeError(
			`Communication via channel ${channel} is not allowed in this application.`
		);
	},
	registerOnce: (channel: IPCChannel, handler: Handler): void => {
		// safety check if given channel is allowed in application
		if (channels.includes(channel)) {
			ipcRenderer.once(channel, (event, ...args) => handler(...args));
			return;
		}
		throw new TypeError(
			`Communication via channel ${channel} is not allowed in this application.`
		);
	},
	send: (channel: IPCChannel, ...args: any[]): void => {
		// safety check if given channel is allowed in application
		if (channels.includes(channel)) {
			ipcRenderer.send(channel, args);
			return;
		}
		throw new TypeError(
			`Communication via channel ${channel} is not allowed in this application.`
		);
	},
	invoke: (channel: IPCChannel, ...args: any[]): Promise<any> => {
		console.log('Preload - invoke - channels:', channels);
		// safety check if given channel is allowed in application
		if (channels.includes(channel)) {
			return ipcRenderer.invoke(channel, args);
		}
		throw new TypeError(
			`Communication via channel ${channel} is not allowed in this application.`
		);
	}
});

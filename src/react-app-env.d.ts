/// <reference types="react-scripts" />

import IPCChannel, { Handler, HandlerID } from './model/IPC/IPCChannel';

interface IPC {
	/**
	 * Registers an handler to an IPC channel.
	 * The handler would be called if a new message arrives.
	 * <br>
	 * More information on the `ipcRenderer` module from electron:
	 * {@link Electron.ipcRenderer.on}
	 *
	 * @param channel the channel to listen to
	 * @param handler the handler function to register
	 * @returns the id of the registered function useful to {@link unregister} the handler later
	 *
	 * @see unregister
	 */
	register(channel: IPCChannel, handler: Handler): HandlerID;

	/**
	 * Unregisters a handler from an IPC channel with the specified id.
	 * <br>
	 * More information on the `ipcRenderer` module from electron:
	 * {@link Electron.ipcRenderer.removeListener}
	 *
	 * @param channel the channel which the handler currently listen to
	 * @param id the id of the registered handler returned from the {@link register} function
	 * @returns `true` if the handler was successfully removed
	 * and `false` if the handler was found on the given id
	 *
	 * @see register
	 */
	unregister(channel: IPCChannel, id: HandlerID): boolean;

	/**
	 * Registers an one-time handler to an IPC channel.
	 * The handler is invoked only the next time a message arrives.
	 * <br>
	 * More information on the `ipcRenderer` module from electron:
	 * {@link Electron.ipcRenderer.once}
	 *
	 * @param channel the channel to listen to
	 * @param handler the handler function to register one-time
	 */
	registerOnce(channel: IPCChannel, handler: Handler): void;

	/**
	 * Send an asynchronous message to the main process via the specified channel, along with arguments.
	 * <br>
	 * More information on the `ipcRenderer` module from electron:
	 * {@link Electron.ipcRenderer.send}
	 *
	 * @param channel the channel to send to
	 * @param args additional arguments to send with the message
	 */
	send(channel: IPCChannel, ...args: any[]): void;

	/**
	 * Send a message to the main process and expect a result asynchronously.
	 * <br>
	 * More information on the `ipcRenderer` module from electron:
	 * {@link Electron.ipcRenderers.invoke}
	 *
	 * @param channel the channel to send to
	 * @param args additional arguments to send with the message
	 */
	invoke(channel: IPCChannel, ...args: any[]): Promise<any>;
}

declare global {
	interface Window {
		ipc: IPC;
	}
}

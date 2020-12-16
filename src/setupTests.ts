// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import IPCChannel, { Handler, HandlerID } from './model/IPC/IPCChannel';

// build ipc mock for jest runner
const ipcMock = {
	register: jest.fn<HandlerID, [IPCChannel, Handler]>(),
	unregister: jest.fn<boolean, [IPCChannel, HandlerID]>(),
	registerOnce: jest.fn<void, [IPCChannel, Handler]>(),
	send: jest.fn<void, [IPCChannel, ...any[]]>(),
	invoke: jest.fn<Promise<any>, [IPCChannel, ...any[]]>()
};

export type IPCMock = typeof ipcMock;

// apply ipc mock to global object
global.window.ipc = ipcMock;

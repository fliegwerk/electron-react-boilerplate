import { renderHook } from '@testing-library/react-hooks';
import useIPCEvents from './useIPCEvents';
import IPCChannel, { HandlerID } from '../model/IPC/IPCChannel';

type IPCMock = import('../setupTests').IPCMock;

const ipcMock = global.window.ipc as IPCMock;

describe('IPC Custom Hook', () => {
	// add here your expected channels
	const expectedChannels: IPCChannel[] = [
		IPCChannel.TOGGLE_MESSAGE,
		IPCChannel.REPLY_MODAL
	];

	describe('Registration of handlers', () => {
		it('should register to IPC channels', () => {
			// setup props
			const toggleMessageMock = jest.fn();
			const setModalChoiceMock = jest.fn();

			// render hook
			renderHook(() => useIPCEvents(toggleMessageMock, setModalChoiceMock));

			// check calls
			expect(ipcMock.register.mock.calls).toEqual(
				expectedChannels.map(channel => [channel, expect.any(Function)])
			);
		});

		it('should unregister and register again on handler change', () => {
			let startID: HandlerID = 0;
			// setup return values for ipc mocks
			ipcMock.register.mockImplementation(() => startID++);

			// setup props
			let toggleMessageMock = jest.fn();
			let setModalChoiceMock = jest.fn();

			// render hook
			const { rerender } = renderHook(() =>
				useIPCEvents(toggleMessageMock, setModalChoiceMock)
			);

			// generate some new handlers
			toggleMessageMock = jest.fn();
			setModalChoiceMock = jest.fn();

			// rerender hook
			rerender();

			// check registers and unregisters
			const registerCalls = [
				...expectedChannels.map(channel => [channel, expect.any(Function)]),
				...expectedChannels.map(channel => [channel, expect.any(Function)])
			];
			const unregisterCalls = expectedChannels.map((channel, index) => [
				channel,
				ipcMock.register.mock.results[index].value
			]);

			// check calls
			expect(ipcMock.register.mock.calls).toEqual(registerCalls);
			expect(ipcMock.unregister.mock.calls).toEqual(unregisterCalls);
		});

		it('should unregister on unmount', () => {
			let startID: HandlerID = 0;
			// setup return values for ipc mocks
			ipcMock.register.mockImplementation(() => startID++);

			// setup props
			let toggleMessageMock = jest.fn();
			let setModalChoiceMock = jest.fn();

			// render hook
			const { unmount } = renderHook(() =>
				useIPCEvents(toggleMessageMock, setModalChoiceMock)
			);

			// generate some new handlers
			toggleMessageMock = jest.fn();
			setModalChoiceMock = jest.fn();

			// unmount hook
			unmount();

			// check registers and unregisters
			const registerCalls = expectedChannels.map(channel => [
				channel,
				expect.any(Function)
			]);
			const unregisterCalls = expectedChannels.map((channel, index) => [
				channel,
				ipcMock.register.mock.results[index].value
			]);

			// check calls
			expect(ipcMock.register.mock.calls).toEqual(registerCalls);
			expect(ipcMock.unregister.mock.calls).toEqual(unregisterCalls);
		});
	});

	describe('Calls to handlers', () => {
		it('should call toggle message on new ipc message', () => {
			// setup props
			const toggleMessageMock = jest.fn<void, []>();
			const setModalChoiceMock = jest.fn();

			// render hook
			renderHook(() => useIPCEvents(toggleMessageMock, setModalChoiceMock));

			// call registered handler
			ipcMock.register.mock.calls[0][1]();

			// check calls
			expect(toggleMessageMock.mock.calls).toEqual([[]]);
		});

		it('should set modal choice based on new ipc message', () => {
			// setup props
			const toggleMessageMock = jest.fn();
			const setModalChoiceMock = jest.fn<void, [boolean]>();

			// render hook
			renderHook(() => useIPCEvents(toggleMessageMock, setModalChoiceMock));

			// call registered handler
			ipcMock.register.mock.calls[1][1](false);
			ipcMock.register.mock.calls[1][1](true);

			// check calls
			expect(setModalChoiceMock.mock.calls).toEqual([[false], [true]]);
		});
	});
});

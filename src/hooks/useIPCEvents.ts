import { useEffect } from 'react';
import IPCChannel from '../model/IPC/IPCChannel';

const { register, unregister } = window.ipc;

export default function useIPCEvents(
	toggleMessage: () => void,
	setModalChoice: (newChoice: boolean) => void
) {
	useEffect(() => {
		const toggleMessageId = register(IPCChannel.TOGGLE_MESSAGE, toggleMessage);
		const replyModalId = register(IPCChannel.REPLY_MODAL, (choice: boolean) => {
			setModalChoice(choice);
		});
		return () => {
			unregister(IPCChannel.TOGGLE_MESSAGE, toggleMessageId);
			unregister(IPCChannel.REPLY_MODAL, replyModalId);
		};
	}, [toggleMessage, setModalChoice]);
}

import { FunctionComponent, ReactChild } from 'react';

interface Props {
	children: ReactChild;
}

const ElectronIPCContext: FunctionComponent<Props> = ({ children }) => {
	const isElectronIPC = !!window.ipc;

	return isElectronIPC ? (
		<div>{children}</div>
	) : (
		<p>
			Sorry, you cannot use this app in a generic browser.
			<br />
			Please open this app in an electron context which exposes the{' '}
			<code>ipcRenderer</code> in the <code>window</code> context.
		</p>
	);
};

export default ElectronIPCContext;

import { useCallback, useState } from 'react';

import useIPCEvents from '../hooks/useIPCEvents';

import './App.css';
import logo from '../assets/logo.svg';
import IPCChannel from '../model/IPC/IPCChannel';

const { send } = window.ipc;

function App() {
	const [showMessage, setShowMessage] = useState(false);
	const [modalChoice, setModalChoice] = useState<boolean | null>(null);

	const toggleMessage = useCallback(
		() => setShowMessage(prevState => !prevState),
		[]
	);

	useIPCEvents(toggleMessage, setModalChoice);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/Index.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<div>
					<button
						className="App-button"
						onClick={() => send(IPCChannel.SHOW_NOTIFICATION)}
					>
						Show notification
					</button>
					<button
						className="App-button"
						onClick={() => send(IPCChannel.TRIGGER_MODAL)}
					>
						Trigger modal
					</button>
				</div>
				{showMessage && <p>You clicked the "Show Message" menu button!</p>}
				{modalChoice !== null && (
					<p>{modalChoice ? 'You clicked "Ok"' : 'You clicked "Cancel"'}</p>
				)}
			</header>
		</div>
	);
}

export default App;

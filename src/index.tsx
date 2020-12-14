import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import ElectronIPCContext from './components/ElectronIPCContext';

ReactDOM.render(
	<StrictMode>
		<ElectronIPCContext>
			<App />
		</ElectronIPCContext>
	</StrictMode>,
	document.getElementById('root')
);

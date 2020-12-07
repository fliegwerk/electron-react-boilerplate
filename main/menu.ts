import { Menu, MenuItemConstructorOptions, BrowserWindow } from 'electron';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
	selector?: string;
	submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
	mainWindow: BrowserWindow;

	constructor(mainWindow: BrowserWindow) {
		this.mainWindow = mainWindow;
	}

	public buildMenu() {
		if (
			process.env.NODE_ENV === 'development' ||
				process.env.DEBUG_PROD === 'true'
		) {
		}
	}

	private setupDevelopmentEnvironment() {
		this.mainWindow.webContents.on('context-menu', (_, props) => {

		});
	}

}

import {
	app,
	Menu,
	MenuItemConstructorOptions,
	BrowserWindow,
	shell
} from 'electron';
import isDev from 'electron-is-dev';
import IPCManager from './ipc';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
	selector?: string;
	submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
	mainWindow: BrowserWindow;

	ipcManager: IPCManager;

	constructor(mainWindow: BrowserWindow, ipcManager: IPCManager) {
		this.mainWindow = mainWindow;
		this.ipcManager = ipcManager;
	}

	public buildMenu() {
		if (isDev) {
			// Add mouse context menu in development mode
			this.setupDevelopmentEnvironment();
		}

		// build os specific menu template
		const template =
			process.platform === 'darwin'
				? this.buildDarwinTemplate()
				: this.buildDefaultTemplate();

		// generate template
		const menu = Menu.buildFromTemplate(template);

		Menu.setApplicationMenu(menu);
		return menu;
	}

	private setupDevelopmentEnvironment() {
		this.mainWindow.webContents.on('context-menu', (_, props) => {
			const { x, y } = props;

			Menu.buildFromTemplate([
				{
					label: 'Inspect element',
					click: () => {
						this.mainWindow.webContents.inspectElement(x, y);
					}
				}
			]).popup({ window: this.mainWindow });
		});
	}

	private buildDarwinTemplate(): MenuItemConstructorOptions[] {
		// define the different menu, submenus and their actions
		const subMenuAbout: DarwinMenuItemConstructorOptions = {
			label: 'Electron React Boilerplate',
			submenu: [
				{
					label: 'About Electron React Boilerplate',
					selector: 'orderFrontStandardAboutPanel:'
				},
				{ type: 'separator' },
				{
					label: 'Hide Electron React Boilerplate',
					accelerator: 'Command+H',
					selector: 'hide:'
				},
				{
					label: 'Hide Others',
					accelerator: 'Command+Shift+H',
					selector: 'hideOtherApplications:'
				},
				{ label: 'Show All', selector: 'unhideAllApplications:' },
				{ type: 'separator' },
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: () => {
						app.quit();
					}
				}
			]
		};

		const subMenuEdit: DarwinMenuItemConstructorOptions = {
			label: 'Edit',
			submenu: []
		};

		const subMenuViewDev: MenuItemConstructorOptions = {
			label: 'View',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'Command+R',
					click: () => {
						this.mainWindow.webContents.reload();
					}
				},
				{
					label: 'Toggle Full Screen',
					accelerator: 'Ctrl+Command+F',
					click: () => {
						this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
					}
				},
				{
					label: 'Toggle Developer Tools',
					accelerator: 'Alt+Command+I',
					click: () => {
						this.mainWindow.webContents.toggleDevTools();
					}
				}
			]
		};

		const subMenuViewProd: MenuItemConstructorOptions = {
			label: 'View',
			submenu: [
				{
					label: 'Toggle Full Screen',
					accelerator: 'Ctrl+Command+F',
					click: () => {
						this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
					}
				}
			]
		};

		const subMenuWindow: DarwinMenuItemConstructorOptions = {
			label: 'Window',
			submenu: [
				{
					label: 'Minimize',
					accelerator: 'Command+M',
					selector: 'performMiniaturize:'
				},
				{ label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
				{ type: 'separator' },
				{ label: 'Bring All to Front', selector: 'arrangeInFront:' }
			]
		};

		// decide which view menu will be used on current app mode
		const subMenuView = isDev ? subMenuViewDev : subMenuViewProd;
		// concat all defined menu templates
		return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow];
	}

	private buildDefaultTemplate(): MenuItemConstructorOptions[] {
		return [
			{
				label: '&Window',
				submenu: [
					{
						label: '&Close',
						accelerator: 'Ctrl+W',
						click: () => {
							this.mainWindow.close();
						}
					},
					{
						label: '&Quit',
						accelerator: 'Ctrl+Q',
						click: () => {
							app.quit();
						}
					}
				]
			},
			{
				label: '&View',
				submenu: [
					{
						label: 'Toggle &Full Screen',
						accelerator: 'F11',
						click: () => {
							this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
						}
					},
					...(isDev
						? [
								{
									label: 'Toggle &Developer Tools',
									accelerator: 'Alt+Ctrl+I',
									click: () => {
										this.mainWindow.webContents.toggleDevTools();
									}
								},
								{
									label: '&Reload',
									accelerator: 'Ctrl+R',
									click: () => {
										this.mainWindow.reload();
									}
								}
						  ]
						: [])
				]
			},
			{
				label: '&Help',
				submenu: [
					{
						label: 'Learn More',
						click: () => {
							shell.openExternal('https://www.electronjs.org/');
						}
					}
				]
			}
		];
	}
}

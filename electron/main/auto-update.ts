import { autoUpdater, dialog } from 'electron';

/**
 * Enables automatic updates by searching on the feed url in a defined interval .
 * @param feedURL the feed url to search for new updates
 * @param interval the search interval in milliseconds
 */
// more information about deploying updates described here
// https://www.electronjs.org/docs/tutorial/updates
export default function enableAutoUpdates(feedURL: string, interval: number) {
	autoUpdater.setFeedURL({ url: feedURL });

	// check for in an interval of 10 minutes
	setInterval(() => {
		autoUpdater.checkForUpdates();
	}, interval);

	autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
		const dialogOpts = {
			type: 'info',
			buttons: ['Restart', 'Later'],
			title: 'Application Update',
			message: process.platform === 'win32' ? releaseNotes : releaseName,
			detail:
				'A new version has been downloaded. Restart the application to apply the updates.'
		};

		dialog.showMessageBox(dialogOpts).then(returnValue => {
			if (returnValue.response === 0) autoUpdater.quitAndInstall();
		});
	});

	autoUpdater.on('error', message => {
		console.error('There was a problem updating the application');
		console.error(message);
	});
}

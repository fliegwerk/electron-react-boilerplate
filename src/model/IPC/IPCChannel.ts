/**
 * Defines the IPC channels used in the project.
 */
// triggered by the electron menu
export const DISPLAY_MESSAGE = 'ipcMain:display-message';
export const HIDE_MESSAGE = 'ipcMain:hide-message';

// triggered by the render process
export const SHOW_NOTIFICATION = 'ipcRenderer:show-notification';
export const TRIGGER_MODAL = 'ipcRenderer:trigger:modal';
export const REPLY_MODAL = 'ipcMain:reply:modal';

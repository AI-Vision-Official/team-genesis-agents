
import { app, BrowserWindow } from 'electron';
import { isDev, createWindow } from './utils.js';

let mainWindow;

const createMainWindow = () => {
  mainWindow = createWindow();
};

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (navigationEvent, navigationUrl) => {
    navigationEvent.preventDefault();
  });
});

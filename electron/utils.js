
import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

export const isDev = process.env.NODE_ENV === 'development';

export function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: join(__dirname, 'preload.js'),
      webSecurity: true
    },
    icon: join(__dirname, '../dist/icon.png'),
    show: true, // Show immediately instead of waiting
    center: true, // Center the window on screen
    autoHideMenuBar: false // Keep menu bar visible
  });

  // Load the app
  if (isDev) {
    console.log('Development mode: loading from localhost');
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, try multiple possible paths
    const possiblePaths = [
      // Standard electron-builder paths
      join(process.resourcesPath || '', 'app.asar', 'dist', 'index.html'),
      join(process.resourcesPath || '', 'app', 'dist', 'index.html'),
      // Fallback paths
      join(app.getAppPath(), 'dist', 'index.html'),
      join(__dirname, '../dist/index.html')
    ];

    let htmlPath = null;
    const fs = require('fs');
    
    for (const path of possiblePaths) {
      console.log('Checking path:', path);
      if (fs.existsSync(path)) {
        htmlPath = path;
        console.log('Found HTML at:', htmlPath);
        break;
      }
    }

    if (htmlPath) {
      mainWindow.loadFile(htmlPath);
    } else {
      console.error('Could not find index.html in any expected location');
      // Show error page instead of failing silently
      mainWindow.loadURL('data:text/html,<html><body><h1>Error: Could not load application</h1><p>HTML file not found</p></body></html>');
    }
  }

  // Force window to front
  mainWindow.once('ready-to-show', () => {
    console.log('Window ready to show - forcing to front');
    mainWindow.show();
    mainWindow.focus();
    mainWindow.setAlwaysOnTop(true);
    setTimeout(() => {
      mainWindow.setAlwaysOnTop(false);
    }, 1000);
  });

  // Add error handling
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', errorDescription, 'URL:', validatedURL);
    console.error('Error code:', errorCode);
    // Show window even if load fails so user can see the error
    mainWindow.show();
    mainWindow.focus();
  });

  // Prevent navigation to external URLs
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== 'http://localhost:8080' && !navigationUrl.startsWith('file://')) {
      event.preventDefault();
    }
  });

  return mainWindow;
}

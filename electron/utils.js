
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
    show: false
  });

  // Load the app
  if (isDev) {
    console.log('Development mode: loading from localhost');
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, the files are in the resources/app.asar or resources/app folder
    const resourcesPath = process.resourcesPath;
    const appPath = join(resourcesPath, 'app');
    const htmlPath = join(appPath, 'dist', 'index.html');
    
    console.log('Production mode paths:');
    console.log('resourcesPath:', resourcesPath);
    console.log('appPath:', appPath);
    console.log('htmlPath:', htmlPath);
    
    mainWindow.loadFile(htmlPath);
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    console.log('Window ready to show');
    mainWindow.show();
  });

  // Add error handling
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', errorDescription, 'URL:', validatedURL);
    console.error('Error code:', errorCode);
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

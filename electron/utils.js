
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
      webSecurity: false, // Temporarily disable for debugging
      devTools: true // Always allow dev tools
    },
    icon: join(__dirname, '../dist/icon.png'),
    show: true,
    center: true,
    autoHideMenuBar: false
  });

  // Always enable dev tools for debugging
  mainWindow.webContents.openDevTools();

  // Load the app
  if (isDev) {
    console.log('Development mode: loading from localhost');
    mainWindow.loadURL('http://localhost:8080');
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
    
    console.log('=== ELECTRON DEBUG INFO ===');
    console.log('process.resourcesPath:', process.resourcesPath);
    console.log('app.getAppPath():', app.getAppPath());
    console.log('__dirname:', __dirname);
    
    for (const path of possiblePaths) {
      console.log('Checking path:', path);
      if (fs.existsSync(path)) {
        htmlPath = path;
        console.log('✓ Found HTML at:', htmlPath);
        break;
      } else {
        console.log('✗ Not found:', path);
      }
    }

    if (htmlPath) {
      console.log('Loading file:', htmlPath);
      mainWindow.loadFile(htmlPath);
      
      // Check if CSS/JS files exist
      const distPath = join(htmlPath, '..');
      console.log('Checking dist folder contents:', distPath);
      try {
        const files = fs.readdirSync(distPath);
        console.log('Files in dist:', files);
      } catch (err) {
        console.error('Error reading dist folder:', err);
      }
    } else {
      console.error('❌ Could not find index.html in any expected location');
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

  // Enhanced error handling
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('❌ Failed to load:', errorDescription, 'URL:', validatedURL);
    console.error('Error code:', errorCode);
    mainWindow.show();
    mainWindow.focus();
  });

  // Log console messages from the renderer process
  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[RENDERER ${level}] ${message} (${sourceId}:${line})`);
  });

  // Log when DOM is ready
  mainWindow.webContents.on('dom-ready', () => {
    console.log('✓ DOM is ready');
  });

  // Log when page finishes loading
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('✓ Page finished loading');
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


import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

export const isDev = process.env.NODE_ENV === 'development';

export function createWindow() {
  console.log('🚀 Creating Electron window...');
  
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: join(__dirname, 'preload.js'),
      webSecurity: false,
      devTools: true,
      allowRunningInsecureContent: true
    },
    icon: join(__dirname, '../dist/icon.png'),
    show: false,
    center: true,
    autoHideMenuBar: false,
    backgroundColor: '#ffffff',
    titleBarStyle: 'default'
  });

  console.log('📱 Window created, setting up load logic...');

  const isPackaged = app.isPackaged;
  console.log('=== SIMPLE DEBUG INFO ===');
  console.log('isDev:', isDev);
  console.log('isPackaged:', isPackaged);
  console.log('process.resourcesPath:', process.resourcesPath);
  console.log('app.getAppPath():', app.getAppPath());
  console.log('__dirname:', __dirname);

  let htmlPath = null;

  if (isDev) {
    // Development: use local dev server or local files
    console.log('🔧 Development mode - checking for local files');
    const devHtmlPath = join(__dirname, '../dist/index.html');
    if (existsSync(devHtmlPath)) {
      htmlPath = devHtmlPath;
      console.log('✅ Found dev HTML at:', htmlPath);
    }
  } else {
    // Production: check extraResources first, then other locations
    console.log('📦 Production mode - checking extraResources');
    
    const possiblePaths = [
      // extraResources should put files here
      join(process.resourcesPath, 'dist', 'index.html'),
      // Fallback locations
      join(app.getAppPath(), 'dist', 'index.html'),
      join(__dirname, '../dist/index.html')
    ];

    for (const path of possiblePaths) {
      console.log('🔍 Checking:', path);
      if (existsSync(path)) {
        htmlPath = path;
        console.log('✅ Found HTML at:', htmlPath);
        break;
      } else {
        console.log('❌ Not found:', path);
      }
    }
  }

  if (htmlPath) {
    console.log('📄 Loading HTML file:', htmlPath);
    mainWindow.loadFile(htmlPath);
  } else {
    console.error('💥 Could not find index.html');
    
    const errorHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Team Genesis Agents - Error</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
          h1 { color: #e74c3c; }
          .debug { background: #f8f9fa; padding: 20px; border-radius: 4px; font-family: monospace; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>⚠️ Team Genesis Agents - Loading Error</h1>
          <p>De HTML bestanden konden niet gevonden worden.</p>
          
          <div class="debug">
            <h3>Debug informatie:</h3>
            <p><strong>Is Development:</strong> ${isDev}</p>
            <p><strong>Is Packaged:</strong> ${isPackaged}</p>
            <p><strong>Resources Path:</strong> ${process.resourcesPath || 'undefined'}</p>
            <p><strong>App Path:</strong> ${app.getAppPath()}</p>
            <p><strong>__dirname:</strong> ${__dirname}</p>
          </div>
          
          <p><strong>Oplossing:</strong></p>
          <p>1. Zorg dat je <code>npm run build</code> hebt uitgevoerd</p>
          <p>2. Controleer of de dist/ folder bestaat en index.html bevat</p>
          <p>3. Build opnieuw met <code>npm run electron-pack-win</code></p>
        </div>
      </body>
      </html>
    `;
    
    mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(errorHTML)}`);
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    console.log('✅ Window ready - showing now');
    mainWindow.show();
    mainWindow.focus();
  });

  // Enhanced error handling
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('💥 Failed to load:', errorDescription);
    mainWindow.show();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('✅ Page loaded successfully');
    mainWindow.show();
  });

  console.log('✅ Window setup complete');
  return mainWindow;
}

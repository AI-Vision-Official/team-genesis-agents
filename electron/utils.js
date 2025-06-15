import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { fileURLToPath } from 'url';

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
      webSecurity: false, // Temporarily disable for debugging
      devTools: true, // Always allow dev tools
      allowRunningInsecureContent: true // Allow mixed content for debugging
    },
    icon: join(__dirname, '../dist/icon.png'),
    show: false, // Start hidden, then show after setup
    center: true,
    autoHideMenuBar: false,
    backgroundColor: '#ffffff', // White background to see if window loads
    titleBarStyle: 'default'
  });

  console.log('📱 Window created, setting up event listeners...');

  // Force window to show after 2 seconds regardless of load status
  setTimeout(() => {
    console.log('⏰ Timeout reached - forcing window to show');
    mainWindow.show();
    mainWindow.focus();
    mainWindow.webContents.openDevTools();
  }, 2000);

  // Load the app
  if (isDev) {
    console.log('🔧 Development mode: loading from localhost:4000');
    mainWindow.loadURL('http://localhost:4000');
  } else {
    console.log('📦 Production mode: looking for built files...');
    
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
    console.log('process.cwd():', process.cwd());
    
    for (const path of possiblePaths) {
      console.log('🔍 Checking path:', path);
      if (fs.existsSync(path)) {
        htmlPath = path;
        console.log('✅ Found HTML at:', htmlPath);
        break;
      } else {
        console.log('❌ Not found:', path);
      }
    }

    if (htmlPath) {
      console.log('📄 Loading HTML file:', htmlPath);
      
      // Check if CSS/JS files exist
      const distPath = join(htmlPath, '..');
      console.log('📁 Checking dist folder contents:', distPath);
      try {
        const files = fs.readdirSync(distPath);
        console.log('📋 Files in dist:', files);
        
        // Check for specific files
        const hasJS = files.some(f => f.endsWith('.js'));
        const hasCSS = files.some(f => f.endsWith('.css'));
        console.log('🔧 Has JS files:', hasJS);
        console.log('🎨 Has CSS files:', hasCSS);
      } catch (err) {
        console.error('❌ Error reading dist folder:', err);
      }
      
      mainWindow.loadFile(htmlPath);
    } else {
      console.error('💥 Could not find index.html in any expected location');
      console.log('🔧 Loading fallback error page...');
      
      // Create a more detailed error page
      const errorHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Team Genesis Agents - Error</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #e74c3c; }
            .debug { background: #f8f9fa; padding: 20px; border-radius: 4px; font-family: monospace; margin: 20px 0; }
            .paths { list-style: none; padding: 0; }
            .paths li { padding: 5px 0; }
            .not-found { color: #e74c3c; }
            .found { color: #27ae60; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>⚠️ Team Genesis Agents - Loading Error</h1>
            <p>De applicatie kon niet worden geladen omdat de HTML bestanden niet gevonden zijn.</p>
            
            <div class="debug">
              <h3>Debug informatie:</h3>
              <p><strong>App Path:</strong> ${app.getAppPath()}</p>
              <p><strong>Resources Path:</strong> ${process.resourcesPath || 'undefined'}</p>
              <p><strong>Current Directory:</strong> ${process.cwd()}</p>
              
              <h4>Gezochte locaties:</h4>
              <ul class="paths">
                ${possiblePaths.map(path => {
                  const exists = require('fs').existsSync(path);
                  return `<li class="${exists ? 'found' : 'not-found'}">${exists ? '✅' : '❌'} ${path}</li>`;
                }).join('')}
              </ul>
            </div>
            
            <p><strong>Mogelijke oplossingen:</strong></p>
            <ul>
              <li>Herinstalleer de applicatie</li>
              <li>Controleer of alle bestanden correct zijn geïnstalleerd</li>
              <li>Start de applicatie als administrator</li>
            </ul>
          </div>
        </body>
        </html>
      `;
      
      mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(errorHTML)}`);
    }
  }

  // Force window to show when ready
  mainWindow.once('ready-to-show', () => {
    console.log('✅ Window ready to show - displaying now');
    mainWindow.show();
    mainWindow.focus();
    mainWindow.setAlwaysOnTop(true);
    setTimeout(() => {
      mainWindow.setAlwaysOnTop(false);
    }, 1000);
  });

  // Enhanced error handling with more visibility
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('💥 Failed to load:', errorDescription, 'URL:', validatedURL);
    console.error('Error code:', errorCode);
    mainWindow.show();
    mainWindow.focus();
    mainWindow.webContents.openDevTools();
  });

  // Log console messages from the renderer process
  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[RENDERER ${level}] ${message} (${sourceId}:${line})`);
  });

  // Log when DOM is ready
  mainWindow.webContents.on('dom-ready', () => {
    console.log('✅ DOM is ready');
    // Force show if not already visible
    if (!mainWindow.isVisible()) {
      console.log('🔧 DOM ready but window not visible - forcing show');
      mainWindow.show();
    }
  });

  // Log when page finishes loading
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('✅ Page finished loading');
    mainWindow.show();
    mainWindow.focus();
  });

  // Handle crashes
  mainWindow.webContents.on('crashed', () => {
    console.error('💥 Renderer process crashed');
    mainWindow.show();
    mainWindow.focus();
  });

  // Handle unresponsive
  mainWindow.on('unresponsive', () => {
    console.error('⚠️ Window became unresponsive');
    mainWindow.show();
    mainWindow.focus();
  });

  // Prevent navigation to external URLs
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== 'http://localhost:4000' && !navigationUrl.startsWith('file://') && !navigationUrl.startsWith('data:')) {
      event.preventDefault();
      console.log('🚫 Prevented navigation to:', navigationUrl);
    }
  });

  // Force DevTools to open
  mainWindow.webContents.once('did-finish-load', () => {
    console.log('🔧 Opening DevTools...');
    mainWindow.webContents.openDevTools();
  });

  console.log('✅ Window setup complete');
  return mainWindow;
}

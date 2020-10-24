const {app, BrowserWindow, Menu, remote, ipcMain, ipcRenderer} = require('electron');
const path = require('path');
Menu.setApplicationMenu(false)

const windowStateKeeper = require('electron-window-state');
const isDev = require('electron-is-dev');

let win;

function createWindow() {

  // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
    defaultWidth: 460,
    defaultHeight: 680,
  });

  // Create the window using the state information
  const win = new BrowserWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minHeight: 420,
    minWidth: 459,
    frame: false,
    webPreferences: {
      nodeIntegration: true
      // preload: path.join(__dirname, 'preload.js')
    }
  });

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools()
  }

  // win.isResizable(true)

  // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state
  mainWindowState.manage(win);

  ipcMain.on('window:minimize', function(){    
    win.minimize();
  });
  ipcMain.on('window:close', function(){    
    win.close();
  });

  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  win.on('closed', () => mainWindow = null);

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
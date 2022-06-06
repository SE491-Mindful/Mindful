const {app, BrowserWindow, screen } = require('electron')
const url = require("url");
const path = require("path");
const isDev = require('electron-is-dev');

function createWindow () {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    x: size.width / 4,
    y: size.height / 4,
    width: size.width / 2,
    height: size.height / 2,
    webPreferences: {
      nodeIntegration: true
    }
  })

  let baseUri;
  if (isDev) {
    console.log('Running in development');
    baseUri = "http://localhost:4200";
  } else {
    console.log('Running in production');
    baseUri = "https://se491-softwareengineeringstudio.github.io/Mindful";
  }

  mainWindow.loadURL(baseUri);
  // Open the DevTools. // DEBUG ONLY!
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
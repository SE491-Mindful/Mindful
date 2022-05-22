const {app, BrowserWindow, screen } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

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

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
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
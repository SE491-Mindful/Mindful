import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { create } from 'domain';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


const { app, BrowserWindow } = require('electron')
const createWindow = () => {
    const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
})

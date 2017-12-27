'use strict'

import { app, BrowserWindow, Menu, dialog } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    // useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Set the menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
}

// this will become startRserve > connectR > createWindow
app.on('ready', startRdaemon)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// The application Menu
const menuSep = {
  type: 'separator'
}

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Save...'
      },
      {
        label: 'Load...'
      }
    ]
  },
  {
    label: 'Data',
    submenu: [
      {
        label: 'Import...'
      },
      {
        label: 'Export...'
      },
      menuSep,
      {
        label: 'Filter',
        submenu: [
          {
            label: 'Levels of a categorical variable...'
          },
          {
            label: 'Numeric condition...'
          },
          {
            label: 'Row number...'
          },
          {
            label: 'Randomly (sample)...'
          }
        ]
      },
      {
        label: 'Sort...'
      },
      {
        label: 'Reshape...'
      },
      {
        label: 'Stack variables...'
      },
      menuSep,
      {
        label: 'Restore dataset'
      }
    ]
  }
]

const quitOpt = {
  label: 'Quit iNZight Desktop',
  accelerator: 'CmdOrCtrl+Q',
  click () {
    app.quit()
  }
}
const prefsOpt = {
  label: 'Preferences...',
  accelerator: 'CmdOrCtrl+,',
  click () {
    dialog.showMessageBox({
      title: 'Preferences',
      message: 'You\'re trying to adjust the preferences!'
    })
  }
}

// If macOS - add empty thing ...
if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({
    submenu: [
      {
        label: 'About'
      },
      menuSep,
      prefsOpt,
      menuSep,
      quitOpt
    ]
  })
} else {
  mainMenuTemplate[0].submenu.push(menuSep)
  mainMenuTemplate[0].submenu.push(prefsOpt)
  mainMenuTemplate[0].submenu.push(menuSep)
  mainMenuTemplate[0].submenu.push(quitOpt)
}

/**
  * Spin up an Rserve daemon, and connect to it!
  */
const { execSync } = require('child_process')
const Rserve = require('rserve-js')
let Rdaemon
// global.Rcon = 0
global.Rtries = 0

// let timeoutProtect

function startRdaemon () {
  /* Sometimes the Rserve client doesn't completely load,
   * so we need to keep trying until it does.
   */
  while (Rdaemon === undefined && global.Rtries < 5) {
    global.Rtries += 1
    try {
      Rdaemon = execSync('/usr/local/bin/R -e \'Rserve::Rserve(args = "--no-save")\'', {
        timeout: 3000
      })
    } catch (e) {
      console.log('Error: ' + e + '\n\n Trying again [' + global.Rtries + '] ...')
    }
    console.log('attempted')
  }
  if (Rdaemon === undefined) {
    dialog.showMessageBox({
      title: 'Unable to launch iNZight',
      message: 'We\'re having trouble launching iNZight - please try again.\n\n' +
        'Failed after ' + global.Rtries + ' attempts.\n\n' +
        'If you continue to see this message, try reinstalling, or contact support.'
    })
    app.quit()
    return
  }

  console.log('Rserve client launched.')

  /* For some reason, on Linux at least, this doesn't work unless
   * it has a short timeout ...
   */
  setTimeout(() => {
    global.Rcon = Rserve.connect('localhost', 6311, function () {
      global.Rcon.eval('as.character(getRversion())', function (err, res) {
        if (err) {
          throw err
        }
        global.Rversion = res[0]
        console.log('Connected to R successfully: R ' + res[0])
        createWindow()
      })
    })
  }, 1000)
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

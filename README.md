<img src="https://github.com/arktosdesign/vars-jka-server-checker/blob/master/public/logo192.png?raw=true" width="128px" height="128px" alt="var's JKA Server Checker">

## var's JKA Server Checker
### A JKA server checker built in React JS and Electron 👽

## 📥 Download
[Download 0.1.5 release for Windows](https://github.com/arktosdesign/vars-jka-server-checker/blob/master/release/Vars%20JKA%20Server%20Checker%20Setup%200.1.5.exe)

## 📜 Project

See [package.json](https://github.com/arktosdesign/vars-jka-server-checker/blob/master/package.json) for details.

The application queries [JKA](https://store.steampowered.com/app/6020/STAR_WARS_Jedi_Knight__Jedi_Academy/) servers by fetching data from [my custom API on Heroku](https://tranquil-sands-27723.herokuapp.com/?ip=142.44.198.205&port=29070) built with [Express JS](https://expressjs.com/). The API queries the inputted server IP and port using the [gamedig](https://github.com/gamedig/node-gamedig) library, and returns the JKA server data via an object which is then rendered by React. User's favourite servers are saved as an array in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

### Available scripts

In the project directory, run `npm i` as usual to install dependencies.

#### `npm run dev`
To start dev environment and compile code (including SCSS).

**Note:** This project is made for **Electron** and **won't** run as a React app in the browser out of the box due to the Electron's IPC renderer/remote processes.

#### `npm run build`
To build the Electron application. See [electron-builder](https://github.com/electron-userland/electron-builder) for more details.

## ⚛️ React
See [/src/components/](https://github.com/arktosdesign/vars-jka-server-checker/tree/master/src/components) for component structure.

Components are then rendered in [App.js](https://github.com/arktosdesign/vars-jka-server-checker/blob/master/src/App.js)

## 🔌 Electron
Wraps the React app in an Electron application. See [/public/electron.js](https://github.com/arktosdesign/vars-jka-server-checker/blob/master/public/electron.js) for Electron configuration.

## 🖌️ Styling
See [/src/scss/](https://github.com/arktosdesign/vars-jka-server-checker/tree/master/src/scss) for styling structure.

#### Enjoy! 🐻
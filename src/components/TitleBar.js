import React, { Component } from 'react';
const { ipcRenderer } = window.require('electron');
class TitleBar extends Component {  
  minimizeWindow() {
    ipcRenderer.send('window:minimize');
  }
  closeWindow() {
    ipcRenderer.send('window:close');
  }
  componentWillUnmount() {
    ipcRenderer.removeListener('window:minimize')
  }

  componentDidMount() {
    function activeWindow() {
      var titleBar = document.getElementById('title-bar');
      titleBar.classList.remove('inactive');        
    }
    function blurredWindow() {
      var titleBar = document.getElementById('title-bar');
      titleBar.classList.add('inactive');        
    }
    window.addEventListener('blur', blurredWindow);
    window.addEventListener('focus', activeWindow);

    ipcRenderer.on('window:minimize', this.minimizeWindow);
  }

  render() {
    return (
      <div className="title-bar" id="title-bar">
        <div className="title-bar-text">{this.props.title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" id="minimize" onClick={this.minimizeWindow.bind(this)}></button>
          <button aria-label="Close" id="close" onClick={this.closeWindow.bind(this)}></button>
        </div>
      </div>
    )
  }
}

export default TitleBar;
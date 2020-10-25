import React, { Component } from 'react';
import icon from '../icon32.png';
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
        <div className="title-bar-text">
          <img src={icon} alt={this.props.title} className="title-bar__icon"/>
          {this.props.title}
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" id="minimize" onClick={this.minimizeWindow.bind(this)}>          
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 78 14">
              <path d="M7,14h64c3.9,0,7-3.1,7-7v0c0-3.9-3.1-7-7-7H7C3.1,0,0,3.1,0,7v0C0,10.9,3.1,14,7,14z"/>
            </svg>
          </button>
          <button aria-label="Close" id="close" onClick={this.closeWindow.bind(this)}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 58.1 58.1">
              <g transform="translate(0,-952.36218)">
                <path d="M56.6,953.8c-2-2-5.1-2-7.1,0L29,974.3L8.5,953.8c-2-2-5.1-2-7.1,0c-2,2-2,5.1,0,7.1L22,981.4l-20.5,20.5c-2,2-2,5.1,0,7.1
                  c2,2,5.1,2,7.1,0L29,988.5l20.5,20.5c2,2,5.1,2,7.1,0c2-2,2-5.1,0-7.1l-20.5-20.5l20.5-20.5C58.6,958.9,58.6,955.8,56.6,953.8z"/>
              </g>
            </svg>          
          </button>
        </div>
      </div>
    )
  }
}

export default TitleBar;
// https://www.twilio.com/blog/react-app-with-node-js-server-proxy
// Host on netlify

import React, { Component } from 'react';
import TitleBar from './components/TitleBar';
import WindowBody from './components/WindowBody';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
        dark: false,
        settingsOpen: false,
      };

      this.changeTheme = this.changeTheme.bind(this);
      this.toggleSettings = this.toggleSettings.bind(this);
  }

  changeTheme() {
    this.setState({ dark: !this.state.dark });
    if (this.state.dark === true) {
      let themeStatus = 'theme--default';
      localStorage.setItem('vars-theme', JSON.stringify(themeStatus));      
    }
    else if (this.state.dark === false) {
      let themeStatus = 'theme--dark';
      localStorage.setItem('vars-theme', JSON.stringify(themeStatus));      
    }
  }

  componentDidMount() {
    const themePref = JSON.parse(localStorage.getItem('vars-theme'));    
    if (themePref === 'theme--default') {
      this.setState({
        dark: false
      })
    }
    else if (themePref === 'theme--dark') {
      this.setState({
        dark: true
      })
    }
  }
  
  toggleSettings() {
    const currentSettingsState = this.state.settingsOpen;
    this.setState({ settingsOpen: !currentSettingsState });
  };

  render() {
    return (
      <div className={'theme ' + (this.state.dark ? 'theme--dark' : 'theme--default')}>
        <div className="window">
          <TitleBar title="var's JKA Server Checker" />
          <WindowBody />
          <div className={'settings-wrapper ' + (this.state.settingsOpen ? 'is--open' : '')}>
            <button className="settings-toggle" onClick={this.toggleSettings.bind(this)}>
              {this.state.settingsOpen === false &&
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 26.6 28" className="settings-toggle-icon__cog">
                  <path d="M26.6,9.9c0,0.7-0.3,1.4-0.8,2l-1.5,1.8c0,0.3,0,0.5,0,0.8l1.6,1.8c0.9,1,1,2.4,0.4,3.5l-1.6,2.7c-0.6,1.1-1.9,1.7-3.2,1.4
                    l-2-0.4c-0.2,0-0.5,0-0.7,0.1l0,0c-0.2,0.1-0.4,0.3-0.5,0.5L17.7,26c-0.4,1.2-1.6,2-2.8,2.1h-3.1c-1.3,0-2.4-0.8-2.8-2.1L8.3,24
                    c-0.1-0.2-0.2-0.4-0.4-0.5l0,0c-0.2-0.1-0.4-0.2-0.7-0.1l-2,0.4C4,24,2.7,23.5,2,22.4l-1.6-2.7c-0.6-1.1-0.5-2.5,0.3-3.5l1.5-1.8
                    c0-0.3,0-0.5,0-0.8l-1.6-1.8c-0.9-1-1-2.4-0.3-3.5L2,5.7C2.6,4.5,3.9,4,5.2,4.2l2,0.4c0.2,0,0.5,0,0.7-0.1l0,0C8,4.4,8.2,4.2,8.3,4
                    L9,2.1C9.3,0.9,10.5,0,11.8,0h3.1c1.3,0,2.4,0.8,2.9,2l0.6,2c0.1,0.2,0.2,0.4,0.4,0.5l0,0c0.2,0.1,0.4,0.2,0.7,0.1l2-0.4
                    C22.7,4,24,4.5,24.6,5.7l1.6,2.7C26.4,8.8,26.6,9.3,26.6,9.9z M22.3,13.3c0-0.3,0.1-0.5,0.3-0.7l1.8-2.1c0.3-0.3,0.3-0.8,0.1-1.2
                    L23,6.7c-0.2-0.4-0.6-0.6-1.1-0.5l-2,0.4c-0.7,0.1-1.4,0-2-0.3l0,0c-0.6-0.4-1.1-0.9-1.4-1.6l-0.6-1.9c-0.1-0.4-0.5-0.7-1-0.7h-3.2
                    c-0.4,0-0.8,0.3-0.9,0.7l-0.6,1.9C9.9,5.3,9.4,5.9,8.8,6.2l0,0c-0.6,0.3-1.3,0.5-2,0.3l-2-0.4C4.4,6.1,3.9,6.3,3.7,6.7L2.2,9.4
                    C2,9.7,2,10.2,2.3,10.5l1.8,2.1c0.2,0.2,0.3,0.5,0.3,0.7c0,0.4,0,0.9,0,1.3c0,0.3-0.1,0.6-0.3,0.8l-1.8,2.1
                    c-0.3,0.3-0.3,0.8-0.1,1.2l1.6,2.7c0.2,0.4,0.6,0.6,1.1,0.5l2-0.4c0.7-0.1,1.4,0,2,0.3l0,0c0.7,0.4,1.2,0.9,1.4,1.6l0.6,1.9
                    c0.1,0.4,0.5,0.7,0.9,0.7h3.1c0.4,0,0.8-0.3,1-0.7l0.6-1.9c0.2-0.7,0.7-1.3,1.3-1.6l0,0c0.6-0.3,1.3-0.5,2-0.3l2,0.4
                    c0.4,0.1,0.9-0.1,1.1-0.5l1.6-2.7c0.2-0.4,0.2-0.8-0.1-1.2l-1.8-2.1c-0.2-0.2-0.3-0.5-0.3-0.7c0-0.4,0-0.9,0-1.3L22.3,13.3z
                    M18.3,5.4L18.3,5.4z"/>
                  <path d="M18.3,14c0,2.8-2.2,5-5,5s-5-2.2-5-5s2.2-5,5-5S18.3,11.2,18.3,14z M10.3,14c0,1.7,1.3,3,3,3s3-1.3,3-3s-1.3-3-3-3
                    S10.3,12.3,10.3,14z"/>
                </svg>
              }
              {this.state.settingsOpen === true &&
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 58.1 58.1" className="settings-toggle-icon__close">
                  <g transform="translate(0,-952.36218)">
                    <path d="M56.6,953.8c-2-2-5.1-2-7.1,0L29,974.3L8.5,953.8c-2-2-5.1-2-7.1,0c-2,2-2,5.1,0,7.1L22,981.4l-20.5,20.5c-2,2-2,5.1,0,7.1
                      c2,2,5.1,2,7.1,0L29,988.5l20.5,20.5c2,2,5.1,2,7.1,0c2-2,2-5.1,0-7.1l-20.5-20.5l20.5-20.5C58.6,958.9,58.6,955.8,56.6,953.8z"/>
                  </g>
                </svg>
              }
            </button>
            <div className="settings__box">
                <div className="setting">
                  <button className={'change-theme ' + (this.state.dark ? 'checked' : '')} onClick={this.changeTheme.bind(this)}>                    
                    Dark mode
                  </button>
                </div>
              </div>            
          </div>

        </div>
      </div>      
    );
  }

}

export default App;

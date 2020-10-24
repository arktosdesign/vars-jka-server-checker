// https://www.twilio.com/blog/react-app-with-node-js-server-proxy
// Host on netlify

import React, { Component } from 'react';
import TitleBar from './components/TitleBar';
import WindowBody from './components/WindowBody';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
          dark: false
      };

      this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme() {
      this.setState({ dark: !this.state.dark });
  }  

  render() {
    return (
      <div className={'theme ' + (this.state.dark ? 'theme--dark' : 'theme--default')}>
        <div className="window">
          <TitleBar title="var's JKA Server Checker" />
          <WindowBody />
          <button className="change-theme" onClick={this.changeTheme.bind(this)}>
            {this.state.dark ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
          </button>
        </div>
      </div>      
    );
  }

}

export default App;

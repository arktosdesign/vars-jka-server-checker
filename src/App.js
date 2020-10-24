// https://www.twilio.com/blog/react-app-with-node-js-server-proxy
// Host on netlify

import React, { Component } from 'react';
import TitleBar from './components/TitleBar';
import WindowBody from './components/WindowBody';

class App extends Component {

  render() {
    return (
      <div className="window">       
        <TitleBar title="var's JKA Server Checker" />
        <WindowBody />
      </div>
    );
  }

}

export default App;

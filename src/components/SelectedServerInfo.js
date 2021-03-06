import React, { Component } from 'react';

class SelectedServerInfo extends Component {
  
  constructor(props){
    super(props)
    this.state ={
        serverInfo: this.props.serverInfo,
        serverPlayers: null,
        copySuccess: 'Copy connection info',
        copyData: this.props.copyData
      }
    }

  copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.value);
    this.setState({
      copySuccess: 'Copied!'
    });
  };

  componentWillReceiveProps() {
    this.setState({
      copySuccess: 'Copy connection info',
    })
  }


  componentDidUpdate(prevProps) {
    if( this.props.serverInfo !== prevProps.serverInfo ) {
      this.setState({
        serverInfo: this.props.serverInfo,
        serverPlayers: this.props.serverInfo.players
      });
    }
    if( this.props.copyStatus !== prevProps.copyStatus ) {
      this.setState({
        copySuccess: this.props.copyStatus
      })
    }
    if( this.props.copyData !== prevProps.copyData ) {
      this.setState({
        copyData: this.props.copyData
      })
    }
  }

  render() {

    return (
      <>
      <div>
        
      </div>
        <section id="server">
          <span id="server__details">
            <ul className="server__info-key">

              {this.props.serverExists === false && 
                <li>
                  <strong>Server not found.</strong>
                </li>
              }
              {this.state.serverInfo.name && 
                <li>
                  <strong>Name:</strong> {this.state.serverInfo.name}
                </li>
              }
                            
              {this.state.serverInfo.mapName &&
                <li>
                  <strong>Map:</strong> {this.state.serverInfo.mapName}
                </li>
              }            
              
              {this.state.serverInfo.password === "0" && 
                <li>
                  <strong>Password:</strong> No
                </li>
              }

              {this.state.serverInfo.password === "1" && 
                <li>
                  <strong>Password:</strong> Yes
                </li>
              }

              {this.state.serverInfo.name && 
                <li>
                  <button className="copy-to-clipboard" value={this.state.copyData} onClick={this.copyToClipboard}>{this.state.copySuccess}</button>
                </li>
              }

            </ul>
          </span>

          {/* TODO - Order by frags */}
          
          <table width="100%">
            <thead>

            {this.state.serverPlayers && this.state.serverPlayers.length > 0 &&
              <tr>                
                <th align="left" valign="top" width="68%">Name</th>
                <th align="center" valign="top" width="16%">Ping</th>
                <th align="right" valign="top" width="16%">Score</th>
              </tr>
            }
            
            {this.state.serverPlayers && this.state.serverPlayers <= 0 &&
              <tr>
                <th colSpan="3" align="left" valign="top" className="no-players">No players found on the server</th>
              </tr>
            }      

            </thead>
            <tbody id="server__players">
              {this.state.serverPlayers &&
                this.state.serverPlayers.map((index, id) => (
                  <tr key={id}>
                    <td align="left" valign="top" width="68%">{index.name}</td>
                    <td align="center" valign="top" width="16%">{index.ping}</td>
                    <td align="right" valign="top" width="16%">{index.frags}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>          

        </section>
      </>
    )
  }
}

export default SelectedServerInfo;
import React, { Component } from 'react';
import SelectedServerInfo from './SelectedServerInfo';

class FavServerList extends Component {

  state = {
    queriedServer: [],
    activeLink: null,
    currentFavServerList: [],
    serverExists: true,
    copyConnection: null
  }
  
  componentDidUpdate(prevProps) {
    if( this.props.list !== prevProps.list ) {
      this.setState({
        currentFavServerList: [...this.props.list]
      }, () => {
        localStorage.setItem('servers', JSON.stringify(this.state.currentFavServerList));
        // console.log('List component updated:' + this.state.currentFavServerList);
      });
    }
  }

  getQueriedServer = (e) => {
    // Fields
    let listItemIpId = `fav-server__ip--` + e.currentTarget.id;
    let listItemIp = document.getElementById(listItemIpId).innerText;
    let listItemPortId = `fav-server__port--` + e.currentTarget.id;
    let listItemPort = document.getElementById(listItemPortId).innerText;    
    this.queryServer(listItemIp, listItemPort);

    let favId = parseInt(e.currentTarget.id);
    this.setState({
      activeLink: favId,      
      copyConnection: '/connect ' + listItemIp + ':' + listItemPort
    });
  }
  
  deleteFavItem = (id) => {
    this.setState({
      queriedServer: []
    });

    let currentFavServerList = [...this.props.list];
    if (currentFavServerList.length > 1) {      
      currentFavServerList.splice(id, 1);
      localStorage.setItem('servers', JSON.stringify(currentFavServerList));
      this.setState({
        currentFavServerList: currentFavServerList        
      }, () => {
        this.props.handleUpdateList(this.state.currentFavServerList);
        // console.log(this.state.currentFavServerList);
      });
    }
    else {
      let emptyServers = [];
      this.setState({
        currentFavServerList: emptyServers        
      }, () => {
        this.props.handleUpdateList(this.state.currentFavServerList);
        localStorage.setItem('servers', JSON.stringify(emptyServers));
      });      
    }    

  }


  queryServer = (ip, port) => { 
    this.setState({
      queriedServer: [],
      serverExists: true
    });
    const apiUrl = "https://tranquil-sands-27723.herokuapp.com/"
    fetch(`${apiUrl}?ip=${encodeURIComponent(ip)}&port=${encodeURIComponent(port)}`)
      .then(res => res.json())
      .then(res => {
        if (Array.isArray(res[0].players) && res[0].players.length) {
          this.setState({            
            queriedServerPlayers: res[0].players,
            queriedServer: res[0]
          })  
        }
        else {
          this.setState({
            queriedServer: res[0],
          })
        }
      })
      .catch((error) => {
        // console.log('Server not found')
        this.setState({
          serverExists: false,
        })
      });    
  }

  
  render() {
    return (
      <>
        <div className="fav-list-wrapper">
          <ul id="fav-list">        
            {this.state.currentFavServerList.map((index, id) => (
            <li key={`${index.name}${index}`} id={id} onClick={this.getQueriedServer.bind(this)} className={`fav-server ${id === this.state.activeLink ? "is--active" : ""}`}>
              <div className="fav-server__name">{index[0]}</div>
              <div className="fav-server__address">
                <div className="fav-server__ip" id={`fav-server__ip--` + id}>{index[1]}</div>:
                <div className="fav-server__port" id={`fav-server__port--` + id}>{index[2]}</div>
              </div>
              <div className="fav-server__actions">
                <button className="delete-fav" type="button" onMouseUp={this.deleteFavItem.bind(this, id, index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 58.1 58.1">
                    <g transform="translate(0,-952.36218)">
                      <path d="M56.6,953.8c-2-2-5.1-2-7.1,0L29,974.3L8.5,953.8c-2-2-5.1-2-7.1,0c-2,2-2,5.1,0,7.1L22,981.4l-20.5,20.5c-2,2-2,5.1,0,7.1
                        c2,2,5.1,2,7.1,0L29,988.5l20.5,20.5c2,2,5.1,2,7.1,0c2-2,2-5.1,0-7.1l-20.5-20.5l20.5-20.5C58.6,958.9,58.6,955.8,56.6,953.8z"/>
                    </g>
                  </svg>
                </button>              
              </div>
            </li>
            ))}
          </ul>
        </div>
        <SelectedServerInfo
          serverInfo={this.state.queriedServer}
          serverExists={this.state.serverExists}
          copyData={this.state.copyConnection} />
      </>
    )
  }
}

export default FavServerList;
import React, { Component } from 'react';
import SelectedServerInfo from './SelectedServerInfo';

class FavServerList extends Component {

  state = {
    queriedServer: [],
    activeLink: null,
    currentFavServerList: [],
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
      activeLink: favId
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
            queriedServer: res[0]
          })
        }
      })
      .catch((error) => {
        console.log('Server not found')
      });    
  }

  
  render() {
    return (
      <>
        <ul id="fav-list" className="tree-view">        
          {this.state.currentFavServerList.map((index, id) => (
          <li key={`${index.name}${index}`} id={id} onClick={this.getQueriedServer.bind(this)} className={`fav-server ${id === this.state.activeLink ? "is--active" : ""}`}>
            <div className="fav-server__name">{index[0]}</div>
            <div className="fav-server__address">
              <div className="fav-server__ip" id={`fav-server__ip--` + id}>{index[1]}</div>:
              <div className="fav-server__port" id={`fav-server__port--` + id}>{index[2]}</div>
            </div>
            <div className="fav-server__actions">
              <button className="delete-fav" type="button" onMouseUp={this.deleteFavItem.bind(this, id, index)}>Delete</button>              
            </div>
          </li>
          ))}
        </ul>
        <SelectedServerInfo
          serverInfo={this.state.queriedServer} />
      </>
    )
  }
}

export default FavServerList;
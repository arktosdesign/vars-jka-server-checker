import React, { Component } from 'react';
import AddServerForm from "./AddServerForm";
import FavServerList from './FavServerList';

class WindowBody extends Component { 

  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ip: '',
      port: '',
      queriedServer: [],
      queriedServerPlayers: [],
      serverListInfo: [],
      collapseOpen: false,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIpChange = this.handleIpChange.bind(this);
    this.handlePortChange = this.handlePortChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateList = this.handleUpdateList.bind(this);
    
    this.toggleCollapse= this.toggleCollapse.bind(this);

  }

  toggleCollapse() {
    const currentState = this.state.collapseOpen;
    this.setState({ collapseOpen: !currentState });
  };

  handleUpdateList = (updatedServerList) => {
    this.setState({
      serverListInfo: updatedServerList
    }, () => {
      let serverList = this.state.serverListInfo;
      localStorage.setItem('servers', JSON.stringify(serverList));
    });    
  }


  handleNameChange = (event) => {    
    // this.setState({
    //   name: event.target.value,
    // }, () => {
    //   console.log(this.state.name);
    // });
    this.setState({
      name: event.target.value,
    });
  }

  handleIpChange = (event) => {    
    this.setState({
      ip: event.target.value
    }, () => {
      console.log(this.state.ip);
    });
    // this.setState({
    //   ip: event.target.value
    // });    
  }

  handlePortChange = (event) => {    
    // this.setState({
    //   port: event.target.value
    // }, () => {
    //   console.log(this.state.port);
    // });
    this.setState({
      port: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // NEEDS VALIDATION IP AND PORT AND NAME CHECK
    // if (this.state.ip !== "" && this.state.port !== "" && this.state.name !== "") {      

      this.setState({
        serverListInfo: [...this.state.serverListInfo, [this.state.name, this.state.ip, this.state.port]]      
      }, () => {
        let serverList = this.state.serverListInfo;
        localStorage.setItem('servers', JSON.stringify(serverList));
        // Test local storage
        // var myServers = JSON.parse(localStorage.getItem('servers'));
        // console.log(myServers);
        this.setState({
          name: '',
          ip: '',
          port: ''
        }, () => {
          let addServerForm = document.getElementById("queryserver");      
          addServerForm.reset();
        });
      });

    // }
  }


  componentDidMount() {    
    // localStorage of servers
    // localStorage.clear();
    if (localStorage.getItem('servers') !== null) {   
      // Test localStorage 
      var myServers = JSON.parse(localStorage.getItem('servers'));
      // console.log(myServers);
      this.setState({
        serverListInfo: myServers
      });
    }
  }



  render() {

    return (
    <div className="window-body">
      <div className="window-body__inner">

          <div className="server-form">
            <button onClick={this.toggleCollapse} className="btn-toggle-server">{this.state.collapseOpen ? 'Close': 'Add Server'}</button>
            <div className={`toggle-wrapper ${this.state.collapseOpen ? 'is--open': ''}`}>
              <AddServerForm                
                handleNameChange={this.handleNameChange}
                handleIpChange={this.handleIpChange}
                handlePortChange={this.handlePortChange}
                handleSubmit={this.handleSubmit} />
            </div>
          </div>
          <FavServerList
              handleUpdateList={this.handleUpdateList}
              list={this.state.serverListInfo} />


      </div>
    </div>

    )
  }
}

export default WindowBody;
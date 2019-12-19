import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import NavBar from './components/NavBar' 
import SideBar from './components/SideBar';

class App extends Component {

  constructor(props) {
    super(props);

  
    

    this.state = {
      name: '',
      greeting: '',
      DDRList: this.randDates()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  randDates(){
    let dates = []
    for(let i=0;i<10;i++){
      dates.push({date: (new Date(+(new Date()) - Math.floor(Math.random()*10000000000)))})
    }
    
    return dates
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    // event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
      .then(response => response.json())
      .then(state => {this.setState(state)});
  }

  render() {
    return (
      <>
      <NavBar />
      <div className="container-fluid p-0">
        <div className="col-4 mt-2">
          <SideBar DDRList={this.state.DDRList} />
        </div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.greeting}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
      </>
    );
  }
}

export default App;

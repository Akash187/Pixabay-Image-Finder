import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar/NavBar';
import TextFields from './components/search/Search';
import './style/style.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <TextFields/>
      </div>
    );
  }
}

export default App;

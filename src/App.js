import React, { Component } from 'react';
import './App.css';
import './style/style.css';
import './firebase/firebase';
import Routes from './components/Routers/Routes';

class App extends Component {
  render() {
    return (
        <Routes/>
    );
  }
}

export default App;

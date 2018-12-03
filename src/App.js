import React, { Component } from 'react';
import './App.css';
import './style/style.css';
import Routes from './components/Routers/Routes';
import {MyProvider} from "./components/contextAPI/MyProvider";

class App extends Component {
  render() {
    return (
      <MyProvider>
        <Routes/>
      </MyProvider>
    );
  }
}

export default App;

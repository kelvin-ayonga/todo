import React, { Component } from 'react';
import Headers from './../Header/Header';
import './App.css';
import Todo from '../Todo/Todo';

class App extends Component {
  render() {
    return (
      <div>
        <Headers></Headers>
        <div className="container">
          <Todo/>
        </div>
      </div>
    );
  }
}

export default App;

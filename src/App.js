import React, {Component} from 'react';
import './App.css';
import Table from './Components/Table';

class App extends Component{
      
      constructor(props) {
        super(props);

      }

      render(){
        
        return (
          <div className="App">
            <h1>Bitcoin Monitor</h1>
            <Table />
          </div>
          )
        }
}


export default App;

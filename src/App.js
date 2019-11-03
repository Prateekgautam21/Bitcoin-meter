import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Table from './Components/Table';

class App extends Component{
      
      constructor(props) {
        super(props);

        this.state = {
          currentvalueofbitcoin: {},
          previousvalueofbitcoin: {},
        }

      }

      componentDidMount(){
        axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => {
          this.setState({
            previousvalueofbitcoin: this.state.currentvalueofbitcoin,
            currentvalueofbitcoin: {currentvalueofbitcoin: response.data}
          })
        })
      }

      // valueUpgrader = () => {
      //   this.setState(prevState => ({
      //     previousvalueofbitcoin: prevState
      //   })
      //   );

      //   console.log('Valueupgrader Ran');        
      //   console.log(this.state.previousvalueofbitcoin);
      //   console.log('Valueupgrader Ran');
      // }

      render(){
        
        console.log('render ran');
        console.log(this.state.previousvalueofbitcoin);
        // console.log(this.state.previousvalueofbitcoin.currentvalueofbitcoin.bpi.EUR.rate);
        console.log(this.state);
        console.log('render ran');
        
        var {previousvalueofbitcoin} = this.state.previousvalueofbitcoin
        console.log(previousvalueofbitcoin);
        
        var {currentvalueofbitcoin} = this.state.currentvalueofbitcoin;

        let eurRate = currentvalueofbitcoin ? currentvalueofbitcoin.bpi.EUR.rate: ''
        let gbpRate = currentvalueofbitcoin ? currentvalueofbitcoin.bpi.GBP.rate: ''
        let usdRate = currentvalueofbitcoin ? currentvalueofbitcoin.bpi.USD.rate: ''
        
        let eurPrevRate = previousvalueofbitcoin ? previousvalueofbitcoin.currentvalueofbitcoin.bpi.EUR.rate: ''
        let gbpPrevRate = previousvalueofbitcoin ? previousvalueofbitcoin.currentvalueofbitcoin.bpi.GBP.rate: ''
        let usdPrevRate = previousvalueofbitcoin ? previousvalueofbitcoin.currentvalueofbitcoin.bpi.USD.rate: ''

        console.log(eurPrevRate);
        console.log(gbpPrevRate);
        console.log(usdPrevRate);

        return (
          <div className="App">
            <h1>Bitcoin Monitor</h1>
            <Table eurRate={eurRate} gbpRate={gbpRate} usdRate={usdRate} />
            <button onClick={this.componentDidMount.bind(this)}>Refresh</button>
          </div>
          )
        }
}


export default App;

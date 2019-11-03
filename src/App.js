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
        
        // console.log('render ran');
        // console.log(this.state.previousvalueofbitcoin);
        // // console.log(this.state.previousvalueofbitcoin.currentvalueofbitcoin.bpi.EUR.rate);
        // // console.log(this.state);
        // console.log('render ran');
        
        var previousvalueofbitcoin = this.state.previousvalueofbitcoin
        // console.log(previousvalueofbitcoin);
        
        var {currentvalueofbitcoin} = this.state.currentvalueofbitcoin;

        let eurRate = currentvalueofbitcoin ? currentvalueofbitcoin.bpi.EUR.rate: ''
        let gbpRate = currentvalueofbitcoin ? currentvalueofbitcoin.bpi.GBP.rate: ''
        let usdRate = currentvalueofbitcoin ? currentvalueofbitcoin.bpi.USD.rate: ''
        
        

        for(var key in previousvalueofbitcoin) {
          if(key == "currentvalueofbitcoin"){
            // console.log(previousvalueofbitcoin.currentvalueofbitcoin.bpi.EUR.rate)
            if(eurRate != eurPrevRate){
              var eurPrevRate =  previousvalueofbitcoin.currentvalueofbitcoin.bpi.EUR.rate;
              var gbpPrevRate =  previousvalueofbitcoin.currentvalueofbitcoin.bpi.GBP.rate;
              var usdPrevRate =  previousvalueofbitcoin.currentvalueofbitcoin.bpi.USD.rate;
            }
            
    
          }
          
         }

        console.log(eurPrevRate);
        console.log(gbpPrevRate);
        console.log(usdPrevRate);
        console.log("----------------")

        return (
          <div className="App">
            <h1>Bitcoin Monitor</h1>
            <Table prevE={eurPrevRate} prevG={gbpPrevRate} prevU={usdPrevRate} eurRate={eurRate} gbpRate={gbpRate} usdRate={usdRate} />
            <button onClick={this.componentDidMount.bind(this)}>Refresh</button>
          </div>
          )
        }
}


export default App;

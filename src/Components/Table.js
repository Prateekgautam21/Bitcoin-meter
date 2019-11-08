import React, { Component } from 'react'
import "./Table.css";
import listofcodes from "./supportedCountries";
import axios from 'axios'

class Table extends Component {

        constructor(props) {
          super(props);
        
          this.state = {
            currentspecificvalueofbitcoin: null,
            previousspecificvalueofbitcoin: null,
            previousvalueofbitcoin: {},
            currentvalueofbitcoin: {}
          }

        }

        componentDidMount(){
              
          axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => {
              this.setState({
                previousvalueofbitcoin: this.state.currentvalueofbitcoin,
                currentvalueofbitcoin: {currentvalueofbitcoin: response.data}
              })
            });
          if(this.state.currentspecificvalueofbitcoin != null){
            this.countrycodepricegetter()
          }
        }

        countrycodepricegetter = () => {
              var countryCode = this.refs.countrycodetype.value;
              axios.get(`https://api.coindesk.com/v1/bpi/currentprice/${countryCode}.json`)
              .then(response => {
                  console.log(response.data);
                  this.setState({
                      previousspecificvalueofbitcoin: this.state.currentspecificvalueofbitcoin,
                      currentspecificvalueofbitcoin : response.data.bpi[countryCode].rate
                  })
              })
        }
        
        render() {  
                var previousvalueofbitcoin = this.state.previousvalueofbitcoin
              
                var {currentvalueofbitcoin} = this.state.currentvalueofbitcoin;
        
                let eurRate = currentvalueofbitcoin ? currentvalueofbitcoin.bpi.EUR.rate: ''
                let gbpRate = currentvalueofbitcoin ? currentvalueofbitcoin.bpi.GBP.rate: ''
                let usdRate = currentvalueofbitcoin ? currentvalueofbitcoin.bpi.USD.rate: ''
                
                for(var key in previousvalueofbitcoin) {
                  if(key == "currentvalueofbitcoin"){
                    if(eurRate != eurPrevRate){
                      var eurPrevRate =  previousvalueofbitcoin.currentvalueofbitcoin.bpi.EUR.rate;
                      var gbpPrevRate =  previousvalueofbitcoin.currentvalueofbitcoin.bpi.GBP.rate;
                      var usdPrevRate =  previousvalueofbitcoin.currentvalueofbitcoin.bpi.USD.rate;
                    }
                  }
                }

                return (
                    <div>
                    <table>
                    <thead>
                      <tr> 
                        <th>      </th>
                        <th>Before</th>
                        <th>Current</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Eur</td>
                        <td>{eurPrevRate}</td>
                        <td>{eurRate}</td>
                      </tr>
                      <tr>
                        <td>Pnd</td>
                        <td>{gbpPrevRate}</td>
                        <td>{gbpRate}</td>
                      </tr>
                      <tr>
                        <td>Usd</td>
                        <td>{usdPrevRate}</td>
                        <td>{usdRate}</td>
                      </tr>
                      <tr>
                        <td><select ref="countrycodetype" onChange={this.countrycodepricegetter.bind(this)}>
                        <option value=""></option>
                        {listofcodes.map((code, index) => {
                            return <option key={index} value={code}>{code}</option>
                        })}
                        </select></td>
                        <td>{this.state.previousspecificvalueofbitcoin}</td>
                        <td>{this.state.currentspecificvalueofbitcoin}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button onClick={this.componentDidMount.bind(this)}>Refresh</button>
                    </div>
                )
            }
}

export default Table

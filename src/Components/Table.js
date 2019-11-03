import React, { Component } from 'react'
import "./Table.css";

class Table extends Component {
    render() {

        let {eurRate, gbpRate, usdRate,prevE,prevG,prevU} = this.props;
        
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
                <td>{prevE}</td>
                <td>{eurRate}</td>
              </tr>
              <tr>
                <td>Pnd</td>
                <td>{prevG}</td>
                <td>{gbpRate}</td>
              </tr>
              <tr>
                <td>Usd</td>
                <td>{prevU}</td>
                <td>{usdRate}</td>
              </tr>
            </tbody>
          </table>
            </div>
        )
    }
}

export default Table

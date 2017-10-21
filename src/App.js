import React, { Component } from 'react'
import CustomerKyc from '../build/contracts/CustomerKyc.json'
import getWeb3 from './utils/getWeb3'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import * as BS from 'react-bootstrap'

import './css/oswald.css'
import './css/open-sans.css'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      customers: [
        {
          "customerId": "123123213",
          "status": false
        },
        {
          "customerId": "2324234",
          "status": true
        },
      ]
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  buttonFormatter(cell, row){
    return <BS.Button bsSize="xsmall">View</BS.Button>;
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const customerKyc = contract(CustomerKyc)
    customerKyc.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var customerKycInstance

    // Get accounts.
    // this.state.web3.eth.getAccounts((error, accounts) => {
    //   customerKyc.deployed().then((instance) => {
    //     customerKycInstance = instance

    //     // Stores a given value, 5 by default.
    //     return customerKycInstance.verifyAadhar(43672411333, {from: accounts[0]})
    //   }).then((result) => {
    //     // Get the value from the contract to prove it worked.
    //     return customerKycInstance.isAadharVerified.call(436724113)
    //   }).then((result) => {
    //     console.log(result)
    //     // Update state with the result.
    //     // return this.setState({ storageValue: result.c[0] })
    //   })
    // })
  }

  render() {
    return (
      <div className="site-container container-fluid flex-container">
        <BS.Row>
          <BS.Col xs={12}>
            <BootstrapTable data={this.state.customers} striped={true} hover={true} condensed= {true} >
              <TableHeaderColumn dataField="customerId" isKey={true} dataSort={true}>Customer Id</TableHeaderColumn>
              <TableHeaderColumn dataField="status" dataSort={true}>Aadhar Status</TableHeaderColumn>
              <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter.bind(this)}>Actions</TableHeaderColumn>
            </BootstrapTable>
          </BS.Col>
        </BS.Row>
      </div>
    );
  }
}

export default App

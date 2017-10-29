import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import {populateCustomers} from './utils/contract'
import {
  Router,
  Route
} from 'react-router-dom';
import history from './history';
import * as BS from 'react-bootstrap';
import * as Components from './components';
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

      ]
    }
  }

  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })      
      populateCustomers(results.web3).then((cus) => {this.setState({customers:cus})})
    })
    .catch((e) => {
      console.log(e)
    })
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" render={(props) =>(<Components.Home customers={this.state.customers} />)} />
          <Route path="/about" render={(props) =>(<Components.CustomerDetails />)}/>
        </div>
      </Router>
    );
  }
}

export default App

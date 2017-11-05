import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';
import {
  Router,
  Route
} from 'react-router-dom';
import history from './history';
import * as Components from './components';
import './css/oswald.css';
import './css/open-sans.css';
import { AppReducer } from './reducers/App';
import * as API from './apis/api';
import { populateCustomers, addCustomer, verifyAadhar, markOTPsent, getStatus } from './utils/contract';

import './App.css';

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

  dispatch(action) {
    console.log('action triggered');
    console.log('action', action);
    console.log('prevState', this.state);
    this.setState(prevState => AppReducer(prevState, action));
  }

  sendOTP = async (customerId, aadharNumber) => {
    const response = await API.initiateAadharVerification(customerId, aadharNumber);
    if (response.status === 'otp_sent') {
      const web3Response = await markOTPsent(customerId, this.state.web3);
      console.log('web3 response', web3Response);
      await this.updateStatus(customerId, aadharNumber);
    }
  }

  verifyAadhar = async (customerId, aadharNumber, OTP) => {
    const response = await API.verifyOTP(customerId, aadharNumber, OTP);
    if (response.status === 'success') {
      const web3Response = await verifyAadhar(customerId, this.state.web3);
      console.log('web3 response', web3Response);
      await this.updateStatus(customerId, aadharNumber);
    }
  }

  updateStatus = async (customerId, aadharNumber) => {
    let obsoleteCustomer = this.state.customers.filter(customer => customer.customerId === customerId)[0];
    let newStatus = ''
    do {
      newStatus = await getStatus(customerId, this.state.web3)
      console.log('web3 newStatus', newStatus);
    } while (obsoleteCustomer.status.toUpperCase() === newStatus)
    this.dispatch({ type: 'UPDATE_CUSTOMER', status: newStatus, customerId, aadharNumber });
  }

  createKycCustomer = async (customerId) => {
    try {
      return await addCustomer(customerId, this.state.web3);
    } catch (error) {
      return error;
    }
  }

  handleSearch = async (customerId) => {
    const response = await API.getCustomer(customerId);
    if (response.status !== 'success') {
      console.log('error', response);
      return {error: 'customer not found'}
    }
    const kycCustomers = this.state.customers.filter(customer => customer.customerId === parseInt(customerId));
    let kycCustomer = kycCustomers[0];
    if (!kycCustomer) {
      const web3response = await this.createKycCustomer(parseInt(customerId));
      if (web3response.tx) {
        const status = await getStatus(customerId, this.state.web3)
        kycCustomer = { customerId, status }
      }
    }
    history.push({ pathname: '/about', state: { bankRecord: response.response, kycRecord: kycCustomer } })
  }



  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })
      populateCustomers(results.web3).then((cus) => { this.setState({ customers: cus }) })
    })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    return (
      <div>
        <Components.Nav histor={history} />
        <Router history={history}>
          <div className="site-container container-fluid flex-container">
            <Route exact path="/" render={(props) => (<Components.Home fetchCustomer={this.handleSearch.bind(this)} customers={this.state.customers} />)} />
            <Route path="/about" render={(props) => (<Components.CustomerDetails sendOTP={this.sendOTP.bind(this)} verifyAadhar={this.verifyAadhar.bind(this)} />)} />
            <Route path="/search" render={(props) => (<Components.Search handleSubmit={this.handleSearch.bind(this)} />)} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App

import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';
import * as BS from 'react-bootstrap';
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
import { getExternalRequestStatus,createExternalRequest,approveExternalRequest,getEventLogs,populateCustomers, addCustomer, verifyAadhar, markOTPsent, getStatus } from './utils/contract';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      storageValue: 0,
      web3: null,
      customers: [

      ],
      logs: null,
      external_requests: []      
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
    } else {
      console.log('error otp verification - wrong otp', OTP);
      this.dispatch({ type: 'ERROR', error: 'Wrong OTP' });
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
    var logs = await getEventLogs(customerId,this.state.web3)
    this.dispatch({ type: 'RELOAD_LOGS', logs:logs});

  }


  createKycCustomer = async (customerId, aadharNumber) => {
    try {
      return await addCustomer(customerId, String(aadharNumber), this.state.web3);
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  handleSearch = async (customerId) => {
    const response = await API.getCustomer(customerId);
    if (response.status !== 'success') {
      console.log('error', response);
      return this.dispatch({ type: 'ERROR', error: 'Customer not found' });
    }
    console.log('response', response);
    const kycCustomers = this.state.customers.filter(customer => customer.customerId === parseInt(customerId));
    let kycCustomer = kycCustomers[0];
    if (!kycCustomer) {
      const web3response = await this.createKycCustomer(parseInt(customerId), response.response.Aadhar_card);
      if (web3response.tx) {
        const status = await getStatus(customerId, this.state.web3)
        kycCustomer = { customerId: parseInt(customerId), status }
        this.dispatch({ type: 'ADD_CUSTOMER', customer: kycCustomer })
      } else {
        return this.dispatch({ type: 'ERROR', error: 'Error in adding Customer to KYC' });
      }
    }
    var logs = await getEventLogs(customerId,this.state.web3)    
    this.dispatch({ type: 'RELOAD_LOGS', logs:logs});
    history.push({ pathname: '/about', state: { bankRecord: response.response, kycRecord: kycCustomer } })
  }



  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })
      populateCustomers(results.web3).then((cus) => { this.setState({ customers: cus }) })      
      this.updateExternalRequestStatus()
    })
      .catch((e) => {
        console.log(e)
      })
  }

  handleAlertDismiss() {
    this.setState({
      error: ''
    })
  }

  sendExternalRequest = async (aadharNumber) => {
    var res = await createExternalRequest(aadharNumber,this.state.web3)
    if(localStorage.getItem('aadharNumberRequests')){
      var requests = JSON.parse(localStorage.getItem('aadharNumberRequests'))
      requests.push(aadharNumber)
      localStorage.setItem('aadharNumberRequests',JSON.stringify(requests))
    } else {
      localStorage.setItem('aadharNumberRequests',JSON.stringify([aadharNumber]))
    }

    this.updateExternalRequestStatus()    
  }

  approveExternalRequest = async (customerId) => {        
    const web3Response = await approveExternalRequest(customerId, this.state.web3);    
    this.updateExternalRequestStatus()
    this.dispatch({type: 'RELOAD', customerId: customerId})
  }

  updateExternalRequestStatus = async () => {    
    if(localStorage.getItem('aadharNumberRequests')){
      var aadharNumberRequests = JSON.parse(localStorage.getItem('aadharNumberRequests'))
      var results = []
      
      for (var i = 0; i < aadharNumberRequests.length; i++) {
        var status = await getExternalRequestStatus(aadharNumberRequests[i],this.state.web3)
        results.push({aadharNumber:aadharNumberRequests[i],status:status})
      }
      this.dispatch({type: 'UPDATE_EXTERNAL_REQUEST',results})
    }
  }




  render() {
    return (
      <div>
        <Components.Nav histor={history} />
        {this.state.error &&
          <BS.Row>
            <BS.Col md={6} mdOffset={3} >
              <BS.Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
                <p>{this.state.error}</p>
              </BS.Alert>
            </BS.Col>
          </BS.Row>
        }
        <Router history={history}>
          <div className="site-container container-fluid flex-container">
            <Route path="/about" render={(props) => (<Components.CustomerDetails sendOTP={this.sendOTP.bind(this)} verifyAadhar={this.verifyAadhar.bind(this)} logs={this.state.logs}/>)} />
            <Route exact path="/" render={(props) => (<Components.Home fetchCustomer={this.handleSearch.bind(this)} customers={this.state.customers} approveExternalRequest={this.approveExternalRequest.bind(this)} />)} />
            <Route path="/external" render={(props) => (<Components.ExternalRequest handleSubmit={this.sendExternalRequest.bind(this)} externalRequests={this.state.external_requests} />)} />
            <Route path="/search" render={(props) => (<Components.Search handleSubmit={this.handleSearch.bind(this)} />)} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App

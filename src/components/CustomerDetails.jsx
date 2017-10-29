import React, {Component} from 'react';
import {withRouter} from 'react-router';
import * as BS from 'react-bootstrap';

import getWeb3 from '../utils/getWeb3'
import {verifyAadhar,getStatus} from '../utils/contract'

class CustomerDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {          
          web3: null,
          customer_status: ""
        }
    }

    updateStatus() {
        getStatus(this.props.location.state.customer.customerId,this.state.web3).then((result) => {
            this.setState({customer_status: result})
        })
    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            })      
            this.updateStatus()
        })
        .catch((e) => {
          console.log(e)
        })
    }    

    aadharVerification() {
        verifyAadhar(this.props.location.state.customer.customerId,this.state.web3).then((result) => {
            this.updateStatus()
            console.log("Aaadhar Verifitication initiated")
        })
    }

    render() {
        const customer = this.props.location.state.customer
        return (
            <div>
                <div>{customer.customerId}</div>
                <div>{this.state.customer_status}</div>
                <BS.Button bsSize="xsmall" onClick={this.aadharVerification.bind(this)}>Verify Aaadhar</BS.Button>
            </div>
        )
    }
}

const withRouterCustomerDetails = withRouter(CustomerDetails)
export {
    withRouterCustomerDetails as CustomerDetails
}   
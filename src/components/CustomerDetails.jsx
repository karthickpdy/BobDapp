import React, {Component} from 'react';
import {withRouter} from 'react-router';
import * as BS from 'react-bootstrap';

class CustomerDetails extends Component {
    constructor(props) {
        super(props)
    }

    updateStatus() {
        // getStatus(this.props.location.state.customer.customerId,this.state.web3).then((result) => {
        //     this.setState({customer_status: result})
        // })
    }

    componentWillMount() {
        // getWeb3.then(results => {
        //     this.setState({
        //         web3: results.web3
        //     })      
        //     this.updateStatus()
        // })
        // .catch((e) => {
        //   console.log(e)
        // })
    }    

    verifyAadhar() {
        this.props.verifyAadhar(this.props.location.state.customer.customerId, '123213', '123456');
    }

    sendOTP() {
        this.props.sendOTP(this.props.location.state.customer.customerId, '123213');
        // verifyAadhar(this.props.location.state.customer.customerId,this.state.web3).then((result) => {
        //     this.updateStatus()
        //     console.log("Aaadhar Verifitication initiated")
        // })
    }

    render() {
        const customer = this.props.location.state.customer
        return (
            <div>
                <div>{customer.customerId}</div>
                <div>{customer.status}</div>
                {customer.status.toUpperCase() === 'OTP_SENT' && <div>
                    <form>
                        <input name='otp' />
                    </form>
                    {<BS.Button bsSize="xsmall" onClick={this.verifyAadhar.bind(this)}>VERIFY AADHAR</BS.Button>}
                </div>}
                {customer.status.toUpperCase() === 'NOT_VERIFIED' && <BS.Button bsSize="xsmall" onClick={this.sendOTP.bind(this)}>Send OTP</BS.Button>}
            </div>
        )
    }
}

const withRouterCustomerDetails = withRouter(CustomerDetails)
export {
    withRouterCustomerDetails as CustomerDetails
}   
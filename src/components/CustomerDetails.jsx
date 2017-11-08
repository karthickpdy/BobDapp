import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as BS from 'react-bootstrap';

class CustomerDetails extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            otp: '',
            auditLog: []
        }

    }

    handleOTPChange(e) {
        this.setState({
            otp: e.target.value
        })
    }

    verifyAadhar() {
        this.props.verifyAadhar(this.props.location.state.kycRecord.customerId, this.props.location.state.bankRecord.Aadhar_card, this.state.otp);
    }

    sendOTP() {
        this.props.sendOTP(this.props.location.state.kycRecord.customerId, this.props.location.state.bankRecord.Aadhar_card);
    }
    getValidationState() {
        return null;
    }

    render() {
        console.log(this.props.location.state);
        const customer = this.props.location.state.kycRecord;
        const bankRecord = this.props.location.state.bankRecord;
        return (
            <BS.Row>
                <BS.Col sm={12}>
                    <BS.PanelGroup>
                        <BS.Panel bsStyle={'info'} header={'Customer details present in bank'}>
                            <BS.Table responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>PAN NUMBER</th>
                                        <th>AADHAR NUMBER</th>
                                        <th>PASSPORT NUMBER</th>
                                        <th>MOBILE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{bankRecord.Customer_Id}</td>
                                        <td>{bankRecord.Pan_Card}</td>
                                        <td>{bankRecord.Aadhar_card}</td>
                                        <td>{bankRecord.Passport_number}</td>
                                        <td>{bankRecord.Mobile_number}</td>
                                    </tr>
                                </tbody>
                            </BS.Table>
                        </BS.Panel>
                        <BS.Panel bsStyle={'info'} header={'Customer details present in KYC System'}>
                            <BS.Table responsive>
                                <thead>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{customer.customerId}</td>
                                        <td>{customer.status}</td>
                                    </tr>
                                </tbody>
                            </BS.Table>
                        </BS.Panel>
                        <BS.Panel bsStyle={'info'} header={'Verification Section'}>
                            {customer.status.toUpperCase() === 'OTP_SENT' && <div>

                                <BS.Form inline>
                                    <BS.FormGroup
                                        controlId="otpText"
                                        validationState={this.getValidationState()}
                                    >
                                        <BS.ControlLabel>Enter Received OTP</BS.ControlLabel>{' '}
                                        <BS.FormControl
                                            type="text"
                                            placeholder=""
                                            value={this.state.otp}
                                            name="otp"
                                            onChange={this.handleOTPChange.bind(this)}
                                        />
                                        <BS.FormControl.Feedback />
                                    </BS.FormGroup>
                                    {' '}<BS.Button  bsStyle="primary" onClick={this.verifyAadhar.bind(this)}>VERIFY AADHAR</BS.Button>
                                </BS.Form>
                            </div>}
                            {customer.status.toUpperCase() === 'NOT_VERIFIED' && <BS.Button bsStyle="primary" onClick={this.sendOTP.bind(this)}>Send OTP</BS.Button>}
                            {customer.status.toUpperCase() === 'VERIFIED' && <BS.Button bsStyle="success"><BS.Glyphicon glyph="ok" /> VERIFIED</BS.Button>}
                        </BS.Panel>
                        {                        
                        this.props.location.state.auditLogs.length > 0 ?
                        <BS.Panel bsStyle={'info'} header={'Transaction History'}>
                            <BS.Table responsive>
                                <thead>
                                    <tr>
                                        <th>Transaction</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {                                
                                        this.props.location.state.auditLogs.map(function(log,i) {
                                            return  <tr key={i}>
                                                        <td>{log.args.content}</td>
                                                        <td>{new Date(log.args.timestamp.toNumber()*1000).toString()}</td>
                                                    </tr>
                                        })
                                    }

                                </tbody>
                            </BS.Table>
                        </BS.Panel>    
                        : null                    
                        }
                    </BS.PanelGroup>
                </BS.Col>
            </BS.Row>
        )
    }
}

const withRouterCustomerDetails = withRouter(CustomerDetails)
export {
    withRouterCustomerDetails as CustomerDetails
}   
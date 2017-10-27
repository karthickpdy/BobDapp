import React, {Component} from 'react';
import {withRouter} from 'react-router';

class CustomerDetails extends Component {
    
    render() {
        const customer = this.props.location.state.customer
        return (
            <div>
                <div>{customer.customerId}</div>
                <div>{String(customer.status)}</div>
            </div>
        )
    }
}

const withRouterCustomerDetails = withRouter(CustomerDetails)
export {
    withRouterCustomerDetails as CustomerDetails
}   
import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as BS from 'react-bootstrap';
import {withRouter} from 'react-router';

class Home extends Component {
  
  buttonFormatter(cell, row){
    console.log(this.props)
    return <div>
              <BS.Button bsSize="xsmall" onClick={() => this.props.fetchCustomer(row.customerId)}>View</BS.Button>
              {row.pending_status ? <BS.Button bsSize="xsmall" onClick={() => this.props.approveExternalRequest(row.customerId)}>Approve Request</BS.Button> : null }
            </div>
  }

  render() {
    console.log(this.props);
    return (
              <BS.Row>
                <BS.Col xs={12}>
                  <BootstrapTable data={this.props.customers} striped={true} hover={true} condensed={true} >
                    <TableHeaderColumn dataField="customerId" isKey={true} dataSort={true}>Customer Id</TableHeaderColumn>
                    <TableHeaderColumn dataField="status" dataSort={true}>Aadhar Status</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter.bind(this)}>Actions</TableHeaderColumn>
                  </BootstrapTable>
                </BS.Col>
              </BS.Row>);   
  }
}

const withRouterHome = withRouter(Home)
export {
    withRouterHome as Home
}   
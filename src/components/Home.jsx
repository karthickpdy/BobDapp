import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as BS from 'react-bootstrap';
import {withRouter} from 'react-router';

class Home extends Component {
  
  componentDidMount() {
  }

  buttonFormatter(cell, row){
    console.log(this.props)
    return <BS.Button bsSize="xsmall" onClick={() => this.props.history.push({pathname: '/about', state: {customer: row} })}>View</BS.Button>;
  }

  render() {
    console.log(this.props);
    return (<div className="site-container container-fluid flex-container">
              <BS.Row>
                <BS.Col xs={12}>
                  <BootstrapTable data={this.props.customers} striped={true} hover={true} condensed={true} >
                    <TableHeaderColumn dataField="customerId" isKey={true} dataSort={true}>Customer Id</TableHeaderColumn>
                    <TableHeaderColumn dataField="status" dataSort={true}>Aadhar Status</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter.bind(this)}>Actions</TableHeaderColumn>
                  </BootstrapTable>
                </BS.Col>
              </BS.Row>
          </div>);   
  }
}

const withRouterHome = withRouter(Home)
export {
    withRouterHome as Home
}   
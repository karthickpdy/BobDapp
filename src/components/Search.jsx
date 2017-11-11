import React, { Component } from 'react';
import * as BS from 'react-bootstrap';
import { withRouter } from 'react-router';


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: {
        customerId: ''
      }
    }
  }

  buttonFormatter(cell, row) {
    console.log(this.props)
    return <BS.Button bsSize="xsmall" onClick={() => this.props.history.push({ pathname: '/about', state: { customer: row } })}>View</BS.Button>;
  }

  getValidationState() {
    return null;
  }

  handleSubmit() {
    this.props.handleSubmit(this.state.search.customerId);
  }
  
  handleChange(e) {
    this.setState({search: {
      customerId: e.target.value 
    }})
  }
  render() {
    console.log(this.props);
    return (
      <BS.Row>
      <BS.Col sm={12}>
        <BS.PanelGroup>
        <BS.Panel bsStyle={'primary'} header={'Search Customer'}>
            <form>
            <BS.FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <BS.ControlLabel>Customer ID</BS.ControlLabel>
              <BS.FormControl
                type="text"
                value={this.state.search.customerId}
                placeholder="Enter Customer ID"
                onChange={this.handleChange.bind(this)}
              />
              <BS.FormControl.Feedback />
            </BS.FormGroup>
            <BS.Button type="button" bsStyle={'primary'} onClick={this.handleSubmit.bind(this)}>Get Customer Details</BS.Button>
          </form>
          </BS.Panel>
          </BS.PanelGroup>
          </BS.Col>
          </BS.Row>);
  }
}

const withRouterSearch = withRouter(Search)
export {
  withRouterSearch as Search
}   
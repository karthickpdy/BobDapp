import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as BS from 'react-bootstrap';
import { withRouter } from 'react-router';


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: {
        customerId: '435723112'
      }
    }
  }
  componentDidMount() {
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
    return (<div className='well'>
      <form>
        <BS.FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <BS.ControlLabel>Search Customer</BS.ControlLabel>
          <BS.FormControl
            type="text"
            value={this.state.search.customerId}
            placeholder="Enter Customer ID"
            onChange={this.handleChange.bind(this)}
          />
          <BS.FormControl.Feedback />
        </BS.FormGroup>
        <BS.Button type="button" onClick={this.handleSubmit.bind(this)}>Get Customer Details</BS.Button>
      </form>
    </div>);
  }
}

const withRouterSearch = withRouter(Search)
export {
  withRouterSearch as Search
}   
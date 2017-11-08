import React, { Component } from 'react';
import * as BS from 'react-bootstrap';
import { withRouter } from 'react-router';


class ExternalRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: {
        aadharNumber: '1'
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
    this.props.handleSubmit(this.state.search.aadharNumber);
  }
  
  handleChange(e) {
    this.setState({search: {
      aadharNumber: e.target.value 
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
          <BS.ControlLabel>ExternalRequest Customer</BS.ControlLabel>
          <BS.FormControl
            type="text"
            value={this.state.search.aadharNumber}
            placeholder="Enter Aadhar ID"
            onChange={this.handleChange.bind(this)}
          />
          <BS.FormControl.Feedback />
        </BS.FormGroup>
        <BS.Button type="button" onClick={this.handleSubmit.bind(this)}>Get Customer Details</BS.Button>
      </form>

      <BS.Table responsive>
          <thead>
              <tr>
                  <th>Aadhar Number</th>
                  <th>Status</th>
              </tr>
          </thead>
          <tbody>
              {                                
                  this.props.externalRequests.map(function(request,i) {
                      return  <tr key={i}>
                                  <td>{request.aadharNumber}</td>
                                  <td>{request.status}</td>
                              </tr>
                  })
              }

          </tbody>
      </BS.Table>      
    </div>);
  }
}

const withRouterExternalRequest = withRouter(ExternalRequest)
export {
  withRouterExternalRequest as ExternalRequest
}   
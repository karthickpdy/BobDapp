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
    this.setState({
      search: {
        aadharNumber: e.target.value
      }
    })
  }
  render() {
    return (
      <BS.Row>
        <BS.Col sm={12}>
          <BS.PanelGroup>
          <BS.Panel bsStyle={'primary'} header={'Request for Status'}>
              <form>
                <BS.FormGroup
                  controlId="formBasicText"
                  validationState={this.getValidationState()}>
                  <BS.ControlLabel>Aadhar Number</BS.ControlLabel>
                  <BS.FormControl
                    type="text"
                    value={this.state.search.aadharNumber}
                    placeholder="Enter Aadhar ID"
                    onChange={this.handleChange.bind(this)}
                  />
                  <BS.FormControl.Feedback />
                </BS.FormGroup>
                <BS.Button type="button" bsStyle={'primary'} onClick={this.handleSubmit.bind(this)}>Get Aadhar Status</BS.Button>
              </form>
            </BS.Panel>
            <BS.Panel bsStyle={'primary'} header={'Past Transactions'}>
              <BS.Table responsive>
                <thead>
                  <tr>
                    <th>AADHAR NUMBER</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.externalRequests.map(function (request, i) {
                      return <tr key={i}>
                        <td>{request.aadharNumber}</td>
                        <td>{request.status}</td>
                      </tr>
                    })
                  }
                </tbody>
              </BS.Table>
            </BS.Panel>
          </BS.PanelGroup>
        </BS.Col>
      </BS.Row>);
  }
}

const withRouterExternalRequest = withRouter(ExternalRequest)
export {
  withRouterExternalRequest as ExternalRequest
}   
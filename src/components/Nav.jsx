import React, { Component } from 'react';
import * as BS from 'react-bootstrap';
import { withRouter } from 'react-router';


class Nav extends Component {

  render() {
    return (<BS.Navbar bsStyle="pills">
      <BS.Navbar.Header>
        <BS.Navbar.Brand>
          <a href="/">e-KYC</a>
        </BS.Navbar.Brand>
      </BS.Navbar.Header>
      <BS.Nav>
        <BS.NavItem eventKey={1} href="/search">Search</BS.NavItem>
      </BS.Nav>
    </BS.Navbar>)
  }
}

// const withRouterNav = withRouter(Nav)
export {
  Nav as Nav
}   
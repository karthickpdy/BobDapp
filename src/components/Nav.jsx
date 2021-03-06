import React, { Component } from 'react';
import * as BS from 'react-bootstrap';

export class Nav extends Component {

  render() {
    return (<BS.Navbar className='remove-border-radius'>
      <BS.Navbar.Header>
        <BS.Navbar.Brand>
          <a href="/">e-KYC</a>
        </BS.Navbar.Brand>
      </BS.Navbar.Header>
      <BS.Nav>
        <BS.NavItem eventKey={1} href="/search">Search</BS.NavItem>
        <BS.NavItem eventKey={2} href="/external" target="_blank">Go to External app</BS.NavItem>
      </BS.Nav>
    </BS.Navbar>)
  }
}
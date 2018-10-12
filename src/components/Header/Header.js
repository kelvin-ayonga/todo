import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,} from 'reactstrap';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><i className="mdi mdi-book-outline" aria-hidden="true"></i>Todo</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/favorites/">
              <i className="mdi mdi-delete-empty" aria-hidden="true"></i>Favorites</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/settings/">
              <i className="mdi mdi-account-alert" aria-hidden="true"></i>Settings</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
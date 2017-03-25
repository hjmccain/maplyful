import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as sync_actions from '../../actions/sync.js';
import * as post_actions from '../../actions/post_request.js';

class NavbarUser extends React.Component  {

  render () {
    const { currentUser } = this.props;
    return (
      <Navbar className="user-navbar" collapseOnSelect>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav pullRight>
          <NavItem className="navbaruser-link" onClick={()=> {hashHistory.push('/account')}}>Your Profile</NavItem>
          <NavItem className="navbaruser-link" href="#" onClick={()=> {hashHistory.push(`/newmap/${currentUser.id}`)}}>Create Map</NavItem>
          <NavItem className="navbaruser-link" href="#" onClick={() => {this.props.dispatch(post_actions.logOut(this.props.currentUser.token))}}>Log Out</NavItem>
          <NavItem className="navbaruser-link" onClick={() => {this.props.dispatch(sync_actions.tutorialModal())}}>Help</NavItem>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps)(NavbarUser);

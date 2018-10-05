import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

class Header extends Component {
  
  renderContent = () => {
    switch (this.props.userAuthState){
      case null: { // I don't know if user is logged in
        return null;
      }
      case false: { // User is not logged in
        return <li><a href="/auth/google">Login With Google</a></li>
      }
      default: { // User is logged in
        return [ // returning array, so "," between following elements
          <li key="0"><Payments /></li>,
          <li key="1" style={{margin: '0 10px'}}>Credits: {this.props.userAuthState.credits}</li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ]
      }
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.userAuthState ? '/surveys': '/'} className="left brand-logo">
            Emaily
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { userAuthState: state.auth }; // Accessing to auth as a name of authReducer, it has no more "derived data" just object or null or false
}

export default connect(mapStateToProps)(Header);

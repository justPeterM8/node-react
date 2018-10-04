import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  
  renderContent = () => {
    switch (this.props.userAuthState){
      case null: {
        return null;
      }
      case false: {
        return <li><a href="/auth/google">Login With Google</a></li>
      }
      default: {
        return <li><a href="/api/logout">Logout</a></li>
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

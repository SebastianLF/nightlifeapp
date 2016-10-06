import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { showLoginscreen, signoutUser } from '../actions';

class Menu extends React.Component {

  _logIn(e){
    e.preventDefault();
    this.props.dispatch(showLoginscreen());
  }

  _logOut(e) {
    e.preventDefault();
    this.props.dispatch(signoutUser());
  }

  menuItems() {
    if (this.props.auth && this.props.auth.authenticated) {
      return [
        <Link to="/mybar" activeClassName="active" className="ui item">My bar</Link>,
        <Link to="/wall" activeClassName="active" className="ui item">Wall</Link>,
        <Link to="/friends" activeClassName="active" className="ui item">Friends</Link>,
        <div className="ui dropdown right item">
          Profile
          <i className="dropdown icon"></i>
          <div className="menu">
            <Link to="/settings" activeClassName="active" className="item"><i className="settings icon"></i> Settings</Link>
            <div onClick={ this._logOut.bind(this) } className="item"><i className="sign out icon"></i> Logout</div>
          </div>
        </div>
      ]
    }
    return <a onClick={ this._logIn.bind(this) } className="ui inverted button">Log in</a>
  }

  render () {
    return (
      <div className="ui top fixed menu">
        <a className="toc item"><i className="sidebar icon" /></a>
        <div className="item">
          <i className="user icon"></i>
          NCAPP
        </div>
        <a className="item">Search</a>
        { this.menuItems() }
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Menu);

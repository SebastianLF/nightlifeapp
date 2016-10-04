import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import { showLoginscreen, signoutUser } from '../actions';


class Menu extends React.Component {

  componentDidMount() {
    $('.ui.dropdown')
    .dropdown();
  }

  isHome() {
    if (this.props.location.pathname === '/') {
      return true;
    }
    return false;
  }

  isLogged() {
    if (this.props.auth.authenticated) {
      return true;
    }
    return false;
  }

  _logIn(e){
    e.preventDefault();
    this.props.dispatch(showLoginscreen());
  }

  _logOut(e) {
    e.preventDefault();
    this.props.dispatch(signoutUser());
  }

  displayButtons() {
    const color = classNames('ui', { 'item': !this.isHome() }, { 'button': this.isHome() }, { 'inverted': this.isHome() }, { 'basic': !this.isHome() });

    if (this.isLogged()) {
      return [
          <Link to="/mybar" activeClassName="active" className={color}>My bar</Link>,
          <Link to="/wall" activeClassName="active" className={color}>Wall</Link>,
          <Link to="/friends" activeClassName="active" className={color}>Friends</Link>,
          <div className="ui right dropdown item">
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

  displayMenu() {
    const segmentClasses = classNames({ 'ui': this.isHome() }, { 'basic': this.isHome() }, { 'segment': this.isHome() });
    const menuClasses = classNames('ui', { 'text': this.isHome() }, { 'white': this.isHome() }, 'menu' );
    const containerClasses = classNames('ui', { 'fluid': !this.isHome() }, 'container');

    const rightItem = () => {
      return ( <div className="right menu">{ this.displayButtons() }</div> );
    };

    const headerItem = () => {
      return (<Link to="/" className="header item">Nightlife Coordination App</Link>);
    };

    if ( this.isHome() ) {
      return (
        <div className={containerClasses}>
          <div className={menuClasses}>
            <Link to="/" className="header item">Nightlife Coordination App</Link>
            { rightItem() }
          </div>
        </div>
      );
    }

    return (
      <div className="ui menu large menu-not-home">
        { headerItem() }
        { rightItem() }
      </div>
    );
  }

  render () {
    console.log(this.props);
    return (
      <div>
        { this.displayMenu() }
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Menu);

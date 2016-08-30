import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import { showLoginscreen } from '../actions';

class Menu extends React.Component {

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

  displayButtons() {
    const color = classNames('ui', 'button', { 'inverted': this.isHome() }, { 'basic': !this.isHome() });

    if (isLogged()) {
      return <Link to="/mybar" activeClassName="active" className={color}>My bar</Link>;
    }

    return
  }

  render () {

    const segmentColor = classNames({ 'ui': this.isHome() }, { 'basic': this.isHome() }, { 'segment': this.isHome() });
    const menuColor = classNames('ui', 'text', 'white', 'menu');
    const logInButtons = this.isLogged() ?
      <a onClick={ (e) => {e.preventDefault(); this.props.dispatch(showLoginscreen())} } className="ui inverted button">Log in</a>
        :
      'logged';

    return (<div>
      <div className="ui container">
        <div className={menuColor}>
          <a href="#" className="header item">
            Nightlife Coordination App
          </a>
          <div className="right item">
            { this.displayButtons() }
            <div className="ui right dropdown item">
              More
              <i className="dropdown icon"></i>
              <div className="menu">
                <div className="item">Applications</div>
                <div className="item">International Students</div>
                <div className="item">Scholarships</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Menu);

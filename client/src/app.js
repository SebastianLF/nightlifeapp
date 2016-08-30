import React from 'react';
import { connect } from 'react-redux';
import LoginScreen from './containers/loginscreen';
import Menu from './containers/menu';

class App extends React.Component {

  getChildContext() {
    return {
      location: this.props.location
    }
  }

  _hideMenuOnlyInHome() {
    if (this.props.location.pathname !== '/') {
      return <Menu location={this.props.location} />;
    }
    return;
  }

  render() {
    console.log(this.props);
    return (
      <div className="app">
        <LoginScreen />
        { this._hideMenuOnlyInHome() }
        { this.props.children }
      </div>
    );
  }
}

App.childContextTypes = {
    location: React.PropTypes.object
};

export default connect()(App);

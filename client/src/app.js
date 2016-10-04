import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import LoginScreen from './containers/loginscreen';
import Menu from './containers/menu';
import Menu2 from './containers/menu2';
import SubHeader from './components/subheader';

class App extends React.Component {


  _hideMenuOnlyInHome() {
    if (this.props.location.pathname !== '/') {
      return <Menu location={this.props.location} />;
    }
    return;
  }

  _displaySubHeader() {
    if (this.props.location.pathname !== '/') {
      return <SubHeader title={ this.props.children.props.route.title }/>;
    }
  }

  render() {
    return (
      <div className="app">
        <LoginScreen />
        <Menu2 />
        { this._hideMenuOnlyInHome() }
        { this._displaySubHeader() }
        { this.props.children }
      </div>
    );
  }
}



export default connect()(App);

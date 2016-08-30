import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';
import { findBars, showLoginscreen } from '../actions';
import BarList from './barslist';
import Menu from './menu';

class Search extends React.Component {

  handleAnimation() {
    /* global $ */
    /* eslint no-undef: "error" */
    $('.pusher h1').transition('pulse');
  }

  getBarsFromLocation(e) {
    e.preventDefault();
    const city = this.myTextInput.value;
    this.props.dispatch(findBars(city));
  }

  header() {

    const logInButtons = !this.props.auth.authenticated ?
      <a onClick={ (e) => {e.preventDefault(); this.props.dispatch(showLoginscreen())} } className="ui inverted button">Log in</a> : '!!';

    const isFetching = classNames(
      'ui', 'big', 'fluid', 'icon', 'input', { loading: this.props.bars.isFetching }
    );

    const location = {
      pathname: this.context.location.pathname
    };

    return (
    <div className="masthead">
      <div className="pusher">
        <div className="ui inverted vertical masthead center aligned segment">
          <Menu location={location} />
          <div className="ui text container">
            <h1 className="ui inverted header">
              What s up tonight ?
            </h1>
            <form onSubmit={this.getBarsFromLocation.bind(this)}>
              <div className={isFetching}>
                <input style={{ padding: '20px 20px 20px 40px !important' }}
                        ref={(ref) => (this.myTextInput = ref)}
                        onClick={this.handleAnimation.bind(this)}
                        type="text" placeholder="Type a location to find bars around..."></input>
                      <i className='search icon' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>);
  }

  render() {
    return (
      <div>
        { this.header() }
        <BarList />
      </div>
    );
  }
}

Search.contextTypes = {
  location: React.PropTypes.object
}

const mapStateToProps = ({ auth, bars, loginscreen }) => ({ auth, bars, loginscreen });

export default connect(mapStateToProps)(Search);

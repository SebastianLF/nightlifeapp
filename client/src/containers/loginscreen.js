import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { reset } from 'redux-form';
import { closeLoginscreen } from '../actions';
import SignIn from '../components/auth/signin';


const LoginScreen = ({ loginscreen, onSocialClick, onClose }) => {
  const show = classNames('ui', 'loginscreen', 'page', 'inverted', 'dimmer', { active: loginscreen.active });

  return (
    <div className={ show }>
      <div className="content" style={{ backgroundColor: 'white' }}>
        <i onClick={ () => onClose() } className="remove circle outline grey huge icon"></i>
        <div className="ui middle aligned center aligned grid">
          <div className="four wide column">
            <div className="ui info message">
              <div className="header">
                User credentials for test purposes.
              </div>
              <ul className="list">
                <li>Email: test1@test.com</li>
                <li>Password: test</li>
              </ul>
            </div>
          <SignIn />
          <div className="ui horizontal divider">
            Or
          </div>
          <button className="ui fluid facebook button" onClick={ (e) => onSocialClick(e, 'facebook') } disabled={true}>
            <i className="facebook icon"></i>
            Facebook
          </button>
        </div>
        </div>
      </div>
    </div>

  );
};

const mapStateToProps = ({ loginscreen }) => ({ loginscreen });

const mapDispatchToProps = (dispatch) => ({
  onSocialClick: (e, social) => {
    e.preventDefault();
  },
  onClose: () => {
    dispatch(reset('signin'))
    dispatch(closeLoginscreen())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignIn extends React.Component {

  handleSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert(){
    if (this.props.errorMessage) {
      return (
        <div className="ui error message">
          <strong>Oops!</strong> { this.props.errorMessage }
        </div>
      )
    }
  }

  render() {
    console.log(this.props);
    const { fields: {email, password}, handleSubmit, submitting } = this.props;
    return (
      <form className="ui form error" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <div className="field">
          <label>Email</label>
          <input type="text" placeholder="Email" {...email} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="Password" {...password} />
        </div>
        { this.renderAlert() }
        <button className="ui fluid button" type="submit" disabled={submitting}>Submit</button>
      </form>
    )
  }
}

SignIn.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

function mapStateToProps({ auth }){
  return { errorMessage: auth.error }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(SignIn);

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { updateProfile } from '../actions';
import { loadSettings } from '../localstorage';
import classNames from 'classnames';

class Settings extends React.Component {

  componentDidMount() {
    $(this._gender).dropdown();
    $(this._timezone).dropdown();
    $(this._notif_friends).checkbox();
  }

  _handleSubmit({ gender, timezone, notif_friends }) {
    const user = { gender, timezone, notif_friends };
    this.props.dispatch(updateProfile(user));
  }

  render () {
    const {fields: {gender, timezone, notif_friends}, handleSubmit} = this.props;
    const notif_friendsClass = classNames('ui', 'slider', 'checkbox', {'checked': notif_friends.value === true} );
    const notif_friendsDefaultValue = () => {
      if (notif_friends.value) {
        return true;
      }

      return false;
    };
    return (
      <div className="page">
        <div className="ui container segment basic">
        <form onSubmit={handleSubmit(this._handleSubmit.bind(this))} className="ui form">
          <div className="field">
            <label>Gender</label>
              <select ref={select => this._gender = select } className="ui fluid dropdown" name="gender" {...gender}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="field">
            <label>Gender</label>
              <select ref={select => this._timezone = select } className="ui fluid dropdown" name="timezone" {...timezone}>
              <option value="">Timezone</option>
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Europe/London">Europe/London</option>
            </select>
          </div>
          <div className="inline field">
            <div ref={select => this._notif_friends = select } {...notif_friends} className='ui slider checkbox'>
              <input type="checkbox" tabIndex="0" className="hidden" defaultChecked={notif_friendsDefaultValue()}/>
              <label>Disable bar trips to friends.</label>
            </div>
          </div>
          <button className="ui button" type="submit">Submit</button>
        </form>
      </div>
    </div>
    )
  }
}

Settings = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'settings',                           // a unique name for this form
  fields: ['gender', 'timezone', 'notif_friends'] // all the fields in your form
},
state => ({ // mapStateToProps
  initialValues: loadSettings() // pull state from locaStorage instead of requesting server.
}))(Settings);

export default Settings;

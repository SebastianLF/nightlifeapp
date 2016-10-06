import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Bar from '../components/bar';

class MyBar extends React.Component {

  render() {

    return (
      <div className="page">
        <div className="ui container segment basic">
          <h1>My actual bar</h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ selectedBar }) => ({ selectedBar });

export default connect(mapStateToProps)(MyBar);

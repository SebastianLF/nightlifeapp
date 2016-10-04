import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends React.Component {

    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render () {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ auth }) => {
    return { authenticated: auth.authenticated };
  };

  return connect(mapStateToProps)(Authentication);
}

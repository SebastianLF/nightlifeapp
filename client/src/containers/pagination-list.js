import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { findBars } from '../actions';

class PaginationList extends React.Component {

  handleNavigationClick(e) {
    e.preventDefault();

    // set offset by actual page clicked.
    const city = this.props.searchTerm;
    switch (+e.target.text) {
      case 2:
        return this.props.dispatch(findBars(city, 10));
      case 3:
        return this.props.dispatch(findBars(city, 20));
      case 4:
        return this.props.dispatch(findBars(city, 30));
      case 1:
      default:
        return this.props.dispatch(findBars(city, 0));
    }
  }

  composePagination() {

    const length = this.props.length;
    let pagination = [];
    for (let i = 1; i <= length; i++) {

      pagination.push(<a key={i} onClick={this.handleNavigationClick.bind(this)} className="item">{i}</a>);
    }

    return pagination;
  }

  render () {
    return (
      <div className="ui pagination menu">
        { this.composePagination() }
      </div>
    )
  }
}

const mapStateToProps = ({ bars }) => ({ searchTerm: bars.searchTerm });

export default connect(mapStateToProps)(PaginationList);

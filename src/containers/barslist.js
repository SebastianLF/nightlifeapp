import React from 'react';
import { connect } from 'react-redux';

import { setSelectedBar } from '../actions';
import Bar from '../components/bar';
import PaginationList from './pagination-list';

const BarList = ({ items, total, error, onSelect, selectedItem, isFetching }) => {

  const list = () => {
    const paginationLength = total / 10;
    if (items) {
      return [
        items.map(bar => {
          const isSelected = selectedItem && (bar.id === selectedItem);
          return (
            <Bar
              key={bar.id}
              isSelected={isSelected}
              onSelect={onSelect}
              selectedItem={selectedItem}
              {...bar} />
          );
        }),
        <PaginationList length={paginationLength} city="" />
      ]
    }

    return ;
  }

  return (
    <div className="ui container">
      <h1 className="ui header">
        { error.status ? error.status.message : ''}
      </h1>
      { list() }
    </div>);
};

const mapStateToProps = ({ bars }) => ({
  items: bars.items && bars.items.businesses,
  total: bars.items && bars.items.total,
  selectedItem: bars.selectedBar,
  error: bars.error,
  isFetching: bars.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  onSelect: (bar, e) => {
    dispatch(setSelectedBar(bar));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BarList);

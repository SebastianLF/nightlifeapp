import React from 'react';
import { connect } from 'react-redux';
import { selectBar } from '../actions/bars';
import Bar from '../components/bar';

const BarList = ({ items, error, onSelect, selectedItem, isFetching }) => {

  const list = !error.status ?
  <div>
    {
      items.businesses.map(bar => {
        const isSelected = (bar.id === selectedItem.id);
        return (
          <Bar
            key={bar.id}
            isSelected={isSelected}
            onSelect={onSelect}
            selectedItem={selectedItem}
            {...bar} />
        );
      })
    }
  </div>
  :
  <div className="ui error message"><h1 className="header">{ error.status ? error.message : `${items.total} bars matched your location` }</h1></div>;

  return (
    <div className="ui container">
      <h1 className="ui header">
        { error.status ? error.status.message : ''}
      </h1>
      { list }
    </div>);
};

const mapStateToProps = ({ bars }) => ({
  items: bars.items,
  selectedItem: bars.selectedItem,
  error: bars.error,
  isFetching: bars.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  onSelect: (e, id) => {
    dispatch(selectBar(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BarList);

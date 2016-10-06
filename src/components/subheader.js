import React, { PropTypes } from 'react'

const Subheader = (props) => {
  return (
    <div className="subhead">
      <div className="ui container">
        <h1>{props.title}</h1>
      </div>
    </div>
  )
}

export default Subheader;

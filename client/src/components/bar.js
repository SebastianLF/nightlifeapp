import React, { Component } from 'react';
import classNames from 'classnames';

class Bar extends Component {

  _dimmer() {
    const { isProcessing } = this.props;

    const submitButton = classNames(
      'ui', 'primary', 'button',
      { 'loading': isProcessing }
    );

    return (
    <div className="ui dimmer">
      <div className="content">
        <div className="center">
          <h2 className="ui inverted icon header">Approx. Hour</h2>
          <form className="ui form" onSubmit={ this._onSubmit }>
            <input type="number" defaultValue="0" placeholder="HH:MM" ref={e => { this._timeInput = e; } } />
            <button type="submit" className={ submitButton }>OK</button>
          </form>
        </div>
      </div>
    </div>);
  }

  render() {
    // from yelp api.
    const { rating_img_url_large, location, display_phone,
      image_url, name, snippet_text, categories } = this.props;

    // from redux state.
    const { onSelect, isSelected } = this.props;

    const selectButtonLabel = isSelected ? "I'M ALREADY HERE !" : 'GO HERE NOW!';

    const goingButtonClass = classNames(
      'ui', 'toggle', 'button',
      { 'basic': !isSelected },
      { 'active': isSelected }
    );

    return (
      <div className="ui segment">
        <div className="ui divided items">
          <div className="item">
            <div className="image">
              <img src={image_url ?
                  (image_url.replace(/ms.jpg/i, '348s.jpg')) :
                  ('public/img/no_image_available.svg')}
              />
            </div>
            <div className="middle aligned content">
              <a className="header">{ name }</a>
              <div className="meta">
                <span className="cinema">{ categories.length > 1 ?
                  (categories.map((category, i) =>
                    (i === categories.length-1 ? category[0] : `${category[0]}, `))) :
                  (categories.map(category => category[0]))
                }</span>
              </div>
              <div className="description">
                <p>{ snippet_text }</p>
              </div>
              <div className="extra">
                <div className="ui label">
                  { location.display_address.length > 1 ?
                    (location.display_address.map((address, i) =>
                      (i === location.display_address.length-1 ? address : `${address}, `))) :
                    (location.display_address.map(address => address))
                  }
                </div>
                <div className="ui label">{ display_phone }</div>
              </div>
              <div className="extra">
                <img src={ rating_img_url_large } />
              </div>
              <div className="actions">
                <div onClick={ onSelect } className={ goingButtonClass }>
                  { selectButtonLabel }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bar;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchPanel extends Component {
  state = {
    value: '',
  };

  render() {
    const { updateSearchString } = this.props;
    const input = (event) => {
      this.setState({ value: event.target.value });
      updateSearchString(event.target.value);
    };
    const {value} = this.state
    return <input className="main__search-panel" placeholder="Type to search..." value={value} onChange={input} />
  }
}

export default SearchPanel;

SearchPanel.propTypes = {
  updateSearchString:PropTypes.func
}

SearchPanel.defaultProps = {
  updateSearchString:()=>{}
}

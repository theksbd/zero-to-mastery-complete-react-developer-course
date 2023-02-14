import { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  render() {
    return (
      <input
        className={this.props.className}
        type='search'
        placeholder={this.props.placeholder}
        autoFocus
        onChange={this.props.onChange}
      />
    );
  }
}

export default SearchBar;

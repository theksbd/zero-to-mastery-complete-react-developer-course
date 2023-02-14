import './SearchBar.css';

const SearchBar = props => {
  const { className, placeholder, onChange } = props;
  return (
    <input
      className={`search-box ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      type='search'
      autoFocus
    />
  );
};

export default SearchBar;

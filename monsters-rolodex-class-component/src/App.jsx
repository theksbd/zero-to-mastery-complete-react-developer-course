import { Component } from 'react';
import CardList from './components/CardList/CardList';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchTerm: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => this.setState({ monsters: data }))
      .catch(err => console.log(err));
  }

  handleSearchChange = e => {
    const searchTerm = e.target.value.toLowerCase();
    this.setState({ searchTerm });
  };

  render() {
    const { monsters, searchTerm } = this.state;
    const { handleSearchChange } = this;

    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchTerm)
    );

    return (
      <div>
        <h1 className='app-title'>Monster Rolodex</h1>
        <SearchBar
          className='search-box'
          placeholder='Search Monsters'
          onChange={handleSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;

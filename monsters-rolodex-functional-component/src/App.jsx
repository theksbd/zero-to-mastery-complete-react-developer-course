import CardList from './components/CardList/CardList';
import SearchBar from './components/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setMonsters(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchTerm)
    );
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchTerm]);

  const handleSearchChange = e => {
    const searchTermString = e.target.value.toLowerCase();
    setSearchTerm(searchTermString);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>Monster Rolodex</h1>
      <SearchBar
        className='monster-search-box'
        placeholder='Search Monsters'
        onChange={handleSearchChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;

import './App.css';
import {useState} from 'react'
import ItemTable from './components/ItemTable.jsx';

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNewItem = () => {
    const name = prompt('Enter item name: ');
    const quantity = parseInt(prompt('Enter initial quantity: '));
    if (name && !isNaN(quantity) && !items.some(item => item.name.toLowerCase() === name.toLowerCase())) {
      const newItem = {id: crypto.randomUUID(), name, quantity};
      setItems([...items, newItem]);
    } else {
      alert('An error has occured while adding the new item to the inventory.');
    }
  }
  
  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='page-main-content'>
      <div className='filtering-tools'>
        <input placeholder='Search for an item' value={searchTerm} className='search' onChange={(e) => setSearchTerm(e.target.value)}/>
        <button className='button-new-item' onClick={handleNewItem}>+ New Item</button>
      </div>
      <ItemTable filteredItems={filteredItems} items={items} setItems={setItems}/>
    </div>
  );
}

export default App;

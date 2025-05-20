import './App.css';
import {useState, useEffect} from 'react'
import ItemTable from './components/ItemTable.jsx';
import NewItemButton from './components/NewItemButton.jsx';
import {collection, getDocs} from 'firebase/firestore';
import {db} from './config/firestore.js';
import InventoryStatistics from './components/InventoryStatistics.jsx';

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //Read data from database upon initial page load
  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, [])

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    const data = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    setItems(data);
  }

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='page-main-content'>
      <div className='filtering-tools'>
        <input placeholder='Search for an item' value={searchTerm} className='search' onChange={(e) => setSearchTerm(e.target.value)}/>
        <NewItemButton items={items} setItems={setItems}/>
      </div>
      <ItemTable filteredItems={filteredItems} items={items} setItems={setItems}/>
      <InventoryStatistics items={items}/>
    </div>
  );
}

export default App;

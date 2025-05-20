import '../App.css';
import {useState} from 'react'
import ItemTable from '../components/ItemTable.jsx';
import NewItemForm from '../components/NewItemForm.jsx';
import Navbar from '../components/Navbar.jsx';

export default function QuickAdd({items, setItems}) {
  const [itemName, setItemName] = useState('');
  const searchBar = document.getElementById('search-bar');
  const filteredItems = items.filter(item => item.name.toLowerCase().includes(itemName.toLowerCase()));

  const clearSearch = () => {
    setItemName('');
    searchBar.value = '';
  }

  var quickAddComponent;
  if (filteredItems.length > 0) {
    quickAddComponent = <ItemTable filteredItems={filteredItems} items={items} setItems={setItems} optionsComponent="QuickQuantityUpdateButtons"/>
  } else {
    quickAddComponent = 
    <>
      <p>Item not found. Please enter item information:</p>
      <NewItemForm items={items} setItems={setItems} startName={itemName}/>
    </>
  }

  return (
    <>
      <Navbar/>
      <div className='page-main-content'>
        <h1>Quick Add</h1>
        <p>Type the full name of a product in the area below. If the product is already in the inventory, options to increase the quantity will appear. If the product is not in the inventory, options to add a new item will appear.</p>
        <div className='flex-h'>
          <input placeholder='Enter Item Name' id='search-bar' value={itemName} className='search' onChange={(e) => setItemName(e.target.value)}/>
          <button onClick={clearSearch} className='clear'>Clear</button>
        </div>
        {quickAddComponent}
      </div>
    </>
  );
}
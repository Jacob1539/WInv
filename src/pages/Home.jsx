import '../App.css';
import {useState} from 'react'
import ItemTable from '../components/ItemTable.jsx';
import NewItemButton from '../components/NewItemButton.jsx';
import InventoryStatistics from '../components/InventoryStatistics.jsx';
import Navbar from '../components/Navbar.jsx';

export default function Home({items, setItems}) {
    const [searchTerm, setSearchTerm] = useState('');
    const searchBar = document.getElementById('search-bar');
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const clearSearch = () => {
        setSearchTerm('');
        searchBar.value = '';
    }

    return (
    <>
        <Navbar/>
        <div className='page-main-content'>
            <h1>Winv</h1>
            <p>Click on an item to manage it</p>
            <div className='flex-h'>
                <input placeholder='Search for an item' id='search-bar' value={searchTerm} className='search' onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={clearSearch} className='clear'>Clear</button>
                <NewItemButton items={items} setItems={setItems}/>
            </div>
            <ItemTable filteredItems={filteredItems} setItems={setItems}/>
            <InventoryStatistics items={items}/>
        </div>
    </>
    );
}
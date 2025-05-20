import '../App.css';
import {useState} from 'react'
import ItemTable from '../components/ItemTable.jsx';
import NewItemButton from '../components/NewItemButton.jsx';
import InventoryStatistics from '../components/InventoryStatistics.jsx';
import Navbar from '../components/Navbar.jsx';

export default function Home({items, setItems}) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
    <>
        <Navbar/>
        <div className='page-main-content'>
            <h1>Winv</h1>
            <h3>Inventory Management System</h3>
        <div className='filtering-tools'>
            <input placeholder='Search for an item' value={searchTerm} className='search' onChange={(e) => setSearchTerm(e.target.value)}/>
            <NewItemButton items={items} setItems={setItems}/>
        </div>
            <ItemTable filteredItems={filteredItems} optionsComponent="ItemDialog"/>
            <InventoryStatistics items={items}/>
        </div>
    </>
    );
}
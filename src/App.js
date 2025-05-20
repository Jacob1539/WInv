import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {db} from './config/firestore.js';
import {collection, getDocs} from 'firebase/firestore'
import Home from './pages/Home.jsx';
import QuickAdd from './pages/QuickAdd.jsx';

export default function App() {
  const [items, setItems] = useState([]);

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
  
  return(
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home items={items} setItems={setItems}/>}/>
        <Route path="/quick-add" element={<QuickAdd items={items} setItems={setItems}/>}/>
      </Routes>
    </HashRouter>
  )
}

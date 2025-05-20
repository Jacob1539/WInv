import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {db} from './config/firestore.js';
import {collection, onSnapshot} from 'firebase/firestore'
import Home from './pages/Home.jsx';
import QuickAdd from './pages/QuickAdd.jsx';

export default function App() {
  const [items, setItems] = useState([]);

  //Real time listeners
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "inventory"), (snapshot) => {
      const itemList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setItems(itemList);
    })

    return () => unsub();
  }, [])
  
  return(
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home items={items} setItems={setItems}/>}/>
        <Route path="/quick-add" element={<QuickAdd items={items} setItems={setItems}/>}/>
      </Routes>
    </HashRouter>
  )
}

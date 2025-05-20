import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../config/firestore.js';

export default function QuickQuantityUpdateButtons({item, setItems}) {
    //Note: for synchronization across devices, increment and decrement will increment the quantity stored in the database rather than the quantity shown on the client side
    const increment = async () => {
        const docRef = doc(db, "inventory", item.id);
        const docSnap = await getDoc(docRef);
        const initialQty = parseInt(docSnap.data().quantity); //get db quantity
        const incQty = initialQty + 1;
        updateDoc(docRef, {quantity:incQty}); //update db quantity
        setItems(items => items.map(i => i.id === item.id ? {...i, quantity: incQty} : i));
    }

    const setQuantity = async () => {
        const docRef = doc(db, "inventory", item.id);
        const newQty = prompt("Enter new quantity for " + item.name);
        if (isNaN(parseInt(newQty)) || newQty < 0) {
            alert("Error updating quantity.");
        } else {
            updateDoc(docRef, {quantity:newQty}); //update db quantity
            setItems(items => items.map(i => i.id === item.id ? {...i, quantity: parseInt(newQty)} : i));
        }
    }

    const addMultiple = async () => {
        const docRef = doc(db, "inventory", item.id);
        const docSnap = await getDoc(docRef);
        const initialQty = parseInt(docSnap.data().quantity); //get db quantity
        const addQty = parseInt(prompt("Enter quantity of " + item.name + " to add"));
        const newQty = initialQty + addQty;
        if (isNaN(parseInt(newQty)) || newQty < 0) {
            alert("Error updating quantity.");
        } else {
            updateDoc(docRef, {quantity:newQty}); //update db quantity
            setItems(items => items.map(i => i.id === item.id ? {...i, quantity: parseInt(newQty)} : i));
        }
    }

    return (
        <>
            <div>
                <button className='fl-center' onClick={setQuantity}>Update Qty</button>
                <button className='fl-center' onClick={increment}>Add 1</button>
                <button className='fl-center' onClick={addMultiple}>Add Multiple</button>
            </div>
        </>
    )
}
import {useRef} from 'react';
import {doc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import {db} from '../config/firestore.js';

export default function ItemDialog({item, setItems}) {
    const dialogRef = useRef(null);

    const handleDialogOpen = () => {
        dialogRef.current.showModal();
    }

    const handleDialogClose = () => {
        dialogRef.current.close();
    }

    //Note: for synchronization across devices, increment and decrement will increment the quantity stored in the database rather than the quantity shown on the client side
    const increment = async () => {
        const docRef = doc(db, "inventory", item.id);
        const docSnap = await getDoc(docRef);
        const initialQty = parseInt(docSnap.data().quantity); //get db quantity
        const incQty = initialQty + 1;
        updateDoc(docRef, {quantity:incQty}); //update db quantity
        setItems(items => items.map(i => i.id === item.id ? {...i, quantity: incQty} : i));
    }

    //Note: for synchronization across devices, increment and decrement will increment the quantity stored in the database rather than the quantity shown on the client side
    const decrement = async () => {
        const docRef = doc(db, "inventory", item.id);
        const docSnap = await getDoc(docRef);
        const initialQty = parseInt(docSnap.data().quantity); //get db quantity
        const decQty = initialQty - 1;
        if (decQty < 0) {
            alert("Error: Cannot decrement quantity past 0.");
        } else {
            updateDoc(docRef, {quantity:decQty}); //update db quantity
            setItems(items => items.map(i => i.id === item.id ? {...i, quantity: decQty} : i));
        }
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

    const setPrice = async () => {
        const docRef = doc(db, "inventory", item.id);
        const newPrice = prompt("Enter new price for " + item.name);
        if (isNaN(parseFloat(newPrice)) || newPrice < 0) {
            alert("Invalid price.");
        } else {
            updateDoc(docRef, {price:newPrice}); //update db quantity
            setItems(items => items.map(i => i.id === item.id ? {...i, price: newPrice} : i));
        }
    }

    const remove = async () => {
        await deleteDoc(doc(db, "inventory", item.id));
        setItems(items => items.filter(i => i.id !== item.id));
    }

    return (
        <>
            <button className='fl-center' onClick={handleDialogOpen}>Manage</button>
            <dialog ref={dialogRef} className='item-dialog'>
                <div className='item-dialog'>
                    <button className='fl-right' onClick={handleDialogClose}>X</button>
                </div>
                <div className='left-align'>
                    <h2>{item.name}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {isNaN(parseFloat(item.price)) ? "Unknown" : "$" + item.price}</p>
                    <details>
                        <summary>Advanced</summary>
                        <p>ID: {item.id}</p>
                    </details>
                </div>
                <div className='bottom-buttons'>
                    <button className='fl-left' onClick={decrement}>Subtract 1</button>
                    <button className='fl-left' onClick={increment}>Add 1</button>
                    <button className='fl-left' onClick={setQuantity}>Update Quantity</button>
                    <button className='fl-left' onClick={setPrice}>Update Price</button>
                    <button className='red fl-left' onClick={remove}>Remove Item</button>
                </div>
            </dialog>
        </>
    )
}
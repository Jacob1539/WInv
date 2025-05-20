import {doc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import {db} from '../config/firestore.js';
import IncrementButton from './IncrementButton.jsx';
import SetQuantityButton from './SetQuantityButton.jsx';
import SetPriceButton from './SetPriceButton.jsx';

export default function ItemDialog({item, setItems, handleDialogClose}) {
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
        }
    }

    const remove = async () => {
        await deleteDoc(doc(db, "inventory", item.id));
    }

    return (
        <>
            <div className='item-dialog'>
                <button className='fl-right' onClick={() => handleDialogClose(item.id)}>X</button>
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
                <button className='fl-left' onClick={decrement}>Remove 1</button>
                <IncrementButton item={item} stylePass='fl-left'/>
                <SetQuantityButton item={item} stylePass='fl-left'/>
                <SetPriceButton item={item} stylePass='fl-left'/>
                <button className='red fl-left' onClick={remove}>Remove Item</button>
            </div>
        </>
    )
}
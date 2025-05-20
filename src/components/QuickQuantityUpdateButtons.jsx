import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../config/firestore.js';
import IncrementButton from './IncrementButton.jsx';
import SetQuantityButton from './SetQuantityButton.jsx';

export default function QuickQuantityUpdateButtons({item, setItems}) {

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
        }
    }

    return (
        <>
            <div className='flex-v'>
                <IncrementButton item={item} stylePass='fl-center' />
                <button className='fl-center' onClick={addMultiple}>Add Multiple</button>
                <SetQuantityButton item={item} stylePass='fl-center' />
            </div>
        </>
    )
}
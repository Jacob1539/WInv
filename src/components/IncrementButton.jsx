import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../config/firestore.js';

export default function IncrementButton({item, stylePass}) {
    const increment = async () => {
        const docRef = doc(db, "inventory", item.id);
        const docSnap = await getDoc(docRef);
        const initialQty = parseInt(docSnap.data().quantity); //get db quantity
        const incQty = initialQty + 1;
        updateDoc(docRef, {quantity:incQty}); //update db quantity
    }

    return (
        <button onClick={increment} className={stylePass}>Add 1</button>
    )
}

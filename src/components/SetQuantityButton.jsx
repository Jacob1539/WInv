import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../config/firestore.js';
import {useRef, useState} from 'react';

export default function SetQuantityButton({item, stylePass}) {
    const dialogRef = useRef(null);
    const [newQty, setNewQty] = useState('');
    const handleDialogOpen = () => {
        dialogRef.current.showModal();
    }

    const handleDialogClose = () => {
        dialogRef.current.close();
        setNewQty('');
    }

    const handleNewQtySubmit = async () => {
        const docRef = doc(db, "inventory", item.id);
        if (isNaN(parseInt(newQty)) || newQty < 0) {
            alert("Error updating quantity.");
        } else {
            updateDoc(docRef, {quantity:newQty}); //update db quantity
        }
        setNewQty('');
        dialogRef.current.close();
    }

    return (
        <>
            <button onClick={handleDialogOpen} className={stylePass}>Set Quantity</button>
            <dialog className='mini-dialog' ref={dialogRef}>
                <div className='item-dialog'>
                    <button className='fl-right' onClick={() => handleDialogClose(item.id)}>X</button>
                </div>
                <div className='flex-v'>
                    <p className='fl-left'>Enter new quantity:</p>
                    <input type='number' className='fl-left' value={newQty} onChange={(e) => setNewQty(e.target.value)}></input>
                </div>
                <div className='bottom-buttons'>
                    <button className='st-center' onClick={handleNewQtySubmit}>Done</button>
                </div>
            </dialog>
        </>
    )
}

import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../config/firestore.js';
import {useRef, useState} from 'react';

export default function SetPriceButton({item, stylePass}) {
    const dialogRef = useRef(null);
    const [newPrice, setNewPrice] = useState('');
    const handleDialogOpen = () => {
        dialogRef.current.showModal();
    }

    const handleDialogClose = () => {
        dialogRef.current.close();
        setNewPrice('');
    }

    const handleNewPriceSubmit = async () => {
        const docRef = doc(db, "inventory", item.id);
        if (isNaN(parseFloat(newPrice)) || newPrice < 0) {
            alert("Invalid price.");
        } else {
            updateDoc(docRef, {price:newPrice}); //update db quantity
        }
        setNewPrice('');
        dialogRef.current.close();
    }

    return (
        <>
            <button onClick={handleDialogOpen} className={stylePass}>Set Price</button>
            <dialog className='mini-dialog' ref={dialogRef}>
                <div className='item-dialog'>
                    <button className='fl-right' onClick={() => handleDialogClose(item.id)}>X</button>
                </div>
                <div className='flex-v'>
                    <p className='fl-left'>Enter new price:</p>
                    <input type='number' className='fl-left' value={newPrice} onChange={(e) => setNewPrice(e.target.value)}></input>
                </div>
                <div className='bottom-buttons'>
                    <button className='st-center' onClick={handleNewPriceSubmit}>Done</button>
                </div>
            </dialog>
        </>
    )
}

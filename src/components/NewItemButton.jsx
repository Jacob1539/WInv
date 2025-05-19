import {useRef, useState} from 'react';
import {collection, addDoc} from 'firebase/firestore'; 
import {db} from '../config/firestore.js'

export default function NewItemButton({items, setItems}) {
    const dialogRef = useRef(null);
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemPrice, setItemPrice] = useState(0);
    const form = document.getElementById('new-item-form');

    const handleDialogOpen = () => {
        dialogRef.current.showModal();
    }

    const handleDialogClose = () => {
        dialogRef.current.close();
        form.reset();
    }


    const handleNewItem = async (e) => {
        e.preventDefault();
        dialogRef.current.close();
        if (itemName !== ('') && !items.some(item => item.name.toLowerCase() === itemName.toLowerCase())) {
            //add to database
            const docRef = await addDoc(collection(db, "inventory"), {
                name: itemName,
                quantity: itemQuantity,
                price: itemPrice
            }); //database will automatically assign id

            const newItem = {
                id: docRef.id, 
                name: itemName, 
                quantity: parseInt(itemQuantity), 
                price: itemPrice};
            setItems([...items, newItem]);
        } else {
            alert('An error has occured while adding the new item to the inventory.');
        }
        form.reset();
  }
    
    return (
        <>
            <button className='button-new-item' onClick={handleDialogOpen}>+ New Item</button>
            <dialog ref={dialogRef} className='item-dialog'>
                <button className='fl-right' onClick={handleDialogClose}>X</button>
                <h2 className='left-align'>New Item:</h2>
                <form id="new-item-form">
                    <table className='item-form'>
                        <tbody>
                            <tr className='item-form'>
                                <td>
                                    <label>Item Name</label>
                                    <input type="text" className='item-form' onChange={(e) => setItemName(e.target.value)} required></input>
                                </td>
                            </tr>
                            <tr className='item-form'>
                                <td>
                                    <label>Quantity</label>
                                    <input type="number" className='item-form' min='0' onChange={(e) => setItemQuantity(e.target.value)} required></input>
                                </td>
                            </tr>
                            <tr className='item-form'>
                                <td>
                                    <label>Price</label>
                                    <input type="number" className='item-form' min='0' step='.01' onChange={(e) => setItemPrice(e.target.value)}></input>
                                </td>
                            </tr>
                            <tr className='item-form'>
                                <td>
                                    <button type="submit" className='fl-center' onClick={handleNewItem}>Add Item</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </dialog>
        </>
    )
}
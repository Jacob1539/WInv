import {useEffect, useState} from 'react';
import {collection, addDoc} from 'firebase/firestore'; 
import {db} from '../config/firestore.js'

export default function NewItemForm({items, setItems, handleDialogClose, startName}) {
    const [itemName, setItemName] = useState(typeof startName === typeof undefined ? '' : startName);
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemPrice, setItemPrice] = useState(0);
    const form = document.getElementById('new-item-form');

    //Update startName whenever it changes, if this is an instance of NewItemForm where startName is defined
    useEffect(() => {
        if (typeof startName !== typeof undefined) {
            setItemName(startName);
        }
    }, [startName])

    const handleNewItem = async (e) => {
        e.preventDefault();
        if (typeof handleDialogClose !== typeof undefined) {
            handleDialogClose();
        }
        form.reset();
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
        <form id="new-item-form">
            <table className='item-form'>
                <tbody>
                    <tr className='item-form'>
                        <td>
                            <label>Item Name</label>
                            <input type="text" className='item-form' value={itemName} onChange={(e) => setItemName(e.target.value)} required></input>
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
                            <label>Price (optional)</label>
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
    )
    
}
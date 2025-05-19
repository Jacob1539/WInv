import {useRef} from 'react';

export default function ItemDialog({item, setItems}) {
    const dialogRef = useRef(null);

    const handleDialogOpen = () => {
        dialogRef.current.showModal();
    }

    const handleDialogClose = () => {
        dialogRef.current.close();
    }

    const increment = () => {
        const incQty = item.quantity + 1;
        setItems(items => items.map(i => i.id === item.id ? {...i, quantity: incQty} : i));
    }

    const decrement = () => {
        const decQty = item.quantity - 1;
        if (decQty < 0) {
            alert("Error: Cannot decrement quantity past 0.");
        } else {
            setItems(items => items.map(i => i.id === item.id ? {...i, quantity: decQty} : i));
        }
    }

    const setQuantity = () => {
        const newQty = prompt("Enter new quantity for " + item.name);
        if (isNaN(parseInt(newQty)) || newQty < 0) {
            alert("Error: Cannot decrement quantity past 0.");
        } else {
            setItems(items => items.map(i => i.id === item.id ? {...i, quantity: parseInt(newQty)} : i));
        }
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
                    <details>
                        <summary>Advanced</summary>
                        <p>ID: {item.id}</p>
                    </details>
                </div>
                <div className='bottom-buttons'>
                    <button className='fl-left' onClick={decrement}>Subtract 1</button>
                    <button className='fl-left' onClick={increment}>Add 1</button>
                    <button className='fl-left' onClick={setQuantity}>Update Quantity</button>
                </div>
            </dialog>
        </>
    )
}
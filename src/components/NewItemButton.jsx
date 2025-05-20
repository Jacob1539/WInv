import {useRef} from 'react';
import NewItemForm from './NewItemForm';

export default function NewItemButton({items, setItems}) {
    const dialogRef = useRef(null);

    const handleDialogClose = () => {
        dialogRef.current.close();
    }

    const handleDialogOpen = () => {
        dialogRef.current.showModal();
    }
    
    return (
        <>
            <button className='button-new-item' onClick={handleDialogOpen}>+ New Item</button>
            <dialog ref={dialogRef} className='item-dialog'>
                <button className='fl-right' onClick={handleDialogClose}>X</button>
                <h2 className='left-align'>New Item:</h2>
                <NewItemForm items={items} setItems={setItems} handleDialogClose={handleDialogClose}/>
            </dialog>
        </>
    )
}
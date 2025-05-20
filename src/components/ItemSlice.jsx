import {useRef} from 'react';
import ItemDialog from "./ItemDialog.jsx";
import QuickQuantityUpdateButtons from "./QuickQuantityUpdateButtons.jsx"

export default function ItemSlice({item, setItems, optionsComponent}) {
    //Manage opening the dialog
    const dialogRef = useRef(null);
    const handleDialogOpen = () => {
        dialogRef.current.showModal();
    }
    const handleDialogClose = () => {
        dialogRef.current.close();
    }

    //optionsComponent is a string containing the name of a component that can be in the third column
    var thirdCol = '';
    switch (optionsComponent) {
        case "QuickQuantityUpdateButtons":
            thirdCol = 
                <td className="small-cell">
                    <QuickQuantityUpdateButtons item={item} setItems={setItems}/>
                </td>
            break;
        default:
            break;
    }

    return (
        <>
            <tr key = {item.id}>
                <td className="large-cell" onClick={() => handleDialogOpen()}>{item.name}</td>
                <td className="small-cell" onClick={() => handleDialogOpen()}>{item.quantity}</td>
                {thirdCol}
            </tr>
            <dialog ref={dialogRef} className='item-dialog'>
                <ItemDialog item={item} setItems={setItems} ref={dialogRef} handleDialogClose={handleDialogClose}/>
            </dialog>
        </>
    )
}
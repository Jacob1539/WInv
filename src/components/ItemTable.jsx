import {useRef} from 'react';
import ItemSlice from './ItemSlice.jsx';
import ItemDialog from './ItemDialog.jsx';

export default function ItemTable({filteredItems, setItems, optionsComponent}) {
    //Manage opening the dialog
    const dialogRefs = useRef({});
    const handleDialogOpen = (id) => {
        dialogRefs.current[id]?.showModal();
    }
    const handleDialogClose = (id) => {
        dialogRefs.current[id]?.close();
    }

    //determine which component to put in the optional third column
    var thirdColumnHead = '';
    if (typeof optionsComponent !== typeof undefined) {
        thirdColumnHead = <th className='small-cell'>Options</th>;
    }

    return (
        <>
            <table id='item-table'>
                <thead>
                    <tr>
                    <th className='large-cell'>Item Name</th>
                    <th className='small-cell'>Quantity</th>
                    {thirdColumnHead}
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item) => (
                    <ItemSlice key={item.id} item={item} setItems={setItems} optionsComponent={optionsComponent} handleDialogOpen={handleDialogOpen}/>
                    ))}
                </tbody>
            </table>
            {filteredItems.map((item) => (
                <dialog ref={(el) => dialogRefs.current[item.id] = el} key={item.id} className='item-dialog'>
                    <ItemDialog item={item} setItems={setItems} handleDialogClose={handleDialogClose}/>
                </dialog>
            ))}
        </>
    )
}
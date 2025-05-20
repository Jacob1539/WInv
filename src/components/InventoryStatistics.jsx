import {useRef} from 'react';

export default function InventoryStatistics({items}) {
    const dialogRef = useRef(null);

    const handleDialogOpen = () => {
        dialogRef.current.showModal();
    }

    const handleDialogClose = () => {
        dialogRef.current.close();
    }
    
    var itemsInInv = 0, itemsWithoutPrice = 0, totalCost = 0, unitsInInv = 0, unitsWithoutPrice = 0;
    //perform calculations
    items.forEach((element) => {
        itemsInInv++;
        const qty = parseInt(element.quantity);
        if (isNaN(parseFloat(element.price))) {
            itemsWithoutPrice++;
            unitsWithoutPrice += qty;
        } else {
            totalCost += (qty * parseFloat(element.price));
            //fix totalCost rounding
            totalCost = (parseFloat(totalCost)).toFixed(2);
        }
        unitsInInv += qty;
    })

    //Make disclaimer about items without price visible only if there are items without a defined price
    var noPriceDisclaimer = '';
    if (itemsWithoutPrice > 0) {
        noPriceDisclaimer = <p>Inventory value excludes {itemsWithoutPrice} items ({unitsWithoutPrice} units) without a defined price.</p>
    }

    return (
        <>
            <button className='fl-center' onClick={handleDialogOpen}>View Inventory Statistics</button>
            <dialog ref={dialogRef} className='item-dialog'>
                <div className='item-dialog'>
                    <button className='fl-right' onClick={handleDialogClose}>X</button>
                </div>
                <div className='left-align'>
                    <h2>Inventory Statistics:</h2>
                    <p>Items in inventory: {itemsInInv}</p>
                    <p>Units in inventory: {unitsInInv}</p>
                    <p>Value of inventory: ${totalCost}</p>
                    {noPriceDisclaimer}
                </div>
            </dialog>
        </>
    )
}
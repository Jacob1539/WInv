import ItemSlice from './ItemSlice';

export default function ItemTable({filteredItems, setItems, optionsComponent}) {
    //determine which component to put in the optional third column
    var thirdColumnHead = '';
    if (typeof optionsComponent !== typeof undefined) {
        thirdColumnHead = <th className='small-cell'>Options</th>;
    }
    return (
        <table>
            <thead>
                <tr>
                <th className='large-cell'>Item Name</th>
                <th className='small-cell'>Quantity</th>
                {thirdColumnHead}
                </tr>
            </thead>
            <tbody>
                {filteredItems.map((item) => (
                <ItemSlice key={item.id} item={item} setItems={setItems} optionsComponent={optionsComponent}/>
                ))}
            </tbody>
        </table>
    )
}
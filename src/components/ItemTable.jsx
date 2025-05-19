import ItemSlice from './ItemSlice';

export default function ItemTable({filteredItems, setItems}) {
    console.log(filteredItems);
    return (
        <table className='item-results-list'>
            <thead>
                <tr>
                <th className='large-cell'>Item Name</th>
                <th className='small-cell'>Quantity</th>
                <th className='small-cell'>Options</th>
                </tr>
            </thead>
            <tbody>
                {filteredItems.map((item) => (
                <ItemSlice key={item.id} item={item} setItems={setItems}/>
                ))}
            </tbody>
        </table>
    )
}
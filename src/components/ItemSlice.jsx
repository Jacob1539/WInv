import ItemDialog from "./ItemDialog.jsx";

export default function ItemSlice({item, setItems}) {
    return (
        <tr key = {item.id}>
            <td className="large-cell">{item.name}</td>
            <td className="small-cell">{item.quantity}</td>
            <td className="small-cell">
                <div>
                    <ItemDialog item={item} setItems={setItems}/>
                </div>
            </td>
        </tr>
    )
}
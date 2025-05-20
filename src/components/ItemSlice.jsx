import ItemDialog from "./ItemDialog.jsx";
import QuickQuantityUpdateButtons from "./QuickQuantityUpdateButtons.jsx"

export default function ItemSlice({item, setItems, optionsComponent}) {
    //optionsComponent is a string containing the name of a component that can be in the options box (either ItemDialog or QuickQuantityUpdateButtons)
    const option = (optionsComponent === "ItemDialog" ? <ItemDialog item={item} setItems={setItems}/> : <QuickQuantityUpdateButtons item={item} setItems={setItems}/>)
    
    return (
        <tr key = {item.id}>
            <td className="large-cell">{item.name}</td>
            <td className="small-cell">{item.quantity}</td>
            <td className="small-cell">
                <div>
                    {option}
                </div>
            </td>
        </tr>
    )
}
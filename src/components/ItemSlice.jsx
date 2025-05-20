import QuickQuantityUpdateButtons from "./QuickQuantityUpdateButtons.jsx"

export default function ItemSlice({item, setItems, optionsComponent, handleDialogOpen}) {
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
                <td className="large-cell" onClick={() => handleDialogOpen(item.id)}>{item.name}</td>
                <td className="small-cell" onClick={() => handleDialogOpen(item.id)}>{item.quantity}</td>
                {thirdCol}      
            </tr>
        </>
    )
}
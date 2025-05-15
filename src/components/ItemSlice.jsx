export default function ItemSlice({item, setItems}) {

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

    return (
        <tr key = {item.id}>
            <td className="large-cell">{item.name}</td>
            <td className="small-cell">{item.quantity}</td>
            <td className="small-cell">
                <div>
                    <button className="incdec" onClick={() => increment()}>+ Add 1</button>
                    <button className="incdec" onClick={() => decrement()}>- Subtract 1</button>
                </div>
            </td>
        </tr>
    )
}
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllItems } from "../../managers/ItemManager"
import { Item } from "./Item"

export const ItemList = () => {

    const [items, setItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllItems()
            .then(setItems)
    }, []
    )

    return (
        <>
            <h2 className="title mx-4">Item List</h2>
            <button className="button is-info mb-4 mx-4" onClick={event => { navigate("new") }}>Create New Item</button>

            <article className="columns is-multiline mx-4">
                {
                    items.map(item => <Item key={`item--${item.id}`}
                        item={item}
                    />
                    )
                }
            </article>
        </>
    )
}

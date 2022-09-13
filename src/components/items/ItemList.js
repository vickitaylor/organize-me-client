import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllItems } from "../../managers/ItemManager"


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
        <button onClick={event => {navigate("new")}}>Create New Item</button>
        <article>
            {
                items.map(item => {
                    return <section key={`item--${item.id}`} className="item">
                        <Link to={`${item.id}`}>{item.name}</Link>
                    </section>
                })
            }
        </article>
        </>
    )
}

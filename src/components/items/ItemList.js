import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllItems, getSearchItems } from "../../managers/ItemManager"
import { Item } from "./Item"

export const ItemList = () => {

    const [items, setItems] = useState([])
    const navigate = useNavigate()
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredItems, setFiltered] = useState([])

    useEffect(() => {
        getAllItems()
            .then(setItems)
    }, []
    )

    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchItems(searchTerms).then(data => setFiltered(data))
            }
            else {
                setFiltered(items)
            }
        },
        [searchTerms, items]
    )

    return (
        <>
            <h2 className="title mx-4">Item List</h2>
            <button className="button is-info mb-4 mx-4" onClick={event => { navigate("new") }}>Create New Item</button>

            <div className="px-4 pb-4">
                <input
                    className="input search"
                    type="text"
                    placeholder="Search Items"
                    onChange={
                        (changeEvent) => {
                            let search = changeEvent.target.value
                            setSearchTerms(search)
                        }
                    }
                />
            </div>

            <article className="columns is-multiline mx-4">
                {
                    filteredItems.map(item => <Item key={`item--${item.id}`}
                        item={item}
                    />
                    )
                }
            </article>

        </>
    )
}

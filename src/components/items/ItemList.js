import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllItems, getItemsByCategory, getSearchItems } from "../../managers/ItemManager"
import { Item } from "./Item"

export const ItemList = () => {

    const [items, setItems] = useState([])
    const navigate = useNavigate()
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredItems, setFiltered] = useState([])
    const [categories, setCategories] = useState([])
    const [chosenCat, setChosenCategory] = useState(0)

    useEffect(() => {
        getAllItems()
            .then(setItems)
        getAllCategories()
            .then(setCategories)
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

    useEffect(
        () => {
            if (chosenCat === 0) {
                setFiltered(items)
            }
            else {
                getItemsByCategory(chosenCat)
                    .then((data) => {
                        setFiltered(data)
                    })
            }
        },
        [chosenCat, items]
    )

    return (
        <>
            <h2 className="title mx-4">Item List</h2>
            <div>
                <button className="button is-info mb-4 mx-4" onClick={event => { navigate("new") }}>Create New Item</button>
                <button className="button is-info mb-4 mx-4" onClick={event => { navigate(`/categories`) }}>Create New Category</button>
                <button className="button is-info mb-4 mx-4" onClick={event => { navigate(`/statuses`) }}>Create New Status</button>
            </div>

            <div className="px-4 pb-4 has-text-right">
                <input
                    className="input search mx-4"
                    type="text"
                    placeholder="Search Items"
                    onChange={
                        (changeEvent) => {
                            let search = changeEvent.target.value
                            setSearchTerms(search)
                        }
                    }
                />
                <div className="select">
                    <select onChange={(event) => {
                        let chosenCategory = event.target.value
                        setChosenCategory(parseInt(chosenCategory))
                    }}>
                        <option value="0">Filter by Category...</option>
                        {categories.map(category => {
                            return <option value={`${category.id}`} key={`category--${category.id}`}>{category.name}</option>
                        })}
                    </select>
                </div>
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

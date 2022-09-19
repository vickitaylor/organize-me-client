import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { createItem } from "../../managers/ItemManager"

export const ItemForm = () => {
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])

    const [item, setItem] = useState({
        name: "",
        picture: "",
        description: "",
        category: 0
    })

    const changeItemState = (event) => {
        const itemCopy = { ...item }
        itemCopy[event.target.name] = event.target.value
        setItem(itemCopy)
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createItemImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is ", base64ImageString);
            const copy = { ...item }
            copy.picture = base64ImageString
            setItem(copy)
        })
    }

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
    }, [])

    return (
        <section className="section">

            <article className="panel has-background-info-light">
                <h2 className="panel-heading has-background-info has-text-white">Create A New Item</h2>
                <article className="p-3">

                    <fieldset>
                        <div className="">
                            <label htmlFor="name" className="label">Item Name:</label>
                            <input type="text" name="name" required autoFocus className=" input" value={item.name}
                                onChange={changeItemState} />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="">
                            <label htmlFor="description" className="label">Item Description:</label>
                            <textarea type="text" name="description" required className=" input" value={item.description}
                                onChange={changeItemState} />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="">
                            <label className="label" htmlFor="category">Choose a Category:</label>
                            <div className="select">

                                <select className=" select" name="category" value={item.category} required onChange={changeItemState}>
                                    <option value="0">Categories:</option>
                                    {categories.map(category => {
                                        return <option value={category.id} key={`category--${category.id}`}>{category.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="picture" className="label">Upload Your Item Picture:</label>
                        <input type="file" id="picture" onChange={createItemImageString} />
                        <input type="hidden" name="picture" value={item.picture} />
                    </fieldset>

                    <button className="button is-info mr-3" type="submit" onClick={event => {
                        event.preventDefault()
                        const newItem = {
                            name: item.name,
                            picture: item.picture,
                            description: item.description,
                            category: parseInt(item.category)
                        }
                        createItem(newItem)
                            .then((req) => navigate(`/items/${req.id}`))
                    }}>Create Item</button>

                    <button className="button is-info is-inverted" onClick={() => navigate(`/items`)}>
                        Cancel
                    </button>

                </article>
            </article>
        </section >
    )
}

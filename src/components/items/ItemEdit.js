import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editItem, getSingleItem } from "../../managers/ItemManager"
import { getAllCategories } from "../../managers/CategoryManager"


export const ItemEdit = () => {
    const navigate = useNavigate()
    const { itemId } = useParams()
    const [categories, setCategories] = useState([])

    const [updateItem, setUpdateItem] = useState({})

    useEffect(() => {
        getSingleItem(itemId)
            .then((res) => {
                let item = {
                    name: res.name,
                    picture: res.picture,
                    description: res.description,
                    category: res.category
                }
                setUpdateItem(item)
            })
    }, [itemId]
    )

    const changeItemState = (event) => {
        const itemCopy = { ...updateItem }
        itemCopy[event.target.name] = event.target.value
        setUpdateItem(itemCopy)
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createItemImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is ", base64ImageString);
            const copy = { ...updateItem }
            copy.picture = base64ImageString
            setUpdateItem(copy)
        })
    }

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
    }, [])

    return (
        <>
            <section className="section">

                <article className="panel has-background-info-light">
                    <h2 className="panel-heading has-background-info has-text-white">Edit Item</h2>
                    <article className="p-3">

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="name" className="label">Item Name:</label>
                                <input type="text" name="name" required autoFocus className="input" value={updateItem.name}
                                    onChange={changeItemState} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description" className="label">Item Description:</label>
                                <textarea type="text" name="description" required className="textarea" value={updateItem.description}
                                    onChange={changeItemState} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <label className="label" htmlFor="category">Category:</label>
                            <div className="select">
                                <select name="category" value={updateItem.category?.id} required onChange={changeItemState}>
                                    <option value="0">Choose Category:</option>
                                    {categories.map(category => {
                                        return <option value={category.id} key={`category--${category.id}`}>{category.name}</option>
                                    })}
                                </select>
                            </div>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="picture" className="label">Upload Your Item Picture:</label>
                            <input type="file" id="picture" onChange={createItemImageString} />
                            <input type="hidden" name="picture" value={updateItem.picture} />
                        </fieldset>

                        <button className="button is-info mr-3" type="submit" onClick={event => {
                            event.preventDefault()
                            const updatedItem = {
                                name: updateItem.name,
                                picture: updateItem.picture,
                                description: updateItem.description,
                                category: parseInt(updateItem.category)
                            }
                            editItem(itemId, updatedItem)
                                .then(() => navigate(`/items/${itemId}`))
                        }}>Edit Item</button>

                        <button className="button is-info is-inverted" onClick={() => navigate(`/items`)}>
                            Cancel
                        </button>
                    </article>
                </article>
            </section>
        </>
    )
}
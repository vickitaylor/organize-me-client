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
        <form>
            <h2>Create A New Item</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name" className="label">Item Name:</label>
                    <input type="text" name="name" required autoFocus className="form-control" value={item.name}
                        onChange={changeItemState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description" className="label">Item Description:</label>
                    <textarea type="text" name="description" required className="form-control" value={item.description}
                        onChange={changeItemState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label className="label" htmlFor="category">Category:</label>
                    <select className="form-control" name="category" value={item.category} required onChange={changeItemState}>
                        <option value="0">Choose Category:</option>
                        {categories.map(category => {
                            return <option value={category.id} key={`category--${category.id}`}>{category.name}</option>
                        })}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <label htmlFor="picture" className="label">Upload Your Item Picture:</label><br />
                <input type="file" id="picture" onChange={createItemImageString} />
                <input type="hidden" name="picture" value={item.picture} />
            </fieldset>

            <button type="submit" onClick={event => {
                event.preventDefault()
                const newItem = {
                    name: item.name,
                    picture: item.picture,
                    description: item.description,
                    category: parseInt(item.category)
                }
                createItem(newItem)
                    .then(() => navigate("/items"))
            }}>Create Item</button>
            <button onClick={() => navigate(`/rooms`)}>
                Cancel
            </button>
        </form>
    )
}

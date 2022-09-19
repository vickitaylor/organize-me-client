import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createCategory } from "../../managers/CategoryManager"

export const CategoryForm = () => {
    const navigate = useNavigate()

    const [category, setCategory] = useState({
        name: ""
    })

    const changeState = (event) => {
        const copy = { ...category }
        copy[event.target.name] = event.target.value
        setCategory(copy)
    }
    return (
        <section className="section">

            <article className="panel has-background-info-light">
                <h2 className="panel-heading has-background-info has-text-white">Create A Category</h2>
                <article className="p-3">

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name" className="label">Category Name:</label>
                            <input type="text" name="name" required autoFocus className="form-control input" value={category.name}
                                onChange={changeState} />
                        </div>
                    </fieldset>



                    <button className="button is-info mr-3" type="submit" onClick={event => {
                        event.preventDefault()
                        const cat = {
                            name: category.name
                        }
                        createCategory(cat)
                            .then(() => navigate("/items"))
                    }}>Create Category</button>

                    <button className="button is-info is-inverted" onClick={() => navigate(`/items`)}>
                        Cancel
                    </button>

                </article>
            </article>
        </section>
    )
}
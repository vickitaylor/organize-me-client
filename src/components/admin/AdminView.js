import { useState } from "react"
import { createCategory } from "../../managers/CategoryManager"
import { createStatus } from "../../managers/ItemStatusManager"

export const AdminView = () => {

    const [category, setCategory] = useState({
        name: ""
    })

    const [status, setStatus] = useState({
        title: ""
    })

    const changeState = (event) => {
        const copy = { ...category }
        copy[event.target.name] = event.target.value
        setCategory(copy)
    }

    const changeStatusState = (event) => {
        const copy = { ...category }
        copy[event.target.name] = event.target.value
        setStatus(copy)
    }
    return (
        <>
            <h2 className="title mx-4">Admin</h2>
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
                                .then(() => setCategory({ name: "" }))
                        }}>Create Category</button>

                    </article>
                </article>
            </section>

            <section className="section">

                <article className="panel has-background-info-light">
                    <h2 className="panel-heading has-background-info has-text-white">Create A Status</h2>
                    <article className="p-3">

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="title" className="label">Status Title:</label>
                                <input type="text" name="title" required autoFocus className="form-control input" value={status.title}
                                    onChange={changeStatusState} />
                            </div>
                        </fieldset>

                        <button className="button is-info mr-3" type="submit" onClick={event => {
                            event.preventDefault()
                            const newStatus = {
                                title: status.title
                            }
                            createStatus(newStatus)
                                .then(() => setStatus({ title: "" }))
                        }}>Create Status</button>

                    </article>
                </article>
            </section>
        </>
    )
}

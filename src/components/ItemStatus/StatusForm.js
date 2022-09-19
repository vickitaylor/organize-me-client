import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createStatus } from "../../managers/ItemStatusManager"

export const StatusForm = () => {
    const navigate = useNavigate()

    const [status, setStatus] = useState({
        title: ""
    })

    const changeState = (event) => {
        const copy = { ...status }
        copy[event.target.name] = event.target.value
        setStatus(copy)
    }
    return (
        <section className="section">

            <article className="panel has-background-info-light">
                <h2 className="panel-heading has-background-info has-text-white">Create A Status</h2>
                <article className="p-3">

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="title" className="label">Status Title:</label>
                            <input type="text" name="title" required autoFocus className="form-control input" value={status.title}
                                onChange={changeState} />
                        </div>
                    </fieldset>



                    <button className="button is-info mr-3" type="submit" onClick={event => {
                        event.preventDefault()
                        const newStatus = {
                            title: status.title
                        }
                        createStatus(newStatus)
                            .then(() => navigate("/items"))
                    }}>Create Status</button>

                    <button className="button is-info is-inverted" onClick={() => navigate(`/items`)}>
                        Cancel
                    </button>

                </article>
            </article>
        </section>
    )
}
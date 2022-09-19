import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editEvent, getSingleEvent } from "../../managers/EventManager"


export const EventEdit = () => {
    const navigate = useNavigate()

    const { eventId } = useParams()

    const [updateEvent, setUpdateEvent] = useState({})

    useEffect(() => {
        getSingleEvent(eventId)
            .then((res) => {
                let task = {
                    title: res.title,
                    date: res.date,
                    time: res.time
                }
                setUpdateEvent(task)
            })
    }, [eventId]
    )

    const changeEventState = (evt) => {
        const copy = { ...updateEvent }
        copy[evt.target.name] = evt.target.value
        setUpdateEvent(copy)
    }

    return (
        <>
            <section className="section">
                <article className="panel has-background-info-light">
                    <h2 className="panel-heading has-background-info has-text-white">Edit {updateEvent.title}</h2>
                    <article className="p-3">

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="title" className="label">Event Name:</label>
                                <input type="text" name="title" required autoFocus className="form-control input" value={updateEvent.title}
                                    onChange={changeEventState} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="date" className="label">Event Date:</label>
                                <input type="date" name="date" required className="form-control input" value={updateEvent.date}
                                    onChange={changeEventState} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="time" className="label">Event Time:</label>
                                <input type="time" name="time" required className="form-control input" value={updateEvent.time}
                                    onChange={changeEventState} />
                            </div>
                        </fieldset>

                        <button className="button is-info mr-3" type="submit" onClick={evt => {
                            evt.preventDefault()

                            const copyEvent = {
                                title: updateEvent.title,
                                date: updateEvent.date,
                                time: updateEvent.time
                            }
                            editEvent(eventId, copyEvent)
                                .then(() => navigate(`/events`))
                        }}>Update</button>

                        <button className="button is-info is-inverted" onClick={() => navigate(`/events`)}>
                            Cancel
                        </button>

                    </article>
                </article>
            </section>
        </>
    )
}



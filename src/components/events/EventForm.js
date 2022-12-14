import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { newEvent } from "../../managers/EventManager"


export const EventForm = () => {
    const navigate = useNavigate()

    const [eventState, setEvent] = useState({
        title: "",
        date: "",
        time: ""
    })

    const changeEventState = (evt) => {
        const copy = { ...eventState }
        copy[evt.target.name] = evt.target.value
        setEvent(copy)
    }

    return (

        <section className="section">

            <article className="panel has-background-info-light">
                <h2 className="panel-heading has-background-info has-text-white">Create A New Event</h2>
                <article className="p-3">

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="title" className="label">Event Name:</label>
                            <input type="text" name="title" required autoFocus className="form-control input" value={eventState.title}
                                onChange={changeEventState} />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="date" className="label">Event Date:</label>
                            <input type="date" name="date" required className="form-control input" value={eventState.date}
                                onChange={changeEventState} />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="time" className="label">Event Time:</label>
                            <input type="time" name="time" required className="form-control input" value={eventState.time}
                                onChange={changeEventState} />
                        </div>
                    </fieldset>

                    <button className="button is-info mr-3" type="submit" onClick={evt => {
                        evt.preventDefault()

                        const copyEvent = {
                            title: eventState.title,
                            date: eventState.date,
                            time: eventState.time
                        }
                        newEvent(copyEvent)
                            .then(() => navigate(`/events`))
                    }}>Create Event</button>

                    <button className="button is-info is-inverted" onClick={() => navigate(`/events`)}>
                        Cancel
                    </button>


                </article>
            </article>

        </section >
    )
}
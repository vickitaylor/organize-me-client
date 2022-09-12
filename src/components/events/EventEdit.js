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
            <form>
                <h2>Edit: {updateEvent.title}</h2>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title" className="label">Event Name:</label>
                        <input type="text" name="title" required autoFocus className="form-control" value={updateEvent.title}
                            onChange={changeEventState} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date" className="label">Event Date:</label>
                        <input type="date" name="date" required className="form-control" value={updateEvent.date}
                            onChange={changeEventState} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="time" className="label">Event Time:</label>
                        <input type="time" name="time" required className="form-control" value={updateEvent.time}
                            onChange={changeEventState} />
                    </div>
                </fieldset>

                <button type="submit" onClick={evt => {
                    evt.preventDefault()

                    const copyEvent = {
                        title: updateEvent.title,
                        date: updateEvent.date,
                        time: updateEvent.time
                    }
                    editEvent(eventId, copyEvent)
                        .then(() => navigate(`/events`))
                }}>Update</button>

                <button onClick={() => navigate(`/events`)}>
                    Cancel
                </button>

            </form>
        </>
    )
}
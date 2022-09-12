import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteEvent, getCurrentUserEvents } from "../../managers/EventManager"
import "./Event.css"

export const EventList = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    const loadEvents = () => {
        getCurrentUserEvents()
            .then(data => setEvents(data))
    }

    useEffect(() => {
        loadEvents()
    }, [])

    const handleDelete = (id) => {
        deleteEvent(id).then(loadEvents)
    }

    return (
        <>
            <h2>My Events</h2>

            <button onClick={(() => navigate(`new`))}>New Event</button>
            <article>
                {
                    events.map(event => {
                        return <section key={`event--${event.id}`} className="event">
                            <ul>
                                <Link to={`edit/${event.id}`}><li className="event_list">Event: {event.title}</li></Link>
                                <li className="event_list">Date: {event.readable_date} at {event.readable_time}</li>
                                <button className="del-btn" onClick={() => {
                                    const confirmBox = window.confirm("Do you want to delete this event?")
                                    if (confirmBox)
                                        handleDelete(event.id)
                                }}> ❎</button>
                            </ul>
                        </section>
                    })
                }
            </article >
        </>
    )
}



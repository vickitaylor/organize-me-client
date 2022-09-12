import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCurrentUserEvents } from "../../managers/EventManager"
import "./Event.css"

export const EventList = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    useEffect(() => {
        getCurrentUserEvents()
            .then(setEvents)
    }, [])

    return (
        <>
            <h2>My Events</h2>

            <button onClick={(()=> navigate(`new`))}>New Event</button>
            <article>
                {
                    events.map(event => {
                        return <section key={`event--${event.id}`} className="event">
                            <ul>
                                <Link to={`edit/${event.id}`}><li className="event_list">Event: {event.title}</li></Link>
                                <li className="event_list">Date: {event.readable_date} at {event.readable_time}</li>
                            </ul>
                        </section>
                    })
                }
            </article>
        </>
    )
}
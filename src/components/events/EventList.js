import { useEffect, useState } from "react"
import { getCurrentUserEvents } from "../../managers/EventManager"
import "./Event.css"

export const EventList = () => {

    const [events, setEvents] = useState([])

    useEffect(() => {
        getCurrentUserEvents()
            .then(setEvents)
    }, [])

    const convertTime = (time) => {
        const timeArr = time.split(":")
        
        if (timeArr[0] === 0) {
            return `12:${timeArr[1]} AM`
        } else if (timeArr[0] < 12) {
            return `${timeArr[0]}:${timeArr[1]} AM`
        } else if (timeArr[0] === "12") {
            return `${timeArr[0]}:${timeArr[1]} PM`
        } else {
            return `${timeArr[0]- 12}:${timeArr[1]} PM`
        }
    }

    return (
        <>
            <h2>My Events</h2>

            <article>
                {
                    events.map(event => {
                        return <section key={`event--${event.id}`} className="event">
                            <ul>
                                <li className="event_list">Event: {event.title}</li>
                                <li className="event_list">Date: {new Date(event.date).toLocaleDateString('en-US', { timeZone: 'UTC'})} at {convertTime(event.time)}</li>
                            </ul>
                        </section>
                    })
                }
            </article>
        </>
    )
}
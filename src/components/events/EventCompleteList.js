import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUserEvents, getSearchEvents } from "../../managers/EventManager"


export const EventCompleteList = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredEvents, setFiltered] = useState([])

    useEffect(() => {
        getCurrentUserEvents()
            .then(setEvents)
    }, [])

    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchEvents(searchTerms).then(data => setFiltered(data))
            }
            else {
                setFiltered(events)
            }
        },
        [searchTerms, events]
    )

    return (
        <>
            <h2 className="title is-2 is-spaced mx-4 pt-2">My Events</h2>

            <button className="button is-info mx-4" onClick={(() => navigate(`/events/new`))}>New Event</button>
            <button className="button is-info mx-4" onClick={(() => navigate(`/events`))}>Events</button>

            <div className="pt-4 px-4">
                <input
                    className="input search"
                    type="text"
                    placeholder="Search Events"
                    onChange={
                        (changeEvent) => {
                            let search = changeEvent.target.value
                            setSearchTerms(search)
                        }
                    }
                />
            </div>

            <article className="section">
                {
                    filteredEvents.map(event => {
                        return <section key={`event--${event.id}`}>
                            {
                                (event.completed)
                                    ? <ul >
                                        <li className="event_list">{event.title} </li>
                                        <li className="event_list">Date: {event.readable_date} at {event.readable_time}</li>
                                        <br />
                                    </ul>
                                    : ""
                            }

                        </section>
                    })
                }
            </article >
        </>
    )
}



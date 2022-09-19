import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, getCurrentUserEvents, completeEvent, getSearchEvents } from "../../managers/EventManager"
import Icon from '@mdi/react'
import { mdiTrashCanOutline } from '@mdi/js';
import { mdiCheckCircle } from '@mdi/js';
import { mdiCalendarEditOutline } from '@mdi/js';


export const EventList = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredEvents, setFiltered] = useState([])

    const loadEvents = () => {
        getCurrentUserEvents()
            .then(data => setEvents(data))
    }

    useEffect(() => {
        loadEvents()
    }, [])

    const render = () => {
        getCurrentUserEvents().then(setEvents)
    }

    const handleDelete = (id) => {
        deleteEvent(id).then(loadEvents)
    }

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

            <button className="button is-info mx-4" onClick={(() => navigate(`new`))}>New Event</button>
            
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
                        return <section key={`event--${event.id}`} className="event">
                            {
                                (event.completed !== true)
                                    ? <ul >
                                        <li className="event_list">{event.title} </li>
                                        <li className="event_list">Date: {event.readable_date} at {event.readable_time}</li>


                                        <div>
                                            <button className="del-btn icon-text has-text-success" onClick={evt => {
                                                evt.preventDefault()
                                                completeEvent(`${event.id}`)
                                                    .then(() => render())
                                            }}>
                                                <Icon path={mdiCheckCircle}
                                                    title="check-circle"
                                                    size={1}
                                                />
                                            </button>

                                            <button className="del-btn icon-text has-text-link-dark" onClick={() => navigate(`edit/${event.id}`)}>
                                                <Icon path={mdiCalendarEditOutline}
                                                    title="calendar-edit-outline"
                                                    size={1}
                                                />
                                            </button>

                                            <button className="del-btn icon-text" onClick={() => {
                                                const confirmBox = window.confirm("Do you want to delete this event?")
                                                if (confirmBox)
                                                    handleDelete(event.id)
                                            }}>
                                                <Icon path={mdiTrashCanOutline}
                                                    title="trash-can-outline"
                                                    size={1}
                                                    color="red" />
                                            </button>
                                        </div> <br />
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



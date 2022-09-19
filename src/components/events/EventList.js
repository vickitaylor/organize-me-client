import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, getCurrentUserEvents } from "../../managers/EventManager"
import Icon from '@mdi/react'
import { mdiTrashCanOutline } from '@mdi/js';
import { mdiCheckCircle } from '@mdi/js';
import { mdiCalendarEditOutline } from '@mdi/js';


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
            <h2 className="title is-2 is-spaced mx-4 pt-2">My Events</h2>

            <button className="button is-info mx-4" onClick={(() => navigate(`new`))}>New Event</button>
            <article className="section">
                {
                    events.map(event => {
                        return <section key={`event--${event.id}`} className="event">
                            <ul >
                                <li className="event_list">{event.title} </li>
                                <li className="event_list">Date: {event.readable_date} at {event.readable_time}</li>


                                <div>
                                    <button className="del-btn icon-text has-text-success" onClick={() => { }}>
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
                        </section>
                    })
                }
            </article >
        </>
    )
}



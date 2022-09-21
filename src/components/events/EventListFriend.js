import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getFriendEvents, completeEvent } from "../../managers/EventManager"

export const EventListFriend = () => {
    const { userId } = useParams()
    const [events, setEvents] = useState([])


    useEffect(() => {
        getFriendEvents(userId)
            .then(setEvents)
    },
        [userId]
    )

    const render = () => {
        getFriendEvents(userId).then(setEvents)
    }


    return (
        <>
            <h2 className="title is-2 is-spaced mx-4 pt-2">Friend's Events</h2>
            <article className="section">
                {
                    events.map(event => {
                        return <section key={`event--${event.id}`}>
                            {
                                (event.completed !== true)
                                    ? <ul >
                                        <li className="event_list">{event.title} </li>
                                        <li className="event_list">Date: {event.readable_date} at {event.readable_time}</li>


                                        <div>
                                            <button className="button is-success" onClick={evt => {
                                                evt.preventDefault()
                                                completeEvent(`${event.id}`)
                                                    .then(() => render())
                                            }}>Complete
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



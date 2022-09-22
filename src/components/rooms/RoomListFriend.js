import { useState, useEffect } from "react"
import { getRoomsFriendUser } from "../../managers/RoomManager"
import { Link, useParams } from "react-router-dom"


export const RoomListFriend = () => {
    const { userId } = useParams()
    const [rooms, setRooms] = useState([])


    useEffect(() => {
        getRoomsFriendUser(userId)
            .then(setRooms)
    },
        [userId]
    )

    return (
        <>

            <h2 className="title mx-4">{rooms.org?.user?.first_name} Friend Rooms</h2>

            <article className="columns is-multiline mx-4">
                {
                    rooms.map((room) =>
                        <article className="column width is-one-quarter ">
                            <section className="card has-background-info-light">
                                <div className="card-image">
                                    <figure className="image image is-4by3">
                                        <img src={`http://localhost:8000${room.picture}`} alt={room.name} />
                                    </figure>
                                </div>

                                <header className="card-header">
                                    <p className="card-header-title">
                                        <Link to={`/rooms/friendroom/${room.id}`}>{room.name}</Link>
                                    </p>
                                </header>

                            </section>

                        </article>

                    )
                }

            </article >
        </>
    )
}

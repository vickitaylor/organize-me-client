import { useState, useEffect } from "react"
import { getRoomsCurrentUser } from "../../managers/RoomManager"
import { Link, useNavigate } from "react-router-dom"


export const RoomList = () => {

    const [rooms, setRooms] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        getRoomsCurrentUser()
            .then(setRooms)
    },
        []
    )

    return (
        <>
            <article>
                {
                    rooms.map(room => {
                        return <section key={`room--${room.id}`} className="room">
                            <Link to={`${room.id}`} >{room.name}</Link>
                        </section>
                    })
                }
            </article>
            <button onClick={evt => { navigate("create")}}>Create New Room</button>
        </>
    )
}
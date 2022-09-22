import { useState, useEffect } from "react"
import { getRoomsCurrentUser } from "../../managers/RoomManager"
import { useNavigate } from "react-router-dom"
import { Room } from "./Room"


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

            <h2 className="title mx-4">My Rooms</h2>

            <article className="columns is-multiline ">
                {
                    rooms.map((room) => <Room key={`room--${room.id}`}
                        room={room}
                    />
                    )
                }

            </article >
            <button className="button is-info m-4" onClick={evt => { navigate("create") }}>Create New Room</button>
        </>
    )
}
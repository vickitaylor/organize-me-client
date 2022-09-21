import { useState, useEffect } from "react"
import { getRoomsFriendUser } from "../../managers/RoomManager"
import { useParams } from "react-router-dom"
import { Room } from "./Room"


export const RoomListFriend = () => {
    const {userId} = useParams()
    const [rooms, setRooms] = useState([])


    useEffect(() => {
        getRoomsFriendUser(userId)
            .then(setRooms)
    },
        [userId]
    )

    return (
        <>

            <h2 className="title mx-4">{rooms.org?.user?.first_name} Friend's Rooms</h2>

            <article className="columns is-multiline mx-4">
                {
                    rooms.map((room) => <Room key={`room--${room.id}`}
                        room={room}
                    />
                    )
                }

            </article >
        </>
    )
}

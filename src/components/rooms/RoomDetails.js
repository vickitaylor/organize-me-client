import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getItemsInRoom } from "../../managers/ItemDetailManager"
import { getSingleRoom } from "../../managers/RoomManager"
import { RoomDetail } from "./RoomDetail"


export const RoomDetails = () => {
    const { roomId } = useParams()
    const navigate = useNavigate()

    const [room, setRoom] = useState({})
    const [items, setItems] = useState([])


    useEffect(() => {
        getSingleRoom(roomId)
            .then(setRoom)
        getItemsInRoom(roomId)
            .then(setItems)
    },
        [roomId]
    )

    useEffect(() => {
        getSingleRoom(roomId)
            .then(setRoom)
    },
        [roomId]
    )

    return (
        <>
            <h2 className="title mx-4">{room.name}</h2>
            <button className="button is-info mb-4 mx-4" onClick={evt => { navigate(`edit`) }}>Edit Room</button>
            <article className="columns is-multiline mx-4">
                {
                    items.map(item => <RoomDetail key={`item--${item.id}`}
                        roomItem={item}
                    />
                    )
                }
            </article>
        </>
    )
}

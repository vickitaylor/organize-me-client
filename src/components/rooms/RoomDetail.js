import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getItemsInRoom } from "../../managers/ItemDetailManager"
import { getSingleRoom } from "../../managers/RoomManager"


export const RoomDetail = () => {
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
            <h2>{room.name}</h2>
            <button onClick={evt => { navigate(`edit`) }}>Edit Room</button>
            <article>
                {
                    items.map(item => {
                        return <section key={`item--${item.id}`} className="items">
                            <div>{item.item?.name}</div>
                        </section>
                    })
                }
            </article>
        </>
    )
}
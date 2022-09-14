import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createItemDetail } from "../../managers/ItemDetailManager"
import { getSingleItem } from "../../managers/ItemManager"
import { getRoomsCurrentUser } from "../../managers/RoomManager"
import "./item.css"


export const ItemDetail = () => {
    const { itemId } = useParams()
    const navigate = useNavigate()

    const [item, setItem] = useState({})
    const [rooms, setRooms] = useState([])
    const [itemDetail, setItemDetail] = useState({})

    useEffect(() => {
        getSingleItem(itemId)
            .then(setItem)
    },
        [itemId]
    )

    useEffect(() => {
        getRoomsCurrentUser()
            .then(setRooms)
    },
        []
    )

    return (
        <>
            <h2>{item.name}</h2>
            <article className="item">
                <img className="picture" key={`pic--${item.picture}`} src={`http://localhost:8000${item.picture}`} alt={item.picture} />

                <section className="item_details">
                    <div><strong>Description:</strong></div>
                    <div>{item.description}</div>
                    <button>Like</button>
                    {
                        (item.org?.id === parseInt(localStorage.getItem('current_user')))
                            ? <button onClick={evt => { navigate(`edit`) }}>Edit</button>
                            : ""
                    }
                    <div>
                        <select className="form-control" name="room" value={item.room} required
                            onChange={(event) => {
                                event.preventDefault()
                                const copy = { ...itemDetail }
                                copy[event.target.name] = parseInt(event.target.value)
                                setItemDetail(copy)
                            }}>
                            <option value="0">Add Item To A Room:</option>
                            {
                                rooms.map(room => {
                                    return <option value={room.id} key={`room--${room.id}`}>{room.name}</option>
                                })
                            }</select>
                        <button type="submit" onClick={event => {
                            event.preventDefault()
                            const newDetail = {
                                item: parseInt(itemId),
                                room: parseInt(itemDetail.room)
                            }
                            createItemDetail(newDetail)
                                .then(() => navigate("/items"))
                        }}>Save to Room</button>
                    </div>
                </section>
            </article>
        </>
    )
}

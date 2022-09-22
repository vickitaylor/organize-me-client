import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getItemsInRoom } from "../../managers/ItemDetailManager"
import { getSingleRoom } from "../../managers/RoomManager"


export const RoomDetailsFriend = () => {
    const { roomId } = useParams()

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

    return (
        <>
            <h2 className="title mx-4">{room.name}</h2>

            <article className="columns is-multiline mx-4">
                {
                    items.map(item =>
                        <article className="column width is-one-fifth ">
                            <section className="card has-background-info-light">
                                <div className="card-image">
                                    <figure className="image image is-square">
                                        <img src={`http://localhost:8000${item.item?.picture}`} alt={item.item?.name} />
                                    </figure>
                                </div>

                                <header className="card-header">
                                    <p className="card-header-title">{item.item?.name}</p>
                                </header>

                            </section>

                        </article>

                    )
                }
            </article>
        </>
    )
}

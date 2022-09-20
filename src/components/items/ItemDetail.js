import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createItemDetail } from "../../managers/ItemDetailManager"
import { getSingleItem, like, unlike } from "../../managers/ItemManager"
import { getRoomsCurrentUser } from "../../managers/RoomManager"


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

    const render = () => {
        getSingleItem(itemId).then(setItem)
    }



    return (
        <>
            <h2 className="title is-4 is-spaced mx-4 pt-2" >{item.name}</h2>
            <div className="tile is-ancestor mx-2">
                <div className="tile is-parent">
                    <article className="tile is-child">
                        <figure className="image is-3by2">
                            <img className="picture" key={`pic--${item.picture}`} src={`https://organize-me8.herokuapp.com${item.picture}`} alt={item.picture} />
                        </figure>
                    </article>
                </div>

                <div className="tile is-parent is-vertical">
                    <article className="tile is-child">
                        <div className="title is-5 is-child">Description:</div>
                        <div className>{item.description}</div>

                    </article>

                    <article className="tile is-child is-align-self-left">
                        <div className="field is-grouped">
                            <p className="control">
                                <button className="button is-warning" onClick={() => navigate(`/items`)}>
                                    Go Back to Items
                                </button>
                            </p>

                            {
                                (item.liked)
                                    ?
                                    <button className="button is-warning mr-3" onClick={(() => { unlike(item.id).then(() => render()) })}>Un-Like</button>
                                    :
                                    <button className="button is-primary mr-3" onClick={(() => { like(item.id).then(() => render()) })}>Like</button>
                            }

                            {
                                (item.org?.id === parseInt(localStorage.getItem('current_user')))
                                    ? <button className="button is-info mr-3" onClick={evt => { navigate(`edit`) }}>Edit</button>
                                    : ""
                            }
                        </div>

                        <div className="select">
                            <select name="room" value={item.room} required
                                onChange={(event) => {
                                    event.preventDefault()
                                    const copy = { ...itemDetail }
                                    copy[event.target.name] = parseInt(event.target.value)
                                    setItemDetail(copy)
                                }}>
                                <option value="0">Add To A Room:</option>
                                {
                                    rooms.map(room => {
                                        return <option value={room.id} key={`room--${room.id}`}>{room.name}</option>
                                    })
                                }</select>
                            <button className="button is-info mt-3" type="submit" onClick={event => {
                                event.preventDefault()
                                const newDetail = {
                                    item: parseInt(itemId),
                                    room: parseInt(itemDetail.room)
                                }
                                createItemDetail(newDetail)
                                    .then((req) => navigate(`/details/${req.id}`))
                            }}>Save to Room</button>
                        </div>
                    </article>
                </div>
            </div>
        </>
    )
}

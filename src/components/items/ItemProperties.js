import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editItemDetail, getItemDetail } from "../../managers/ItemDetailManager"
import { getAllStatuses } from "../../managers/ItemStatusManager"
import { getRoomsCurrentUser } from "../../managers/RoomManager"


export const ItemProperties = () => {
    const navigate = useNavigate()
    const { itemPropId } = useParams()

    const [updateItem, setUpdateItem] = useState({})
    const [itemStatus, setItemStatus] = useState([])
    const [rooms, setRooms] = useState([])



    useEffect(() => {
        getAllStatuses()
            .then(setItemStatus)
        getRoomsCurrentUser()
            .then(setRooms)

        getItemDetail(itemPropId)
            .then((res) => {
                let updateItemProps = {
                    item: res.item,
                    room: res.room,
                    quantity: res.quantity,
                    purchased_from: res.purchased_from,
                    price: res.price,
                    status: res.status.id,
                    serial_num: res.serial_num,
                    purchase_date: res.purchase_date,
                    expiration_date: res.expiration_date,
                    description: res.description
                }
                setUpdateItem(updateItemProps)
            })
    }, [itemPropId]
    )

    const changeItemState = (event) => {
        const itemCopy = { ...updateItem }
        itemCopy[event.target.name] = event.target.value
        setUpdateItem(itemCopy)
    }


    return (
        <>
            <section className="section">

                <article className="panel has-background-info-light">
                    <h2 className="panel-heading has-background-info has-text-white">Personalize {updateItem.item?.name}</h2>

                    <article className="p-3">
                        <fieldset>
                            <label htmlFor="room" className="label">Change Room:</label>
                            <div className="select">
                                <select name="room" value={updateItem.room}
                                    onChange={changeItemState}>
                                    <option value="0">Pick A New Room:</option>
                                    {
                                        rooms.map(room => {
                                            return <option value={room.id} key={`room--${room.id}`}>{room.name}</option>
                                        })
                                    }</select>
                            </div>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="status" className="label">Change Status:</label>
                            <div className="select">
                                <select name="status" value={updateItem.status}
                                    onChange={changeItemState}>
                                    <option value="0">Pick A New Status:</option>
                                    {
                                        itemStatus.map(status => {
                                            return <option value={status.id} key={`status--${status.id}`}>{status.title}</option>
                                        })
                                    }</select>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="quantity" className="label">Quantity:</label>
                                <input type="number" name="quantity" min="1" step="1" max="100" className="form-control input" value={updateItem.quantity}
                                    onChange={changeItemState} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="purchased_from" className="label">Purchased From:</label>
                                <input type="text" name="purchased_from" className="form-control input"
                                    value={updateItem.purchased_from}
                                    onChange={changeItemState} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="price" className="label">Product Price:</label>
                                <input type="number" name="price" min="0.00" step=".01" max="7500.00" className="form-control input"
                                    value={updateItem.price}
                                    onChange={changeItemState} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="serial_num" className="label">Product Serial Number:</label>
                                <input type="text" name="serial_num" className="form-control input"
                                    value={updateItem.serial_num}
                                    onChange={changeItemState} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="purchase_date" className="label">Date Purchased:</label>
                                <input type="date" name="purchase_date" className="form-control input" value={updateItem.purchase_date}
                                    onChange={changeItemState} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="expiration_date" className="label">Expiration Date:</label>
                                <input type="date" name="expiration_date" className="form-control input" value={updateItem.expiration_date}
                                    onChange={changeItemState} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div>
                                <label htmlFor="description" className="label">Comments about the Item:</label>
                                <textarea type="text" name="description" required className="textarea" value={updateItem.description}
                                    onChange={changeItemState} />
                            </div>
                        </fieldset>

                        <button className="button is-info mr-3" type="submit" onClick={event => {
                            event.preventDefault()
                            const updatedItem = {
                                room: parseInt(updateItem.room),
                                quantity: parseInt(updateItem.quantity),
                                purchased_from: updateItem.purchased_from,
                                price: parseFloat(updateItem.price),
                                status: parseInt(updateItem.status),
                                serial_num: updateItem.serial_num,
                                purchase_date: updateItem.purchase_date,
                                expiration_date: updateItem.expiration_date,
                                description: updateItem.description
                            }
                            editItemDetail(itemPropId, updatedItem)
                                .then(() => navigate(`/details/${itemPropId}`))
                        }}>Edit Details</button>

                        <button className="button is-info is-inverted" onClick={() => navigate(`/details/${itemPropId}`)} >
                            Cancel
                        </button>
                    </article >
                </article>
            </section>
        </>
    )
}
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
        getItemDetail(itemPropId)
            .then((res) => {
                let updateItemProps = {
                    item: res.item,
                    room: res.room,
                    quantity: res.quantity,
                    receipt_pic: res.receipt_pic,
                    purchased_from: res.purchased_from,
                    price: res.price,
                    status: res.status,
                    serial_num: res.serial_num,
                    purchase_date: res.purchase_date,
                    expiration_date: res.expiration_date
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

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createItemImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is ", base64ImageString);
            const copy = { ...updateItem }
            copy.receipt_pic = base64ImageString
            setUpdateItem(copy)
        })
    }

    useEffect(() => {
        getAllStatuses()
            .then(setItemStatus)
        getRoomsCurrentUser()
            .then(setRooms)
    }, [])

    return (
        <>
            <h2>Edit Item</h2>
            <form>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="room" className="label">Change Room:</label>
                    </div>
                    <select className="form-control" name="room" value={updateItem.room}
                        onChange={changeItemState}>
                        <option value="0">Pick A New Room:</option>
                        {
                            rooms.map(room => {
                                return <option value={room.id} key={`room--${room.id}`}>{room.name}</option>
                            })
                        }</select>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="status" className="label">Change Status:</label>
                    </div>
                    <select className="form-control" name="status" value={updateItem.status}
                        onChange={changeItemState}>
                        <option value="0">Pick A New Status:</option>
                        {
                            itemStatus.map(status => {
                                return <option value={status.id} key={`status--${status.id}`}>{status.title}</option>
                            })
                        }</select>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="quantity" className="label">Quantity:</label>
                        <input type="number" name="quantity" min="1" step="1" max="100"
                            className="form-control"
                            value={updateItem.quantity}
                            onChange={changeItemState} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="purchased_from" className="label">Purchased From:</label>
                        <input type="text" name="purchased_from"
                            className="form-control"
                            value={updateItem.purchased_from}
                            onChange={changeItemState} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="price" className="label">Product Price:</label>
                        <input type="number" name="price" min="0.00" step=".01" max="7500.00"
                            className="form-control"
                            value={updateItem.price}
                            onChange={changeItemState} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="serial_num" className="label">Product Serial Number:</label>
                        <input type="text" name="serial_num"
                            className="form-control"
                            value={updateItem.serial_num}
                            onChange={changeItemState} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="purchase_date" className="label">Date Purchased:</label>
                        <input type="date" name="purchase_date" className="form-control" value={updateItem.purchase_date}
                            onChange={changeItemState} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="expiration_date" className="label">Expiration Date:</label>
                        <input type="date" name="expiration_date" className="form-control" value={updateItem.expiration_date}
                            onChange={changeItemState} />
                    </div>
                </fieldset>

                <fieldset>
                    <label htmlFor="receipt_pic" className="label">Upload A Receipt_pic of the Receipt:</label><br />
                    <input type="file" id="receipt_pic" onChange={createItemImageString} />
                    <input type="hidden" name="receipt_pic" value={updateItem.receipt_pic} />
                </fieldset>


                <button type="submit" onClick={event => {
                    event.preventDefault()
                    const updatedItem = {
                        room: parseInt(updateItem.room),
                        quantity: parseInt(updateItem.quantity),
                        receipt_pic: updateItem.receipt_pic,
                        purchased_from: updateItem.purchased_from,
                        price: updateItem.price,
                        status: updateItem.status,
                        serial_num: updateItem.serial_num,
                        purchase_date: updateItem.purchase_date,
                        expiration_date: updateItem.expiration_date
                    }
                    editItemDetail(itemPropId, updatedItem)
                        .then(() => navigate(`/rooms/${updatedItem.room}`))
                }}>Edit Details</button>
                <button onClick={() => navigate(`/rooms`)}>
                    Cancel
                </button>
            </form >
        </>
    )
}
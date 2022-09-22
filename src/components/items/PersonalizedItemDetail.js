import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteItemDetail, getItemDetail } from "../../managers/ItemDetailManager"
import { getReceipts, newReceipt } from "../../managers/ReceiptManager"


export const PersonalizedItemDetail = () => {
    const { itemPropId } = useParams()
    const navigate = useNavigate()

    const [perItem, setPerItem] = useState({})
    const [receipts, setReceipts] = useState([])
    const [updatedItem, setUpdateItem] = useState({
        item_detail: "",
        receipt_pic: ""
    })

    const loadItem = () => {
        getItemDetail(itemPropId)
            .then(data => setPerItem(data))
        getReceipts(itemPropId)
            .then(setReceipts)
    }

    useEffect(() => {
        loadItem()
    },
        [itemPropId]
    )

    const handleDelete = (id) => {
        deleteItemDetail(itemPropId)
            .then(() => navigate(`/rooms/${perItem.room}`))
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createItemImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is ", base64ImageString);
            const copy = { ...updatedItem }
            copy.receipt_pic = base64ImageString
            setUpdateItem(copy)
        })
    }

    return (
        <>
            <h2 className="title is-4 is-spaced mx-4 pt-2" >{perItem.item?.name}</h2>
            <div className="tile is-ancestor mx-2">
                <div className="tile is-parent">
                    <article className="tile is-child">
                        <figure className="image">
                            <img className="picture" src={`https://organize-me8.herokuapp.com${perItem.item?.picture}`} alt={perItem.item?.picture} />
                        </figure>
                    </article>

                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child">
                            <div className="title is-5 is-child">Description:</div>
                            <div>{perItem.item?.description}</div> <br />
                            <div><strong>Details:</strong></div>
                            <div>Status: {perItem.status?.title}</div>
                            <div>Purchased From: {perItem.purchased_from}</div>
                            <div>Price: {perItem.format_price}</div>
                            <div>Quantity: {perItem.quantity}</div>
                            <div>Purchased Date: {perItem.purchased_date}</div>
                            <div>Expires: {perItem.exp_date}</div>
                            <div>Serial Number: {perItem.serial_num}</div>
                            <div>Comments: {perItem.description}</div>
                        </article>

                        <article className="tile is-child is-align-self-left">
                            <div className="field is-grouped">
                                <p className="control">
                                    <button className="button is-info is-inverted mr-4" onClick={() => navigate(`/rooms/${perItem.room}`)}>
                                        Go Back Room
                                    </button>
                                    <button className="button is-info" onClick={evt => { navigate(`edit`) }}>Edit</button>
                                    <button className="button is-danger mx-4" onClick={() => {
                                        const confirmBox = window.confirm("Do you want to delete this event?")
                                        if (confirmBox)
                                            handleDelete(perItem.id)
                                    }}>
                                        Delete</button>
                                </p>

                            </div>
                        </article>

                        <fieldset>
                            <label htmlFor="receipt_pic" className="label">Upload A Picture of the Receipt:</label>
                            <input type="file" id="receipt_pic" onChange={createItemImageString} />
                            <input type="hidden" name="receipt_pic" value={updatedItem.receipt_pic} />
                        </fieldset>
                        <p>
                            <button className="button is-info mr-3" type="submit" onClick={event => {
                                event.preventDefault()
                                const updateItem = {
                                    item_detaiL: parseInt(itemPropId),
                                    receipt_pic: updatedItem.receipt_pic,
                                }
                                newReceipt(updateItem)
                                    .then(() => loadItem())
                            }}>Save Receipt</button>
                        </p>
                    </div>
                </div>
            </div >

            <div className="tile is-ancestor mx-2">
                <div className="tile is-parent">
                    <article className="tile is-child">
                        <figure>
                            <div className="subtitle">Receipt Pictures:</div> <br />
                            {
                                receipts.map(receipt => {
                                    return <img className="rec-picture mx-4" key={`receipt--${receipt.id}`} src={`https://organize-me8.herokuapp.com${receipt.receipt_pic}`} alt={`${perItem.item?.name} receipt`} />
                                })
                            }
                        </figure>
                    </article>
                </div>
            </div>

        </>
    )
}

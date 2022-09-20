import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getItemDetail } from "../../managers/ItemDetailManager"


export const PersonalizedItemDetail = () => {
    const { itemPropId } = useParams()
    const navigate = useNavigate()

    const [perItem, setPerItem] = useState({})

    useEffect(() => {
        getItemDetail(itemPropId)
            .then(setPerItem)
    },
        [itemPropId]
    )

    return (
        <>
            <h2 className="title is-4 is-spaced mx-4 pt-2" >{perItem.item?.name}</h2>
            <div className="tile is-ancestor mx-2">
                <div className="tile is-parent">
                    <article className="tile is-child">
                        <figure className="image is-3by2">
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
                        </article>

                        <article className="tile is-child is-align-self-left">
                            <div className="field is-grouped">
                                <p className="control">
                                    <button className="button is-info is-inverted mr-3" onClick={() => navigate(`/rooms/${perItem.room}`)}>
                                        Go Back Room
                                    </button>
                                    <button className="button is-info" onClick={evt => { navigate(`edit`) }}>Edit</button>
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            <div className="tile is-ancestor mx-2">
                <div className="tile is-parent">
                    <article className="tile is-child">
                        <figure>
                            <div className="subtitle">Receipt Picture:</div> <br />
                            <img className="picture" src={`https://organize-me8.herokuapp.com${perItem.receipt_pic}`} alt={`${perItem.item?.name} receipt`} />
                        </figure>
                    </article>
                </div>
            </div>

        </>
    )
}

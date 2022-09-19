import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getItemDetail } from "../../managers/ItemDetailManager"
import "./item.css"


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
            <h2>{perItem.item?.name}</h2>
            <article className="item">
                <img className="picture" src={`http://localhost:8000${perItem.item?.picture}`} alt={perItem.item?.picture} />

                <section>
                    <div><strong>Description:</strong></div>
                    <div>{perItem.item?.description}</div>
                    <div>Purchased From: {perItem.purchased_from}</div>
                    <div>Price: {perItem.price}</div>
                    <div>Purchased Date: {perItem.purchased_date}</div>
                    <div>Expires: {perItem.exp_date}</div>
                    <div>Quantity: {perItem.quantity}</div>
                    <div>Serial Number: {perItem.serial_num}</div>
                    <div>Status: {perItem.status?.title}</div>


                    <button className="button is-info is-inverted mr-3" onClick={() => navigate(`/rooms/${perItem.room}`)}>
                        Go Back Room
                    </button>

                    <button className="button is-info" onClick={evt => { navigate(`edit`) }}>Edit</button>
                </section>
                <img className="picture" src={`http://localhost:8000${perItem.receipt_pic}`} alt={`${perItem.item?.name} receipt`} />
            </article>
        </>
    )
}

import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUserLikes } from "../../managers/LikeManager"

export const LikeList = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        getCurrentUserLikes()
            .then(setItems)
    }, []
    )

    return (
        <>
            <h2 className="title is-2 is-spaced mx-4 pt-2">My Liked Items</h2>

            <article className="section">
                {
                    items.map(item => {
                        return <section key={`like--${item.id}`}>
                            <ul >
                                <Link to={`/items/${item.item?.id}`}>
                                    <li>{item.item?.name} </li>
                                </Link>
                            </ul>

                        </section>
                    })
                }
            </article >
        </>
    )
}



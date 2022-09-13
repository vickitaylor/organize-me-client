import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../../managers/AuthManager"
import "./home.css"

export const HomePage = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        getCurrentUser()
            .then(setUser)
    }, [])

    return (
        <>
            <h2>Welcome {user.user?.first_name}!</h2>
            <article className="home__page" >

                <Link to="/rooms" className="home_pic">
                    <img src="images/house.jpg" alt="rooms" className="home_pic" />
                    <div className="home_link">Go To Rooms</div>
                </Link>

                <Link to="/items" className="home_pic">
                    <img src="images/items.jpg" alt="items" className="home_pic" />
                    <div className="home_link">Go To Items</div>
                </Link>

                <Link to="/events" className="home_pic">
                    <img src="images/to_do.jfif" alt="to_do_board" className="home_pic" />
                    <div className="home_link">Go To Events</div>
                </Link>

            </article>
        </>

    )
}
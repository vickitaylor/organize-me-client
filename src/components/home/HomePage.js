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
            <h2 className="title is-2 is-spaced mx-4 pt-2">Welcome {user.user?.first_name}!</h2>
            <section className="container content pt-6">

                <article className="mx-4 columns is-mobile has-text-centered" >

                    <Link to="/rooms" className="column ">
                        <img src="images/house.jpg" alt="rooms" className="home_pic" />
                        <div className="home_link">Go To Rooms</div>
                    </Link>

                    <Link to="/items" className="column">
                        <img src="images/items.jpg" alt="items" className="home_pic" />
                        <div className="home_link">Go To Items</div>
                    </Link>

                    <Link to="/events" className="column">
                        <img src="images/to_do.jfif" alt="to_do_board" className="home_pic" />
                        <div className="home_link">Go To Events</div>
                    </Link>

                </article>
            </section>
        </>

    )
}
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    const navbar = useRef()
    const hamburger = useRef()

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }

    return (
        <nav className="navbar is-info mb-3" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/home">
                    <h1 className="title is-4">Organize Me</h1>
                </a>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>

                </a>
            </div>

            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    {
                        (localStorage.getItem("om_token") !== null)
                            ? <>
                                <Link className="navbar-item" to="/rooms">Rooms</Link>
                                <Link className="navbar-item" to="/items">Items</Link>
                                <Link className="navbar-item" to="/events">Events</Link>
                                <Link className="navbar-item" to="/likes">Like List</Link>
                                {
                                    (localStorage.getItem("is_staff") == "true")
                                        ? <Link className="navbar-item" to="/admin">Admin</Link>
                                        : ""
                                }
                            </>
                            : ""
                    }
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">

                            {
                                (localStorage.getItem("om_token") !== null)
                                    ? <>
                                        <Link className="navbar-item" to="/rooms">Me!!</Link>
                                        <button className="button is-outlined" onClick={() => {
                                            localStorage.removeItem("om_token")
                                            localStorage.removeItem("is_staff")
                                            localStorage.removeItem("current_user")
                                            navigate('/login')
                                        }}>Logout</button>
                                    </>
                                    : <>
                                        <Link to="/register" className="button is-link">Register</Link>
                                        <Link to="/login" className="button is-outlined">Login</Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}

import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import "./Auth.css"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("om_token", res.token)
                    // added current user property
                    localStorage.setItem("current_user", res.current_user)
                    navigate("/home")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="title is-2 is-spaced">Organize Me</h1>
                    <h2 className="subtitle">Please sign in</h2>
                    <fieldset>
                        <label className="label" htmlFor="inputUsername"> Username </label>
                        <input ref={username} type="username" id="username" className="form-control input" placeholder="Username" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label className="label" htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control input"  placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <button className="button is-info" type="submit">Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

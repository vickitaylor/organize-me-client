import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import "./Auth.css"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const picture = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "picture": picture.current.value,
                "password": password.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("om_token", res.token)
                        // added current user property
                        localStorage.setItem("current_user", res.current_user)
                        navigate("/home")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal title is-2">Register an account</h1>
                <fieldset>
                    <label className="label" htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control input" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label className="label" htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control input" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label className="label" htmlFor="inputUsername">Username</label>
                    <input ref={username} type="text" name="username" className="form-control input" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label className="label" htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control input" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label className="label" htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control input" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label className="label" htmlFor="picture"> Picture Url </label>
                    <input ref={picture} name="picture" className="form-control input" placeholder="Enter Picture Url" />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send button is-info" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}

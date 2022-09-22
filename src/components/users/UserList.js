import { useEffect, useState } from "react"
import { approve, getAllUsers, getSearchUsers, remove } from "../../managers/UserManager"

export const UserList = () => {
    const [users, setUsers] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredUsers, setFiltered] = useState([])

    const loadUsers = () => {
        getAllUsers()
            .then(data => setUsers(data))
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const render = () => {
        getAllUsers().then(setUsers)
    }

    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchUsers(searchTerms).then(data => setFiltered(data))
            }
            else {
                setFiltered(users)
            }
        },
        [searchTerms, users]
    )

    return (
        <>
            <h2 className="title is-2 is-spaced mx-4 pt-2">User List</h2>
            <h4 className="subtitle is-spaced mx-4 pt-2">List of current usernames that you can have access to your rooms and users.</h4>

            <div className="pt-4 px-4">
                <input
                    className="input search"
                    type="text"
                    placeholder="Search by Username"
                    onChange={
                        (changeUser) => {
                            let search = changeUser.target.value
                            setSearchTerms(search)
                        }
                    }
                />
            </div>

            <article className="section">
                {
                    filteredUsers.map(org => {
                        return <section key={`org--${org.id}`}>
                            <ul >
                                <li className="subtitle">{org.user?.username}

                                    {
                                        (org.approved)
                                            ?
                                            <button className="button is-warning ml-3" onClick={(() => { remove(org.id).then(() => render()) })}>Remove Access</button>
                                            :
                                            <button className="button is-primary ml-3" onClick={(() => { approve(org.id).then(() => render()) })}>Allow Access</button>
                                    }


                                </li><br />
                            </ul>

                        </section>
                    })
                }
            </article >
        </>
    )
}



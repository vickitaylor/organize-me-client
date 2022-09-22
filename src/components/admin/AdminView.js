import { useEffect, useState } from "react"
import { createCategory, deleteCategory, getAllCategories } from "../../managers/CategoryManager"
import { createStatus, deleteStatus, getAllStatuses } from "../../managers/ItemStatusManager"

import Icon from '@mdi/react'
import { mdiTrashCanOutline } from '@mdi/js';


export const AdminView = () => {

    const [categories, setCategories] = useState([])
    const [statuses, setStatuses] = useState([])

    const loadCategories = () => {
        getAllCategories()
            .then(setCategories)
    }

    const loadStatuses = () => {
        getAllStatuses()
            .then(setStatuses)
    }

    useEffect(() => {
        loadCategories()
    }, [])

    useEffect(() => {
        loadStatuses()
    }, [])

    const handleDelete = (id) => {
        deleteCategory(id).then(loadCategories)
    }

    const handleStatusDelete = (id) => {
        deleteStatus(id).then(loadStatuses)
    }

    const [category, setCategory] = useState({
        name: ""
    })

    const [status, setStatus] = useState({
        title: ""
    })

    const changeState = (event) => {
        const copy = { ...category }
        copy[event.target.name] = event.target.value
        setCategory(copy)
    }

    const changeStatusState = (event) => {
        const copy = { ...category }
        copy[event.target.name] = event.target.value
        setStatus(copy)
    }

    return (
        <>
            <h2 className="title is-2 is-spaced mx-4 pt-2">Admin</h2>
            <section className="section">

                <article className="panel has-background-info-light">
                    <h2 className="panel-heading has-background-info has-text-white">Categories</h2>
                    <article className="p-3">

                        {categories.map(category => {
                            return <section key={`cat--{category.id}`}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{category.name}</th>
                                            <button className="del-btn icon-text" onClick={() => {
                                                const confirmBox = window.confirm("Do you want to delete this category?")
                                                if (confirmBox)
                                                    handleDelete(category.id)
                                            }}>
                                                <Icon path={mdiTrashCanOutline}
                                                    title="trash-can-outline"
                                                    size={1}
                                                    color="red" />
                                            </button>
                                        </tr>
                                    </thead>
                                </table>
                            </section>

                        })}

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="name" className="label">Create A New Category:</label>
                                <input type="text" name="name" required className="form-control input" value={category.name}
                                    onChange={changeState} placeholder="Enter New Category Name" />
                            </div>
                        </fieldset>

                        <button className="button is-info mr-3" type="submit" onClick={event => {
                            event.preventDefault()
                            const cat = {
                                name: category.name
                            }
                            createCategory(cat)
                                .then(() => setCategory({ name: "" }))
                                .then(loadCategories)
                        }}>Create Category
                        </button>

                    </article>
                </article>
            </section>


            <section className="section">

                <article className="panel has-background-info-light">
                    <h2 className="panel-heading has-background-info has-text-white">Statuses</h2>
                    <article className="p-3">
                        {statuses.map(status => {
                            return <section key={`status--{status.id}`}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{status.title}</th>
                                            
                                            <button className="del-btn icon-text" onClick={() => {
                                                const confirmBox = window.confirm("Do you want to delete this status?")
                                                if (confirmBox)
                                                    handleStatusDelete(status.id)
                                            }}>
                                                <Icon path={mdiTrashCanOutline}
                                                    title="trash-can-outline"
                                                    size={1}
                                                    color="red" />
                                            </button>
                                        </tr>
                                    </thead>
                                </table>
                            </section>

                        })}

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="title" className="label">Create A New Status:</label>
                                <input type="text" name="title" required className="form-control input" value={status.title}
                                    onChange={changeStatusState} placeholder="Enter New Status Name"/>
                            </div>
                        </fieldset>

                        <button className="button is-info mr-3" type="submit" onClick={event => {
                            event.preventDefault()
                            const newStatus = {
                                title: status.title
                            }
                            createStatus(newStatus)
                                .then(() => setStatus({ title: "" }))
                                .then(loadStatuses)
                        }}>Create Status</button>
                    </article>
                </article>
            </section>
        </>
    )
}

import { Link } from "react-router-dom"

export const Friends = ({ user }) => {

    return (

        <article className="column width is-one-quarter">
            {
                (user.approved)
                    ?
                    <section className="card has-background-primary pt-2">
                        <div className="card-image">
                            <figure className="image is-square">
                                <img src={user.picture} alt={user.name} />
                            </figure>
                        </div>

                        <div className="card-header has-background-primary column">
                            <span className="subtitle">{user.user?.first_name}</span>
                            <span className="card-header-title has-background-primary has-text-left px-6">
                                <Link className="px-3" to={`/rooms/friend/${user.id}`}> Rooms</Link>
                                <Link className="px-6" to={`/events/friend/${user.id}`}>Events</Link>
                            </span>
                        </div>

                    </section>
                    : ""
            }


        </article>

    )
}

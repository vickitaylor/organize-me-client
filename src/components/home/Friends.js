import { Link } from "react-router-dom"

export const Friends = ({ user }) => {

    return (

        <article className="column width is-one-quarter">
            {
                (user.approved)
                    ?
                    <section className="card has-background-primary pt-4">
                        <div className="card-image">
                            <figure className="image is-square">
                                <img src={user.picture} alt={user.name} />
                            </figure>
                        </div>

                        <div className="card-header has-background-primary column">
                            <div className="subtitle">{user.user?.first_name}</div>
                            <div className="card-header-title has-background-primary justify">
                                <Link to={`/rooms/friend/${user.id}`}>Rooms</Link>
                                <Link to={`/events/friend/${user.id}`}>Events</Link>
                            </div>
                        </div>

                    </section>
                    : ""
            }


        </article>

    )
}

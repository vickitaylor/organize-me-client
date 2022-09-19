import { Link } from "react-router-dom"

export const Room = ({ room }) => {


    return (

        <article className="column width is-one-quarter ">
            <section className="card has-background-info-light">
                <div className="card-image">
                    <figure className="image image is-4by3">
                        <img src={`http://localhost:8000${room.picture}`} alt={room.name} />
                    </figure>
                </div>

                <header className="card-header">
                    <p className="card-header-title">
                        <Link to={`/rooms/${room.id}`}>{room.name}</Link>
                    </p>
                </header>

            </section>

        </article>

    )
}

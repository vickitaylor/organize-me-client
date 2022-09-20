import { Link } from "react-router-dom"

export const Item = ({ item }) => {


    return (

        <article className="column width is-one-fifth ">
            <section className="card has-background-info-light">
                <div className="card-image">
                    <figure className="image image is-square">
                        <img src={`https://organize-me8.herokuapp.com${item.picture}`} alt={item.name} />
                    </figure>
                </div>

                <header className="card-header">
                    <p className="card-header-title">
                        <Link to={`/items/${item.id}`}>{item.name}</Link>
                    </p>
                </header>

            </section>

        </article>

    )
}

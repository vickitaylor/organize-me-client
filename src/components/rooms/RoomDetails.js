import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getItemsInRoom, getFilteredItemsInRoom, getItemsInRoomByCategory } from "../../managers/ItemDetailManager"
import { getSingleRoom } from "../../managers/RoomManager"
import { RoomDetail } from "./RoomDetail"
import { getAllCategories } from "../../managers/CategoryManager"


export const RoomDetails = () => {
    const { roomId } = useParams()
    const navigate = useNavigate()

    const [room, setRoom] = useState({})
    const [items, setItems] = useState([])

    const [searchTerms, setSearchTerms] = useState("")
    const [filteredItems, setFiltered] = useState([])
    const [categories, setCategories] = useState([])
    const [chosenCat, setChosenCategory] = useState(0)

    useEffect(() => {
        getSingleRoom(roomId)
            .then(setRoom)
        getItemsInRoom(roomId)
            .then(setItems)
        getAllCategories()
            .then(setCategories)
    },
        [roomId]
    )

    useEffect(
        () => {
            if (searchTerms !== "") {
                getFilteredItemsInRoom(roomId, searchTerms)
                    .then(data => setFiltered(data))
            }
            else {
                setFiltered(items)
            }
        },
        [searchTerms, items, roomId]
    )

    useEffect(
        () => {
            if (chosenCat === 0) {
                setFiltered(items)
            }
            else {
                getItemsInRoomByCategory(roomId, chosenCat)
                    .then((data) => {
                        setFiltered(data)
                    })
            }
        },
        [chosenCat, items, roomId]
    )

    return (
        <>
            <h2 className="title mx-4">{room.name}</h2>
            <button className="button is-info mb-4 mx-4" onClick={evt => { navigate(`edit`) }}>Edit Room</button>

            <div className="px-4 pb-4 has-text-right">
                <input
                    className="input search mx-4"
                    type="text"
                    placeholder="Search Items"
                    onChange={
                        (changeEvent) => {
                            let search = changeEvent.target.value
                            setSearchTerms(search)
                        }
                    }
                />
                <div className="select">
                    <select onChange={(event) => {
                        let chosenCategory = event.target.value
                        setChosenCategory(parseInt(chosenCategory))
                    }}>
                        <option value="0">Filter by Category...</option>
                        {categories.map(category => {
                            return <option value={`${category.id}`} key={`category--${category.id}`}>{category.name}</option>
                        })}
                    </select>
                </div>
            </div>

            <article className="columns is-multiline mx-4">
                {
                    filteredItems.map(item => <RoomDetail key={`item--${item.id}`}
                        roomItem={item}
                    />
                    )
                }
            </article>
        </>
    )
}

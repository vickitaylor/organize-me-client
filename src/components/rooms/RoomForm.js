import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createRoom } from "../../managers/RoomManager"


export const RoomForm = () => {
    const navigate = useNavigate()

    const [room, setRoom] = useState({
        name: "",
        picture: ""
    })

    const changeRoomState = (event) => {
        const roomCopy = { ...room }
        roomCopy[event.target.name] = event.target.value
        setRoom(roomCopy)
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createRoomImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is ", base64ImageString);
            const copy = { ...room }
            copy.picture = base64ImageString
            setRoom(copy)
        })
    }

    return (
        <section className="section">

            <article className="panel has-background-info-light">
                <h2 className="panel-heading has-background-info has-text-white">Create A New Room</h2>
                <article className="p-3">

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name" className="label">Room Name:</label>
                            <input type="text" name="name" required autoFocus className="form-control input" value={room.name}
                                onChange={changeRoomState} />
                        </div>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="picture" className="label">Upload Your Room Picture:</label>
                        <input type="file" id="picture" onChange={createRoomImageString} />
                        <input type="hidden" name="picture" value={room.picture} />
                    </fieldset>

                    <button className="button is-info mr-3" type="submit" onClick={event => {
                        event.preventDefault()
                        const newRoom = {
                            name: room.name,
                            picture: room.picture
                        }
                        createRoom(newRoom)
                            .then(() => navigate("/rooms"))
                    }}>Create Room</button>

                    <button className="button is-info is-inverted" onClick={() => navigate(`/rooms`)}>
                        Cancel
                    </button>

                </article>
            </article>
        </section>
    )
}

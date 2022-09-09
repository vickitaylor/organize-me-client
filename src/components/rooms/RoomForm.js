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
        <form>
            <h2>Create A New Room</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name" className="label">Room Name:</label>
                    <input type="text" name="name" required autoFocus className="form-control" value={room.name}
                        onChange={changeRoomState} />
                </div>
            </fieldset>

            <fieldset>
                <label htmlFor="picture" className="label">Upload Your Room Picture:</label><br />
                <input type="file" id="picture" onChange={createRoomImageString} />
                <input type="hidden" name="picture" value={room.picture} />
            </fieldset>

            <button type="submit" onClick={event => {
                event.preventDefault()
                const newRoom = {
                    name: room.name,
                    picture: room.picture
                }
                createRoom(newRoom)
                    .then(() => navigate("/rooms"))
            }}>Create Room</button>
        </form>
    )
}

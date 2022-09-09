import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editRoom, getSingleRoom } from "../../managers/RoomManager"


export const RoomEdit = () => {
    const navigate = useNavigate()
    const { roomId } = useParams()
    
    const [updateRoom, setUpdateRoom] = useState({})

    useEffect(() => {
        getSingleRoom(roomId)
            .then((res) => {
                let room = {
                    name: res.name,
                    picture: res.picture
                }
                setUpdateRoom(room)
            })
    }, [roomId]
    )

    const changeRoomState = (event) => {
        const roomCopy = { ...updateRoom }
        roomCopy[event.target.name] = event.target.value
        setUpdateRoom(roomCopy)
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createRoomImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is ", base64ImageString);
            const copy = { ...updateRoom }
            copy.picture = base64ImageString
            setUpdateRoom(copy)
        })
    }

    return (
        <>
            <h2>Edit Room</h2>
            <form>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name" className="label">Room Name:</label>
                        <input type="text" name="name" required autoFocus className="form-control" value={updateRoom.name}
                            onChange={changeRoomState} />
                    </div>
                </fieldset>

                <fieldset>
                    <label htmlFor="picture" className="label">Upload Your Room Picture:</label><br />
                    <input type="file" id="picture" onChange={createRoomImageString} />
                    <input type="hidden" name="picture" value={updateRoom.picture} />
                </fieldset>

                <button type="submit" onClick={event => {
                    event.preventDefault()
                    const updatedRoom = {
                        name: updateRoom.name,
                        picture: updateRoom.picture
                    }
                    editRoom(roomId, updatedRoom)
                        .then(() => navigate(`/rooms/${roomId}`))
                }}>Edit Room</button>
            </form >
        </>
    )
}
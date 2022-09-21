export const getRoomsCurrentUser = () => {
    return fetch(`http://localhost:8000/rooms?user=${localStorage.getItem('current_user')}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getRoomsFriendUser = (id) => {
    return fetch(`http://localhost:8000/rooms?user=${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getSingleRoom = (roomId) => {
    return fetch(`http://localhost:8000/rooms/${roomId}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const createRoom = (room) => {
    return fetch(`http://localhost:8000/rooms`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(room)
    })
        .then(res => res.json())
}

export const editRoom = (roomId, room) => {
    return fetch(`http://localhost:8000/rooms/${roomId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(room)
    })
}

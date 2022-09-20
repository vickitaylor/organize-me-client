export const getRoomsCurrentUser = () => {
    return fetch(`https://organize-me8.herokuapp.com/rooms?user=${localStorage.getItem('current_user')}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getSingleRoom = (roomId) => {
    return fetch(`https://organize-me8.herokuapp.com/rooms/${roomId}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const createRoom = (room) => {
    return fetch(`https://organize-me8.herokuapp.com/rooms`, {
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
    return fetch(`https://organize-me8.herokuapp.com/rooms/${roomId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(room)
    })
}

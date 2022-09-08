export const getRoomsCurrentUser = () => {
    return fetch(`http://localhost:8000/rooms?user=${localStorage.getItem('current_user')}`, {
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

export const getCurrentUserEvents = () => {
    return fetch(`http://localhost:8000/events?user=${localStorage.getItem('current_user')}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const newEvent = (event) => {
    return fetch(`http://localhost:8000/events`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
}
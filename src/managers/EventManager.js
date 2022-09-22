export const getCurrentUserEvents = () => {
    return fetch(`https://organize-me8.herokuapp.com/events?user=${localStorage.getItem('current_user')}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getFriendEvents = (id) => {
    return fetch(`https://organize-me8.herokuapp.com/events?user=${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}


export const getSearchEvents = (search) => {
    return fetch(`https://organize-me8.herokuapp.com/events?user=${localStorage.getItem('current_user')}&search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        }
    })
        .then(res => res.json())
}

export const newEvent = (event) => {
    return fetch(`https://organize-me8.herokuapp.com/events`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
}

export const getSingleEvent = (eventId) => {
    return fetch(`https://organize-me8.herokuapp.com/events/${eventId}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const editEvent = (eventId, event) => {
    return fetch(`https://organize-me8.herokuapp.com/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
}

export const completeEvent = (eventId) => {
    return fetch(`https://organize-me8.herokuapp.com/events/${eventId}/complete`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        }
    })
}

export const deleteEvent = (id) => {
    return fetch(`https://organize-me8.herokuapp.com/events/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`
        }
    })
}
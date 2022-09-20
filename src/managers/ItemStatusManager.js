export const getAllStatuses = () => {
    return fetch(`https://organize-me8.herokuapp.com/status`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const createStatus = (status) => {
    return fetch(`https://organize-me8.herokuapp.com/status`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(status)
    })
        .then(res => res.json())
}

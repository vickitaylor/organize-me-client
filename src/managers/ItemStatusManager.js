export const getAllStatuses = () => {
    return fetch(`http://localhost:8000/status`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const createStatus = (status) => {
    return fetch(`http://localhost:8000/status`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(status)
    })
        .then(res => res.json())
}

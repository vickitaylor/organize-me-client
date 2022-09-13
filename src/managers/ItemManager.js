export const getAllItems = () => {
    return fetch(`http://localhost:8000/items`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const createItem = (item) => {
    return fetch(`http://localhost:8000/items`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(item)
    })
    .then(res => res.json())
}
export const getAllItems = () => {
    return fetch(`http://localhost:8000/items`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getSingleItem = (itemId) => {
    return fetch(`http://localhost:8000/items/${itemId}`, {
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

export const editItem = (itemId, item) => {
    return fetch(`http://localhost:8000/items/${itemId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
}

export const like = (itemId) => {
    return fetch(`http://localhost:8000/items/${itemId}/like`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itemId)
    })
}

export const unlike = (itemId) => {
    return fetch(`http://localhost:8000/items/${itemId}/unlike`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`
        }
    })
}
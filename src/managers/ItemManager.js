export const getAllItems = () => {
    return fetch(`https://organize-me8.herokuapp.com/items`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getSingleItem = (itemId) => {
    return fetch(`https://organize-me8.herokuapp.com/items/${itemId}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getSearchItems = (search) => {
    return fetch(`https://organize-me8.herokuapp.com/items?search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        }
    })
        .then(res => res.json())
}

export const getItemsByCategory = (id) => {
    return fetch(`https://organize-me8.herokuapp.com/items?category=${id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        }
    })
        .then(res => res.json())
}

export const createItem = (item) => {
    return fetch(`https://organize-me8.herokuapp.com/items`, {
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
    return fetch(`https://organize-me8.herokuapp.com/items/${itemId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
}

export const like = (itemId) => {
    return fetch(`https://organize-me8.herokuapp.com/items/${itemId}/like`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itemId)
    })
}

export const unlike = (itemId) => {
    return fetch(`https://organize-me8.herokuapp.com/items/${itemId}/unlike`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`
        }
    })
}
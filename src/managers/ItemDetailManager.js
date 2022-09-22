export const getItemsInRoom = (id) => {
    return fetch(`https://organize-me8.herokuapp.com/item_details?room=${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getItemDetail = (id) => {
    return fetch(`https://organize-me8.herokuapp.com/item_details/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}


export const getFilteredItemsInRoom = (id, search) => {
    return fetch(`https://organize-me8.herokuapp.com/item_details?room=${id}&search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        }
    })
        .then(res => res.json())
}

export const getItemsInRoomByCategory = (room, id) => {
    return fetch(`https://organize-me8.herokuapp.com/item_details?room=${room}&category=${id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        }
    })
        .then(res => res.json())
}

export const createItemDetail = (item) => {
    return fetch(`https://organize-me8.herokuapp.com/item_details`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(res => res.json())
}

export const editItemDetail = (id, detail) => {
    return fetch(`https://organize-me8.herokuapp.com/item_details/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(detail)
    })
}

export const deleteItemDetail = (id) => {
    return fetch(`http://localhost:8000/item_details/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`
        }
    })
}
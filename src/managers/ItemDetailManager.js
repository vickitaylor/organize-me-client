export const getItemsInRoom = (id) => {
    return fetch(`http://localhost:8000/item_details?room=${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getItemDetail = (id) => {
    return fetch(`http://localhost:8000/item_details/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const createItemDetail = (item) => {
    return fetch(`http://localhost:8000/item_details`, {
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
    return fetch(`http://localhost:8000/item_details/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(detail)
    }) 
}
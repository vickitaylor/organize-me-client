


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
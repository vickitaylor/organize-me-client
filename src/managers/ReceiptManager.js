export const getReceipts = (id) => {
    return fetch(`http://localhost:8000/receipts?item_detail=${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}


export const newReceipt = (pic) => {
    return fetch(`http://localhost:8000/receipts`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(pic)
    })
        .then(res => res.json())
}
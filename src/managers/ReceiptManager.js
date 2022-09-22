export const getReceipts = (id) => {
    return fetch(`https://organize-me8.herokuapp.com/receipts?item_detail=${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}


export const newReceipt = (pic) => {
    return fetch(`https://organize-me8.herokuapp.com/receipts`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(pic)
    })
        .then(res => res.json())
}
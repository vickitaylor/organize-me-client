export const getAllItems = () => {
    return fetch(`http://localhost:8000/items`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

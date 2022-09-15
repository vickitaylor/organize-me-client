export const getAllStatuses = () => {
    return fetch(`http://localhost:8000/statuses`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

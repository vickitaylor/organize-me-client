export const getAllCategories = () => {
    return fetch(`http://localhost:8000/categories`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

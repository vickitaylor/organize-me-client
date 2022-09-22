export const getAllCategories = () => {
    return fetch(`http://localhost:8000/categories`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const createCategory = (cat) => {
    return fetch(`http://localhost:8000/categories`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(cat)
    })
        .then(res => res.json())
}

export const deleteCategory = (id) => {
    return fetch(`http://localhost:8000/categories/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`
        }
    })
}
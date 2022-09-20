export const getAllCategories = () => {
    return fetch(`https://organize-me8.herokuapp.com/categories`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const createCategory = (cat) => {
    return fetch(`https://organize-me8.herokuapp.com/categories`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(cat)
    })
        .then(res => res.json())
}
export const getAllUsers = () => {
    return fetch(`http://localhost:8000/users`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getFriends = () => {
    return fetch(`http://localhost:8000/users/friends`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getSearchUsers = (search) => {
    return fetch(`http://localhost:8000/users?search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        }
    })
        .then(res => res.json())
}

export const approve = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}/approve`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userId)
    })
}

export const remove = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}/remove`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`
        }
    })
}
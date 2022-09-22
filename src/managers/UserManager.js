export const getAllUsers = () => {
    return fetch(`https://organize-me8.herokuapp.com/users`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getFriends = () => {
    return fetch(`https://organize-me8.herokuapp.com/users/friends`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

export const getSearchUsers = (search) => {
    return fetch(`https://organize-me8.herokuapp.com/users?search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        }
    })
        .then(res => res.json())
}

export const approve = (userId) => {
    return fetch(`https://organize-me8.herokuapp.com/users/${userId}/approve`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userId)
    })
}

export const remove = (userId) => {
    return fetch(`https://organize-me8.herokuapp.com/users/${userId}/remove`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("om_token")}`
        }
    })
}
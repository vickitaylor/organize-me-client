export const getCurrentUserLikes = () => {
    return fetch(`http://localhost:8000/likes?user=${localStorage.getItem('current_user')}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}
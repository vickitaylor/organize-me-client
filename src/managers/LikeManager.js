export const getCurrentUserLikes = () => {
    return fetch(`https://organize-me8.herokuapp.com/likes?user=${localStorage.getItem('current_user')}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('om_token')}`
        },
    })
        .then(res => res.json())
}

// sanitize single user
export const sanitize = (user) => {   
    const { password, verificationtoken, reset_password, reset_token_expires, ...rest } = user
    return rest;
}


//sanitize all users
export const sanitizeUserArray = (users) => {
    return users.map((user) => {
        return sanitize(user)
    })
        
    
    // const sanitized = []

    // for (let i = 0; i < users.length; i) {
    //     sanitized.push(sanitize(users[i]))
    // }

    // return sanitized
}

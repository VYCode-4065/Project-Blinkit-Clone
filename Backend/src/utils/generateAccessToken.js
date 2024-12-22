import jwt from "jsonwebtoken"

const genereateAccessToken = (_id, email) => {
    return jwt.sign({
        _id: _id,
        email: email
    }, process.env.ACCESS_TOKEN, {
        expiresIn: '5h'
    })
}

export default genereateAccessToken;
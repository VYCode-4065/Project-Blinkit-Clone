import jwt from "jsonwebtoken"

const generateRefreshToken = (_id, name, email) => {
    return jwt.sign({
        _id,
        name,
        email
    }, process.env.REFRESH_TOKEN, {
        expiresIn: '7d'
    })
}

export default generateRefreshToken;
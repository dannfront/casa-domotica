export default function sendToken(id) {
    return jwt.sign({ id }, process.env.SECRET_JWT, {
        expiresIn: process.env.EXPIRE_JWT
    })
}
import jwt from "jsonwebtoken";

export let SECRET = '18!11'
export const auth = (req, res, next) => {
    let authorization = req.headers.authorization
    if (authorization) {
        let accessToken = authorization.split(' ')[1]
        if (!accessToken) {
            res.status(401).json({
                message: "You are anonymous"
            })
        } else {
            jwt.verify(accessToken, SECRET, (err, date) => {
                if (err) {
                    res.status(401).json({
                        message: "You are anonymous"
                    })
                } else {
                    req.decode = date
                    next()
                }
            })
        }
    } else {
        res.status(401).json({
            message: "You are anonymous"
        })
    }

}
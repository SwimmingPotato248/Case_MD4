import jwt from "jsonwebtoken";

export let SECRET = '18!11'
let USER = 0
let MERCHANT = 1
let ADMIN = 2
export const auth = (req, res, next) => {
    let authorization = req.headers.authorization
    if (authorization) {
        let accessToken = authorization.split(' ')[1]
        if (!accessToken) {
            res.status(401).json({
                message: "You are anonymous"
            })
        } else {
            jwt.verify(accessToken, SECRET, (err, data) => {
                if (err) {
                    res.status(401).json({
                        message: "You are anonymous"
                    })
                } else {
                    if (data.role === USER) {
                        req.decode = data
                        next()
                    } else if (data.role === MERCHANT) {
                        req.decode = data
                        console.log(req.decode)
                        next()
                    } else if (data.role === ADMIN) {
                        req.decode = data
                        next()
                    } else {
                        res.status(401).json({
                            message: "You are anonymous"
                        })
                    }
                }
            })
        }
    } else {
        res.status(401).json({
            message: "You are anonymous"
        })
    }

}





const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    try {
        // const token = req.header('x-api-key')
        let token = req.params.token
        if (!token) {
            return res.status(200).send({ status: false, message: `Missing authentication token in request` });
        }

        const decoded = jwt.verify(token, 'Agent')

        if (!decoded) {
            return res.status(200).send({ status: false, message: `Invalid authentication token in request` });
        }

        req.userId = decoded.agentID

        console.log("middleware==>", req.userId)



        next()
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.auth = auth;
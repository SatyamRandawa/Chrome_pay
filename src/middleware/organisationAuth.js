const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    try {
        const token = req.header('x-api-key')
        if (!token) {
            return res.status(403).send({ status: false, message: `Missing authentication token in request` });
        }

        const decoded = jwt.verify(token, 'organisation')

        if (!decoded) {
            return res.status(403).send({ status: false, message: `Invalid authentication token in request` });
        }

        req.userId = decoded.OrganisationID
        

        next()
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.auth = auth
const sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const { User, Token } = require('../models/associations')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findByPk(decoded.id, { include: [{ model: Token, where: { stringToken: token } }] })

        if (!user.tokens.length) {
            throw new Error()
        }

        req.user = user
        req.user.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth
const express = require('express')
const { User, Token } = require('../models/association')

const router = express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        console.log("asd")
        await user.save()

        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

module.exports = router
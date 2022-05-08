const express = require('express')
const axios = require('axios')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/ticket/predict', auth, async (req, res) => {
    const { method, url, body } = req;
    try {
        const response = await axios({
            url: `${process.env.PREDECT_URL}${url}`,
            method: method,
            data: body
        })
        res.status(200).send(response.data)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
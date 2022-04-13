const express = require('express')
const { User, Token } = require('../models/association')

const router = express.Router()

router.get('/user', (req ,res )=>{
    res.status(200).send("Hello from User Router")
})

module.exports = router
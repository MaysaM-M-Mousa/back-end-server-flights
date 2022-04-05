const express = require('express')
const flight = require('../models/flight')
const sequelize = require('sequelize')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send("Hello from flight router!")
})
router.get('/:quarter/:company', async (req, res)=>{
    const quarter = req.params.quarter
    const company = req.params.company
    const destResult = await flight.findAll({
        group: ['Dest'],
        attributes:['Dest', [sequelize.fn('COUNT', sequelize.col('ItinID')),'counter']], 
        where:{Quarter: quarter, AirlineCompany: company}, 
        
    })
    const originResult = await flight.findAll({
        group:['Origin'], 
        attributes:['Origin', [sequelize.fn('COUNT', sequelize.col('Origin')), 'counter2']], 
        where: {Quarter:quarter, AirlineCompany: company}
    })
    res.status(200).send({
        destination: destResult, 
        origin :originResult
    })

})

module.exports = router



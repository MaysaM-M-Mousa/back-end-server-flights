const express = require('express')
const Flight = require('../models/flight')
const sequelize = require('sequelize')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send("Hello from flight router!")
})

router.get('/company/profit/:name', async (req, res) => {
    const name = req.params.name
    try{
        const profitPerQuarter = await Flight.findAll({
            attributes: [
                'Quarter',
                [sequelize.fn('SUM', sequelize.literal('(NumTicketsOrdered*PricePerTicket)')), 'profit']
                ],
            group: ['Quarter'],
            where: {
                AirlineCompany: name
            }
        })
        if(! profitPerQuarter.length){
            return res.status(404).send('No Results Found')
        }
        res.status(200).send(profitPerQuarter)
    } catch(e){
        res.status(500).send(e)    
    }
})

router.get('/company/miles/:name/:quarter', async(req, res)=>{
    const name = req.params.name
    const quarter = req.params.quarter
    try{
        const milesFrequencies = await Flight.findAll({
            attributes:[
                "Miles", 
                [sequelize.fn('COUNT', sequelize.col('ItinID')), 'MilesFreq']
            ], 
            where: {
                AirlineCompany: name, 
                Quarter: quarter
            },
            group:['Miles']
        })
        if(! milesFrequencies.length){
            return res.status(404).send('No Results Found')
        }
        res.status(200).send(milesFrequencies)
    } catch(e){

    }
    
})

router.get('/company/path/:name/:quarter', async (req, res)=>{
    const quarter = req.params.quarter
    const company = req.params.name
    try{
        const destResult = await Flight.findAll({
            group: ['DestWac'],
            attributes:[
                'DestWac',
                [sequelize.fn('COUNT', sequelize.col('ItinID')),'DestCounter']
            ], 
            where:{
                Quarter: quarter,
                AirlineCompany: company
            },
            order: [[sequelize.literal('DestCounter'), 'DESC']],
            limit:10
        })
        const originResult = await Flight.findAll({
            group:['OriginWac'], 
            attributes:[
                'OriginWac', 
                [sequelize.fn('COUNT', sequelize.col('ItinID')), 'OriginCounter']
            ], 
            where: {
                Quarter:quarter, 
                AirlineCompany: company
            },
            oreder: [[sequelize.literal('OriginCounter'), 'DESC']],
            limit: 10
        })
        if(!destResult.length && !originResult.length){
            return res.status(404).send('No Results Found')
        }
        res.status(200).send({
            destination: destResult, 
            origin :originResult
        })
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports = router



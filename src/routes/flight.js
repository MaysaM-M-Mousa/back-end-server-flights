const express = require("express")
const Flight = require("../models/flight")
const sequelize = require("sequelize")
const convertToStates = require('../utils/convertToStates')

const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).send("Hello from flight router!")
})

router.get("/company/:name/profit", async (req, res) => {
  const airlineCompany = req.params.name
  try {
    const profitPerQuarter = await Flight.findAll({
      attributes: [
        "Quarter",
        [
          sequelize.fn(
            "SUM",
            sequelize.literal("(NumTicketsOrdered*PricePerTicket)")
          ),
          "profit",
        ],
      ],
      group: ["Quarter"],
      where: { airlineCompany },
    })
    if (!profitPerQuarter.length) {
      return res.status(404).send("No Results Found")
    }
    res.status(200).send(profitPerQuarter)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/company/:name/:quarter/miles", async (req, res) => {
  const airlineCompany = req.params.name
  const quarter = req.params.quarter
  try {
    const milesFrequencies = await Flight.findAll({
      attributes: [
        "Miles",
        [sequelize.fn("COUNT", sequelize.col("MktID")), "MilesFreq"],
      ],
      where: {
        airlineCompany,
        quarter,
      },
      group: ["Miles"],
    })
    if (!milesFrequencies.length) {
      return res.status(404).send("No Results Found")
    }
    res.status(200).send(milesFrequencies)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/company/:name/:quarter/:type/path", async (req, res) => {
  const quarter = req.params.quarter
  const airlineCompany = req.params.name
  const type = req.params.type
  const limit = req.query.limit
  const typeVal = type == "origin" || type == "dest" ? type : null
  if (!typeVal) {
    return res.status(400).send("Bad Value For Type")
  }
  try {
    const result = await Flight.findAll({
      group: [typeVal],
      attributes: [
        typeVal,
        [sequelize.fn("COUNT", sequelize.col("MktID")), "counter"],
      ],
      where: {
        quarter,
        airlineCompany,
      },
      order: [[sequelize.literal("counter"), "DESC"]],
      limit: limit ? parseInt(limit) : undefined,
    })
    if (!result.length) {
      return res.status(404).send("No Results Found")
    }
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/company/:quarter/flights-per-company", async (req, res) => {
  const quarter = req.params.quarter
  try {
    const flightsFreq = await Flight.findAll({
      attributes: [
        "AirlineCompany",
        [sequelize.fn("COUNT", sequelize.col("MktID")), "flightsFreq"],
      ],
      where: { quarter },
      group: ["AirlineCompany"],
    })
    if (!flightsFreq.length) {
      return res.status(404).send("No Results Found")
    }
    res.status(200).send(flightsFreq)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/state/:quarter/:type/flights-per-state", async (req, res) => {
  const quarter = req.params.quarter
  const type = req.params.type
  const typeVal = type == "origin" || type == "dest" ? type : null
  if (!typeVal) {
    return res.status(400).send("Bad Value For Type")
  }
  try {
    const flightsFreq = await Flight.findAll({
      attributes: [
        type + "Wac",
        [sequelize.fn("COUNT", sequelize.col("MktID")), "flightsFrequency"],
      ],
      where: { quarter },
      group: [type + "Wac"],
    })
    if (!flightsFreq.length) {
      return res.status(404).send("No Results Found")
    }
    const processedResult = await convertToStates(flightsFreq, [type + "Wac"])
    res.status(200).send(processedResult)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/company/:quarter/profit-per-company", async (req, res) => {
  const quarter = req.params.quarter
  try {
    const profitPerCompany = await Flight.findAll({
      attributes: [
        "AirlineCompany",
        [
          sequelize.fn(
            "SUM",
            sequelize.literal("(NumTicketsOrdered*PricePerTicket)")
          ),
          "profitsSum",
        ],
      ],
      group: ["AirlineCompany"],
      where: { quarter },
    })
    if (!profitPerCompany.length) {
      return res.status(404).send("No Results Found")
    }
    res.status(200).send(profitPerCompany)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/company/:quarter/miles-per-company", async (req, res) => {
  const quarter = req.params.quarter
  try {
    const milePerCompany = await Flight.findAll({
      attributes: [
        "AirlineCompany",
        [sequelize.fn("SUM", sequelize.col("Miles")), "MilesSum"],
      ],
      group: ["AirlineCompany"],
      where: { quarter },
    })
    if (!milePerCompany.length) {
      return res.status(404).send("No Results Found")
    }
    res.status(200).send(milePerCompany)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/state/:quarter/profit-per-state", async (req, res) => {
  const quarter = req.params.quarter
  try {
    const profitPerState = await Flight.findAll({
      attributes: [
        "OriginWac",
        [
          sequelize.fn(
            "SUM",
            sequelize.literal("(NumTicketsOrdered*PricePerTicket)")
          ),
          "profitsSum",
        ],
      ],
      group: ["OriginWac"],
      where: { quarter },
    })
    if (!profitPerState.length) {
      return res.status(404).send("No Results Found")
    }
    const processedResult = await convertToStates(profitPerState, 'OriginWac')
    res.status(200).send(processedResult)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router

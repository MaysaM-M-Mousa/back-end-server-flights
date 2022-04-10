const { DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../db/mysql.js')
class Flight extends Model {}
 Flight.init({
    ItinID:{
        type: DataTypes.BIGINT, 
        field : 'ItinID'        
    }, 
    MktID:{
        type: DataTypes.BIGINT, 
        field: 'MktID', 
    }, 
    MktCoupons:{
        type: DataTypes.INTEGER, 
        field: 'MktCoupons'
    }, 
    Quarter:{
        type: DataTypes.INTEGER, 
        field: 'Quarter'
    }, 
    Origin:{
        type: DataTypes.TEXT, 
        field: 'Origin'
    }, 
    OriginWac:{
        type: DataTypes.INTEGER, 
        field: 'OriginWac'
    }, 
    Dest:{
        type: DataTypes.TEXT, 
        field: 'Dest'
    }, 
    DestWac:{
        type: DataTypes.INTEGER, 
        field: 'DestWac'
    }, 
    Miles:{
        type: DataTypes.FLOAT, 
        field: 'Miles'
    }, 
    ContiguousUSA: {
        type:DataTypes.INTEGER, 
        field: 'ContiguousUSA'
    }, 
    NumTicketsOrdered:{
        type:DataTypes.FLOAT, 
        field: 'NumTicketsOrdered'
    }, 
    AirlineCompany:{
        type:DataTypes.TEXT, 
        field: 'AirlineCompany'
    }, 
    PricePerTicket:{
        type:DataTypes.FLOAT, 
        field: 'PricePerTicket'
    }
},
  { 
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    modelName: 'flight',
    tableName: 'flight',
    sequelize,
  })

module.exports = Flight
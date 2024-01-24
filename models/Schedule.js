// This is for our water schedule for the users chosen plants
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Plant = require('./Plant');


class Schedule extends Model {}

Schedule.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        plant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'plant',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        }, 
        // water_date: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        // },
        // watered: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: false,
        // },
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'schedule',
    }
);

module.exports = Schedule;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Schedule = require('./Schedule');
const User = require('./User');

class Plant extends Model {}

Plant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,  // I took out the autoIncrement because 
                               // I think we want to use the id from the API -CRN
        },
        common_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        watering: {
            type: DataTypes.STRING,
        },
        sunlight: {
            type: DataTypes.STRING,
        },
        poisonous_to_pets: {
            type: DataTypes.BOOLEAN,
        },
        // url for plant image
        image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'plant',
    }
);

module.exports = Plant;
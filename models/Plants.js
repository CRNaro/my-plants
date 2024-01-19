const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plant extends Model {}

Plant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, //not sure if this should be auto-incremented, because I think we need to actual plant ID from the Plant List to connect the plant to the Plant Details which holds more data.
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
        // not sure how to add the image url here
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
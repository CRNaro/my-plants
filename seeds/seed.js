const sequelize = require('../config/connection');
const { Plant, User, Schedule } = require('../models');

const plantData = require('../seeds/plantData.json')
const userData = require('../seeds/userData.json')
const scheduleData = require('../seeds/scheduleData.json')

const seedDatabase = async () => {
    await sequelize.sync({force: true});
//Create users table
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
//

process.exit(0);  
};

seedDatabase()
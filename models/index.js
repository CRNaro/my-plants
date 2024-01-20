const User = require('./User');
const Plant = require('./Plant');
const Schedule = require('./Schedule');

// Associations - I think this is right, but I'm not sure if we need to have more

User.belongsToMany(Plant, { through: Schedule, 
    foreignKey: 'user_id', 
    onDelete: 'RESTRICT'
});
Plant.belongsToMany(User, { through: Schedule,
    foreignKey: 'plant_id',
    onDelete: 'RESTRICT'
});
Schedule.belongsTo(Plant, {
    foreignKey: 'plantId',
    onDelete: 'RESTRICT',
});

Plant.hasMany(Schedule);
User.hasMany(Schedule);


module.exports = { User, Plant, Schedule };
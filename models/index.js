const User = require('./User');
const Plants = require('./Plants');
const Schedule = require('./Schedule');

User.belongsToMany(Plants, {
    
})



module.exports = { User, Plants, Schedule };
const sequelize = require("../config/connection");
const { Plant, User, Schedule } = require("../models");

const plantData = require("../seeds/plantData.json");
const userData = require("../seeds/userData.json");
const scheduleData = require("../seeds/scheduleData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Create plants, users, and schedules
    const plants = await Plant.bulkCreate(plantData, {
      individualHooks: true,
      returning: true,
    });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const schedules = await Schedule.bulkCreate(scheduleData, {
      individualHooks: true,
      returning: true,
    });

    console.log("Database seeded!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();

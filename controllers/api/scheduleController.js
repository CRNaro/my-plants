// This will be the controller for the schedule and will handle the various HTTP requests for managing the schedule
const Schedule = require("../../models/Schedule");
const Plant = require("../../models/Plant");

const scheduleController = {
  // GET route to retrieve all the schedules with associated plant and user
  getSchedules: async (req, res) => {
    try {
      const schedules = await Schedule.findAll({
        include: [{ model: Plant }, { model: User }],
        where: { user_id: req.session.user_id }, // is the session needed in the request? --CRN
      });
      res.status(200).json(scheduleData);
    } catch (err) {
      res.status(500).json({ err: "internal server error" });
    }
  },
  // POST route to create a new schedule
  createSchedule: async (req, res) => {
    try {
      const { plantId, wateringTime, frequency, waterAmount } = req.body;
      const newSchedule = await Schedule.create({
        plantId,
        wateringTime,
        frequency,
        waterAmount,
        user_id: req.session.user_id,
      });
      res.status(200).json(newSchedule);
    } catch (err) {
      res.status(500).json({ err: "internal server error" });
    }
  },
  // DELETE route to delete a schedule
  deleteSchedule: async (req, res) => {
    try {
      const { scheduleId } = req.params;
      const schedule = await Schedule.findByPk(scheduleId);
      if (!schedule) {
        return;
        res.status(404).json({ err: "no schedule found with this id" });
      }
      await Schedule.destroy({ where: { id: scheduleId } });
    } catch (err) {
      res.status(500).json({ err: "internal server error" });
    }
  },
};

module.exports = scheduleController;

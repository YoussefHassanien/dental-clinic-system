const Doctor = require("../models/doctorModel");

function generateDailySlots(startHour, endHour) {
  const slots = [];
  const start = parseInt(startHour.split(":")[0], 10);
  const end = parseInt(endHour.split(":")[0], 10);

  if (start >= end || start < 0 || end > 24) {
    throw new Error(
      "Invalid start or end hour. Ensure startHour is before endHour and within valid 24-hour format."
    );
  }

  for (let hour = start; hour < end; hour++) {
    const slotStart = `${hour.toString().padStart(2, "0")}:00`;
    const slotEnd = `${(hour + 1).toString().padStart(2, "0")}:00`;
    slots.push({ startTime: slotStart, endTime: slotEnd });
  }
  return slots;
}
function generateWeeklySlots(startHour, endHour) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const weeklySlots = daysOfWeek.map((day) => ({
    day,
    slots: generateDailySlots(startHour, endHour),
  }));

  return weeklySlots;
}

async function addSlot(doctorId, day, startTime, endTime) {
  await Doctor.updateOne(
    { _id: doctorId, "thisWeekAvailability.day": day },
    { $push: { "thisWeekAvailability.$.slots": { startTime, endTime } } }
  );
}

async function bookSlot(doctorId, day, startTime, endTime) {
  await Doctor.updateOne(
    { _id: doctorId, "thisWeekAvailability.day": day },
    { $pull: { "thisWeekAvailability.$.slots": { startTime, endTime } } }
  );
}

module.exports = { addSlot, bookSlot, generateWeeklySlots };

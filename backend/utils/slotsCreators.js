const Doctor = require("../models/doctorModel");
const asyncHandler = require("express-async-handler");

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

const removeBookedSlot = asyncHandler(async (doctorId, date, startTime) => {
  const appointmentDate = new Date(date);
  const dayIndex = appointmentDate.getDay();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[dayIndex];

  // Find the doctor
  const doctor = await Doctor.findOne({ userId: doctorId });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // Find the availability for the given day
  const dayAvailability = doctor.thisWeekAvailability.find(
    (availability) => availability.day === dayName
  );

  if (!dayAvailability) {
    throw new Error(`No availability defined for ${dayName}`);
  }

  // Find the slot to remove
  const slotIndex = dayAvailability.slots.findIndex(
    (slot) => slot.startTime === startTime
  );

  if (slotIndex === -1) {
    throw new Error(`Slot starting at ${startTime} on ${dayName} not found`);
  }

  // Remove the slot
  dayAvailability.slots.splice(slotIndex, 1);

  // Save the updated document
  await doctor.save();
  return { message: "Slot removed successfully" };
});

const addBookedSlot = asyncHandler(
  async (doctorId, date, startTime, endTime) => {
    const appointmentDate = new Date(date);
    const dayIndex = appointmentDate.getDay();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[dayIndex];

    // Find the doctor
    const doctor = await Doctor.findOne({ userId: doctorId });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    // Find the availability for the given day
    const dayAvailability = doctor.thisWeekAvailability.find(
      (availability) => availability.day === dayName
    );

    // Check if the slot already exists
    const slotExists = dayAvailability.slots.some(
      (slot) => slot.startTime === startTime
    );

    if (slotExists) {
      throw new Error(
        `Slot starting at ${startTime} on ${dayName} already exists`
      );
    }

    dayAvailability.slots.push({ startTime, endTime });

    await doctor.save();
    console.log("Slot added successfully");
    return { message: "Slot added successfully" };
  }
);

module.exports = {
  addSlot,
  generateWeeklySlots,
  removeBookedSlot,
  addBookedSlot,
};

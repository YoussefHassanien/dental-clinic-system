const doctorsAPI = import.meta.env.VITE_GET_DOCTORS_INFO_API;
const bookAppointmentAPI = import.meta.env.VITE_BOOK_APPOINTMENT_API;
import { Doctor, DoctorAPIResponse } from "./constants.ts";

export const getDoctorsCardsInfo = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(`${doctorsAPI}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch doctors' cards info");
    }

    const fetchedData = await response.json();
    const formattedData: Doctor[] = fetchedData.data.map(
      (item: DoctorAPIResponse) => ({
        id: item.userId,
        name: `Dr. ${item.firstName} ${item.lastName}`,
        yearsOfExperience: item.yearsOfExperience,
        rating: item.rating,
        sessions: item.totalNumberOfSessions,
        specialities: item.specialities,
        appointment:
          item.nearestAppointment !== "Not implemented"
            ? new Date(item.nearestAppointment)
            : new Date(),
        topRated: item.rating >= 4.6,
        gender: item.gender,
        picture: item.profilePicture,
      })
    );
    console.log("Doctors' cards info:", formattedData);
    return formattedData;
  } catch (error) {
    console.error("Error fetching doctors' cards info:", error);
    return [];
  }
};

export const getDoctorAvailability = async (id: string, token: string) => {
  try {
    const response = await fetch(`${doctorsAPI}/${id}/slots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch available slots");
    }

    const fetchedData = await response.json();
    const formattedData: { [key: string]: string[] } = {};
    fetchedData.data.availability.forEach(
      (item: {
        day: string;
        slots: { startTime: string; endTime: string }[];
      }) => {
        formattedData[item.day] = item.slots.map(
          (slot: { startTime: string; endTime: string }) =>
            `${slot.startTime}-${slot.endTime}`
        );
      }
    );
    return formattedData;
  } catch {
    return {};
  }
};

export const bookAppointment = async (
  id: string,
  date: string,
  startTime: string,
  endTime: string,
  pay: boolean,
  token: string
) => {
  try {
    const response = await fetch(`${bookAppointmentAPI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        doctorId: id,
        date,
        startTime,
        endTime,
        pay,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to book appointment");
    }

    return true;
  } catch {
    return false;
  }
};

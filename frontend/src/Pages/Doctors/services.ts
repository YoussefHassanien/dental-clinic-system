const doctorsAPI = import.meta.env.VITE_GET_DOCTORS_INFO_API;
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

    return formattedData;
  } catch (error) {
    console.error("Error fetching doctors' cards info:", error);
    return [];
  }
};

const appointmentsAPI = import.meta.env.VITE_GET_TODAY_APPOINTMENTS_API;
const doctorNearestAppointmentAPI = import.meta.env
  .VITE_GET_DOCTORS_NEAREST_APPOINTMENTS_API;

export const getAppointments = async (token: string) => {
  try {
    const response = await fetch(`${appointmentsAPI}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }

    const fetchedData = await response.json();
    return fetchedData.data;
  } catch {
    return [];
  }
};

export const getDoctorsNearestAppointments = async (token: string) => {
  try {
    const response = await fetch(`${doctorNearestAppointmentAPI}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }

    const fetchedData = await response.json();
    return fetchedData.data;
  } catch {
    return [];
  }
};

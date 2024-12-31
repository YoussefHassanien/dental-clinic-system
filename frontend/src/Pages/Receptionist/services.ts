const appointmentsAPI = import.meta.env.VITE_GET_TODAY_APPOINTMENTS_API;
const doctorNearestAppointmentAPI = import.meta.env
  .VITE_GET_DOCTORS_NEAREST_APPOINTMENTS_API;
const bookAppointmentAPI = import.meta.env
  .VITE_RECEPTIONIST_BOOK_APPOINTMENT_API;
const receptionitInfoAPI = import.meta.env.VITE_GET_USER_INFO_API;

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

export const bookAppointment = async (
  token: string,
  doctorId: string,
  patientEmail: string,
  startTime: string
) => {
  try {
    const response = await fetch(`${bookAppointmentAPI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        doctorId,
        patientEmail,
        startTime,
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

export const getReceptionistData = async (token: string) => {
  try {
    const response = await fetch(`${receptionitInfoAPI}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch receptionist data");
    }

    const fetchedData = await response.json();
    console.log(fetchedData.data);
    return fetchedData.data;
  } catch {
    return {};
  }
};

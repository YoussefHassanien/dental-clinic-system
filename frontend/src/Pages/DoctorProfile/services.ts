const loginAPI = import.meta.env.VITE_GET_CURRENT_DOCTOR_API;
const requestAPI = import.meta.env.VITE_SUPPLY_REQUEST_API; 

export const get_current_doctor = async (token: string) => {
  console.log(token);
  try {
    const response = await fetch(`${loginAPI}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("doctor fail");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
};

// Function to fetch existing supply requests
export const fetch_requests = async (token: string) => {
  try {
    const response = await fetch(`${requestAPI}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch requests");
    }

    const data = await response.json();
    console.log("Requests: ", data);
    return data;
  } catch (e) {
    throw e;
  }
};

// Function to create a new supply request
export const create_request = async (token: string, materialId: string) => {
  try {
    const response = await fetch(`${requestAPI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ materialId }),
    });

    if (!response.ok) {
      throw new Error("Failed to create request");
    }

    const data = await response.json();
    console.log("New Request: ", data);
    return data;
  } catch (e) {
    throw e;
  }
};

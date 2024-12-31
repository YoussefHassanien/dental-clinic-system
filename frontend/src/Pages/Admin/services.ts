

const loginAPI = import.meta.env.VITE_STATISTICS_API;
const appointmentAPI = import.meta.env.VITE_APPOINTMENTS_STATISTICS_API;
const listOfDoctorAPI= import.meta.env.VITE_GET_LIST_OF_DOCTORS
const listOfRequestAPI= import.meta.env.VITE_GET_LIST_OF_REQUESTS

export const get_current_statistics = async (token:string) => {
  try {
    const response = await fetch(`${loginAPI}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
        "Authorization" : `bearer ${token}`   

      },
      
    });
    if (!response.ok) {
      throw new Error("statistics fail");
    }

    const data = await response.json();
   
    return data

    
   
  } catch(e) {
    
    throw e
  }
  
};

export const get_appointment_statistics = async (token: string) => {
  console.log(token);
  try {
    const response = await fetch(`${appointmentAPI}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorText = await response.text(); // Log the raw response
      console.error("Response not OK:", errorText);
      throw new Error("appointment fail");
    }
    const reports = await response.json();
    console.log("appointments", reports);
    return reports;
  } catch (e) {
    console.error("Error fetching appointment statistics:", e);
    throw e;
  }
};

export const get_list_of_doctors = async (token:string) => {
    try {
      const response = await fetch(`${listOfDoctorAPI}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", 
          "Authorization" : `bearer ${token}`   
  
        },
        
      });
      if (!response.ok) {
        throw new Error("list of doctors fail");
      }
  
      const result = await response.json();
     
      return result
  
      
     
    } catch(e) {
      
      throw e
    }
    
  };

  export const get_list_of_requests = async (token:string) => {
      try {
        const response = await fetch(`${listOfRequestAPI}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", 
            "Authorization" : `bearer ${token}`   
    
          },
          
        });
        if (!response.ok) {
          throw new Error("list of request fail");
        }
    
        const request = await response.json();
       
        return request
    
        
       
      } catch(e) {
        
        throw e
      }
      
    };
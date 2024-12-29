

const loginAPI = import.meta.env.VITE_GET_CURRENT_PATIENT_API;
const reportsAPI = import.meta.env.VITE_GET_DOCUMENT_OF_SPECIFIC_PATIENT;

export const get_current_patient = async (

token:string  
 

) => {
  console.log(token)
  try {
    const response = await fetch(`${loginAPI}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
        "Authorization" : `bearer ${token}`   

      },
      
    });
    if (!response.ok) {
      throw new Error("patient fail");
    }

    const data = await response.json();
    console.log(data)
    return data

    
   
  } catch(e) {
    
    throw e
  }
  
};

export const get_current_patient_report = async (token: string) => {
  console.log(token);
  try {
    const response = await fetch(`${reportsAPI}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("patient report fail");
    }
    const reports = await response.json();
    console.log(reports);
    return reports;
  } catch (e) {
    throw e;
  }
};
  



const loginAPI = import.meta.env.VITE_GET_CURRENT_DOCTOR_API;

export const get_current_doctor = async (

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
      throw new Error("doctor fail");
    }

    const data = await response.json();
    console.log(data)
    return data

    
   
  } catch(e) {
    
    throw e
  }
  
};

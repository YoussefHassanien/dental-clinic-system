

const loginAPI = import.meta.env.VITE_STATISTICS_API;

export const get_current_statistics = async (

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
      throw new Error("statistics fail");
    }

    const data = await response.json();
    console.log(data)
    return data

    
   
  } catch(e) {
    
    throw e
  }
  
};

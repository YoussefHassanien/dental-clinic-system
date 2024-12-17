const loginAPI = import.meta.env.VITE_LOGIN_API;

export const handleLogin = async (
  event: React.FormEvent,
  email: string,
  password: string,
  setIsErrorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void
) => {
  event.preventDefault();
  // Handle login logic here
  try {
    const response = await fetch(`${loginAPI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    // Handle successful login
    const data=await response.json()
    console.log(data)
    localStorage.setItem("token", data.token)
    localStorage.setItem("DoctorData", JSON.stringify(data.data))
    if (data.role === "patient"){
      navigate("/patient")
    }
    else{
      navigate("/doctor-profile")
    }
     
  } catch {
    setIsErrorVisible(true);
  }
};

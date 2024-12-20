import { Dispatch } from "react";
import { AuthAction } from "../../Common/Contexts/Auth/AuthProvider";

const loginAPI = import.meta.env.VITE_LOGIN_API;

export const handleLogin = async (
  event: React.FormEvent,
  email: string,
  password: string,
  setIsErrorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void,
  dispatch: Dispatch<AuthAction>
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

    const data = await response.json();

    const formattedData = {
      role: data.data.role,
      token: data.token,
    };

    localStorage.setItem("user", JSON.stringify(formattedData.role));
    localStorage.setItem("token", JSON.stringify(formattedData.token));

    dispatch({ type: "LOGIN", payload: formattedData });

    navigate(`/${formattedData.role}-profile`);
  } catch {
    setIsErrorVisible(true);
  }
};

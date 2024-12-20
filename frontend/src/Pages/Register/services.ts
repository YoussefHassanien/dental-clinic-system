import {
  combineCountryCodeWithPhoneNumber,
  combineDate,
} from "../../Utils/helpers";
import { Dispatch } from "react";
import { AuthAction } from "../../Common/Contexts/Auth/AuthProvider";

const registerAPI = import.meta.env.VITE_REGISTER_API;

export const handleRegister = async (
  event: React.FormEvent,
  email: string,
  password: string,
  confirmPassword: string,
  ssn: string,
  phoneNumber: string,
  countryCode: string,
  day: string,
  month: string,
  year: string,
  firstName: string,
  lastName: string,
  gender: string,
  setIsErrorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorText: React.Dispatch<React.SetStateAction<string>>,
  navigate: (path: string) => void,
  dispatch: Dispatch<AuthAction>
) => {
  event.preventDefault();

  try {
    const validPhoneNumber = combineCountryCodeWithPhoneNumber(
      countryCode,
      phoneNumber
    );

    const validDate = combineDate(day, month, year);

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (ssn.toString().length !== 14) {
      throw new Error("SSN must be 14 digits");
    }

    const response = await fetch(`${registerAPI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fName: firstName,
        lName: lastName,
        ssn,
        dateOfBirth: validDate,
        gender,
        email: email.toLowerCase(),
        phone: validPhoneNumber,
        password,
        passwordComfirm: confirmPassword,
        bloodType: "O+",
      }),
    });

    if (!response.ok) {
      throw new Error("Could not register you, please try again later");
    }
    const data = await response.json();

    const formattedData = {
      role: data.role,
      token: data.token,
    };
    localStorage.setItem("user", JSON.stringify(formattedData.role));
    localStorage.setItem("token", JSON.stringify(formattedData.token));

    dispatch({ type: "LOGIN", payload: formattedData });

    navigate(`/${formattedData.role}-profile`);
  } catch (error) {
    if (error instanceof Error) {
      setErrorText(error.message);
    } else {
      setErrorText("Could not register you, please try again later");
    }
    setIsErrorVisible(true);
  }
};

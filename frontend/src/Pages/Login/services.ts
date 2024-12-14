export const handleLogin = async (
  event: React.FormEvent,
  email: string,
  password: string,
  setIsErrorVisible: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void
) => {
  event.preventDefault();
  // Simulate an error
  if (email === "" || password === "") {
    setIsErrorVisible(true);
  } else {
    setIsErrorVisible(false);
    // Handle login logic here
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);
      if (!response.ok) {
        console.log("API response not okay");
        throw new Error("Login failed");
      }
      // Handle successful login
      navigate("/");
      console.log("Login successful");
    } catch {
      setIsErrorVisible(true);
    }
  }
};

import { Link, useLocation, useNavigate } from "react-router-dom";
import { CSSProperties } from "react";
import logo from "../../../assets/tooth.png";
import { navbarTabs } from "./constants";
import Button from "../Button/button";
import { useAuthContext } from "../../Contexts/Auth/AuthHook";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-row justify-start items-center space-x-32 font-serif p-4 w-full">
      <div className="flex flex-row items-center space-x-4">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <h1 className="text-4xl font-bold text-customBlue">
          Denti
          <span className="text-black">Plus</span>
        </h1>
      </div>

      <div className="flex flex-row items-center space-x-8">
        {navbarTabs.map((tab) => (
          <Link
            key={tab.label}
            to={tab.path}
            className={`tab text-xl ${
              location.pathname === tab.path ? "tab-selected" : ""
            }`}
            style={
              {
                "--tab-color": "black",
                "--tab-hover-color": "#1a76d1",
                "--tab-selected-color": "#1a76d1",
              } as CSSProperties
            }
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-row justify-evenly items-center space-x-4">
        {user ? (
          <>
            <Button
              text="Profile"
              bgColor=""
              hoverBgColor=""
              textColor=""
              hoverTextColor=""
              onClick={() => navigate(`/${user.role}-profile`)}
            />
            <Button
              text="Log out"
              bgColor="#2c2d3f"
              hoverBgColor="#1a76d1"
              textColor=""
              hoverTextColor=""
              onClick={logout}
            />
          </>
        ) : (
          <>
            <Button
              text="Log in"
              bgColor=""
              hoverBgColor=""
              textColor=""
              hoverTextColor=""
              onClick={() => navigate("/login")}
            />
            <Button
              text="Register"
              bgColor="#2c2d3f"
              hoverBgColor="#1a76d1"
              textColor=""
              hoverTextColor=""
              onClick={() => navigate("/register")}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

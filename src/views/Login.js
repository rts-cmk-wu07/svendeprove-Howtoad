import axios from "axios";
import { useContext, useState } from "react";
import { TokenContext } from "../context/TokenProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCookie from "react-use-cookie";

const Login = () => {
  const { setToken } = useContext(TokenContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [tokenCookie, setTokenCookie] = useCookie("login-cookie", "");

  const validateForm = () => {
    if (username.trim() === "" || password.trim() === "") {
      toast.error("Udfyld venligst både brugernavn og adgangskode");
      return false;
    }
    return true;
  };

  async function handleLogin(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const loginPromise = async () => {
      const response = await axios.post("http://localhost:4000/auth/token", {
        username,
        password,
      });

      if (response.status === 200) {
        const msDate = response.data.validUntil - Date.now();
        const validFor = msDate / 1000 / 60 / 60 / 24;
        if (rememberMe) {
          setTokenCookie(JSON.stringify(response.data), {
            days: validFor,
            SameSite: "Strict",
          });
        }
        setToken(response.data);
        navigate("/kalender");
      }
    };

    toast.promise(loginPromise(), {
      pending: "Logger ind...",
      success: {
        render: () => {
          return "";
        },
      },
      error: "Brugernavn eller kodeord er forkert",
    });
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="w-full h-screen"
        style={{
          backgroundImage: `url('/images/splash-image.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ToastContainer />
        <div className=" max-w-[332px] absolute z-40 left-10 mt-[220px]">
          <h1 className="text-xLarge text-primaryHeading ">Log ind</h1>

          <form onSubmit={handleLogin} className="grid">
            <label>
              <input
                type="text"
                placeholder="Brugernavn"
                name="username"
                className="w-[332px] h-[50px] pl-5 placeholder-placeholderText"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              <input
                type="password"
                placeholder="adgangskode"
                name="password"
                className="w-[332px] h-[50px] pl-5 placeholder-placeholderText mt-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="flex items-center mt-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Husk mig
            </label>
            <button type="submit" className="buttonStyle mx-auto mt-8">
              Log ind
            </button>
          </form>
        </div>
        <div className="w-[756px] h-[480px] bg-weirdBG rotate-[-27deg] ml-[-190px] pt-[130px] absolute top-[17%]"></div>
      </div>
    </div>
  );
};

export default Login;

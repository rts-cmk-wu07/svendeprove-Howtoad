import axios from "axios";
import { useContext, useState } from "react";
import { TokenContext } from "../context/TokenProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setToken } = useContext(TokenContext);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  async function handleLogin(event) {
    event.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await axios.post("http://localhost:4000/auth/token", {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      if (response.status === 200) {
        setToken(response.data);
        console.log(response.data);
        setIsLoggingIn(false);
        navigate("/calendar");
      }
    } catch (error) {
      setIsLoggingIn(false);
      console.log(error);
    }
  }

  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: `url('/images/splash-image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" max-w-[332px] absolute z-40 left-10 mt-[220px]">
        <h1 className="text-xLarge text-primaryHeading ">Log ind</h1>

        <form onSubmit={handleLogin} className="grid">
          <label>
            <input
              type="text"
              placeholder="Brugernavn"
              name="username"
              className="w-[332px] h-[50px] pl-5 placeholder-placeholderText"
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="adgangskode"
              name="password"
              className="w-[332px] h-[50px] pl-5 placeholder-placeholderText mt-4"
            />
          </label>
          <button type="submit" className="buttonStyle mx-auto mt-8">
            Log ind
          </button>
        </form>
      </div>
      <div className="w-[756px] h-[480px] bg-weirdBG rotate-[-27deg] ml-[-190px] pt-[130px] absolute top-[17%]"></div>
    </div>
  );
};

export default Login;

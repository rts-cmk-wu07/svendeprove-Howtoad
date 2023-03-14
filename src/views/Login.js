import axios from "axios";
import { useContext } from "react";
import { TokenContext } from "../context/TokenProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/token", {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      if (response.status === 200) {
        setToken(response.data);
        console.log(response.data.role);
        navigate("/calendar");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-xLarge">Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          <input type="text" placeholder="Brugernavn" name="username" />
        </label>
        <label>
          <input type="password" placeholder="adgangskode" name="password" />
        </label>
        <button type="submit">Log ind</button>
      </form>
    </>
  );
};

export default Login;

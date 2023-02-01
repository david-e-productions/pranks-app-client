import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const reqbody = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, reqbody)
      .then((res) => {
        console.log("JWT TOKEN", res.data.authToken);
        storeToken(res.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage lightblue-bg" style={{ height: "100vh" }}>
      <h1 className="m-b-20">Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label className={"form-label-blue-2"}>Email:</label>
        <input
          className={"input-yellow m-b-20"}
          type="text"
          name="email"
          value={email}
          onChange={handleEmail}
        ></input>
        <label className={"form-label-blue-2"}>Password</label>
        <input
          className={"input-yellow m-b-20"}
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        ></input>
        <button className="btn-blue" type="submit">
          Login
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h1>Don't have an account yet?</h1>
      <Link className="btn-reverse" to={"/signup"}>
        Sign Up
      </Link>
    </div>
  );
}

export default LoginPage;

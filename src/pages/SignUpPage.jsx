import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const navigate = useNavigate();

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const reqBody = { email, password, name };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, reqBody)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        const errorDescription = err.response.data.messsage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage lightblue-bg" style={{ height: "100vh" }}>
      <h1 className="m-b-20">Sign Up</h1>
      <form onSubmit={handleSignUpSubmit}>
        <label className={"form-label-blue-2"}>Email:</label>
        <input
          className={"input-yellow m-b-20"}
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        ></input>
        <label className={"form-label-blue-2"}>Username:</label>
        <input
          className={"input-yellow m-b-20"}
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        ></input>
        <label className={"form-label-blue-2"}>Password:</label>
        <input
          className={"input-yellow m-b-20"}
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        ></input>
        <button className="btn-blue" type="submit">
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="display-6">Already have an account?</p>
      <Link className="btn-reverse" to={"/login"}>
        Login
      </Link>
    </div>
  );
}

export default SignUpPage;

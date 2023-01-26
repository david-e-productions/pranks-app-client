import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/pranks">
        <button>All Pranks</button>
      </Link>
      {isLoggedIn && (
        <>
        <Link to='/mypranks'>
        <button>My Pranks</button>

        </Link>
          <button onClick={logOutUser}>Logout</button>{" "}
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

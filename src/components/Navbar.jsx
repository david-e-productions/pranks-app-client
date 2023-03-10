import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, } from "../context/auth.context";


function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              <button type="button" className="btn-blue">
                Home
              </button>
            </Link>
            <Link className="nav-link" to="/pranks">
              <button type="button" className="btn-blue">
                All Pranks
              </button>
            </Link>
            {isLoggedIn && (
              <>
                <Link className="nav-link" to="/mypranks">
                  <button type="button" className="btn-blue">
                    My Pranks
                  </button>
                </Link>
                <Link className="nav-link" to="/addprank">
                  <button type="button" className="btn-blue">
                    Add a Prank
                  </button>
                </Link>
                <Link className="nav-link justify-content-end" to='/'>
                  <button className="btn-blue" onClick={()=>{
                    
                    logOutUser()
                    }}>
                    Logout
                  </button>
                </Link>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Link className="nav-link" to="/signup">
                  {" "}
                  <button type="button" className="btn-blue">
                    Sign Up
                  </button>{" "}
                </Link>
                <Link className="nav-link" to="/login">
                  {" "}
                  <button type="button" className="btn-blue">
                    Login
                  </button>{" "}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

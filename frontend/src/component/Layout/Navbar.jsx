import { useNavigate } from "react-router-dom";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAxios } from "../hooks/Axios/useAxios";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const { fetchData } = useAxios();

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  //logout function
  const handleLogout = async () => {
    try {
      await fetchData({
        url: 'users/logout',
        method: 'POST',
        credentials: 'include'
      })
      setUser(null);
      navigate('/login')
    } catch (error) {
      console.log('Logout error: ', error)
    }
  };

  return (
    <header>
      <div className="div-1">
        <img src="/Pfix.jpg" alt="logo" />
        {user && (
          <h3>Hi, {user?.firstName}</h3>
        )}
      </div>
      <nav className={isOpen ? "responsive_nav" : ""}>
        <div className="div-2">
          {!user && (
            <div>
              <NavLink to="/login">
                <span>Login</span>
              </NavLink>
              <button onClick={handleSignUp}>Sign up</button>
            </div>
          )}

          {user && (
            <div>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}

          {user && (
            <NavLink to="/">
            <span>
              <FaHome />
            </span>
          </NavLink>
          )}
          
        </div>
        <button className="nav-btn nav-close-btn" onClick={toggleNavBar}>
          <FaTimes />
        </button>
      </nav>

      {!isOpen && (
        <button className="nav-btn" onClick={toggleNavBar}>
          <FaBars />
        </button>
      )}
    </header>
  );
};

export default NavBar;

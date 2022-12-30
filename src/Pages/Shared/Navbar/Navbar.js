import React, { useContext } from "react";
import { Link } from "react-router-dom";
import lgo from "../../../assets/lgo.png";
import { AuthContext } from "../../../contexts/AuthProvider";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((e) => console.log(e));
  };
  const menuItem = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        {/* <Link to="/myproduct">My product</Link> */}
      </li>
      <li>
        <Link to="/blog">Media</Link>
      </li>
      <li>
        <Link to="/about">Massage</Link>
      </li>
      {/* <li>
        <Link to="/"></Link>
      </li> */}
      {user?.uid ? (
        <>
          <li>
            {/* <Link to="/dashboard">Dashboard</Link> */}
            <Link to="/about">About</Link>
          </li>
          <li>
            {" "}

            {/* <button className="">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  {user?.photoURL ? (
                    <>
                      <img src={user?.photoURL} alt="" />
                    </>
                  ) : (
                    <p>noname</p>
                  )}
                </div>
              </div>
            </button> */}


            <p>{user?.displayName}</p>
          </li>
          <li>
            <button onClick={handleLogOut}>LogOut</button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItem}
          </ul>
        </div>
        <Link to="/" className="btn btn-accent normal-case text-xl">
          <img className="h-5/6" src="" alt="" srcset="" />
          Whisper Book
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex justify-between">
        <ul className="menu menu-horizontal p-0">{menuItem}</ul>
      </div>
      {/* <div className="navbar-end">
          <Link to="/" className="btn">Get started</Link>
        </div> */}
      {user?.uid &&
        <label
          htmlFor="dashboard-drawer"
          tabIndex={2}
          className="btn btn-ghost lg:hidden navbar-end"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      }
    </div>
  );
};

export default Navbar;

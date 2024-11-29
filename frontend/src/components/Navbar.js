import React, { useContext } from "react";
import { Link } from "react-router-dom"; 
import AuthContext from "../context/AuthContext"

const Navbar = () =>{
    const { user, logout } = useContext(AuthContext);
    return(
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid">
            <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                {user?(
                    <>
                        <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                    </>
                ):
                    <>
                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                    </>
                }
            </ul>
            {user && (
                <button className="btn btn-dark ms-auto" onClick={logout}>Logout</button>
            )}
            </div>
        </nav>
    )
}

export default Navbar;
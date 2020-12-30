import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { myContext } from '../Pages/Context'
import Axios, { AxiosResponse } from 'axios';
import "../main.css";
export default function NavBar() {
  const ctx = useContext(myContext);

  const logout = () => {
    Axios.get("http://localhost:4000/logout", {
      withCredentials: true
    }).then((res : AxiosResponse) => {
      if (res.data === "success") {
        window.location.href = "/";
      }
    })
  }
  return (
    <div className="site-navbar py-4 js-sticky-header site-navbar-target shrink nav-position" role="banner">

      <div className="container">
        <div className="row align-items-center"> 

          <div className="col-6 col-md-3 col-xl-4  d-block">
            <h1 className="mb-0 site-logo">
              <a href="index.html" className="text-black h2 mb-0"> 
            <img src="/images/RubikPayLogo1.png" alt="" className="logo"/> 
            <span className="text-primary"></span> 
            </a>
            </h1>
        
          
</div>
          <div className="col-12 col-md-9 col-xl-8">
            <nav className="site-navigation position-relative text-right" role="navigation">

              <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block ml-0 pl-0">
              {ctx ? (
        <>
                <li> <Link className="nav-link active" onClick={logout} to="/logout">Logout</Link></li>
                {ctx.isAdmin ? ( <li><Link className="nav-link" to="/admin">Admin</Link></li>) : null}
                
                
                </>
      ) : (
        <>
                <li><Link className="nav-link" to="/login">Login</Link></li>
                <li> <Link className="nav-link" to="/register">Register</Link></li>
                </>
      )
      }
       <li><Link className="nav-link" to="/">Home</Link></li>
              </ul>
            </nav>
          </div>


          <div className="col-6 col-md-9 d-inline-block d-lg-none ml-md-0"><a href="#" className="site-menu-toggle js-menu-toggle text-black float-right"><span className="icon-menu h3"></span></a>
          </div>

        </div>
      </div>

    </div>
  
  )
}

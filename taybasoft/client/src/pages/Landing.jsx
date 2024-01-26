import React from "react"
import { Link, Navigate } from "react-router-dom"
import logo from "../assets/images/logo.svg"
import main from "../assets/images/main.svg"
import Wrapper from "../assets/wrappers/LandingPage"


const Landing = () => {

  // if user already authenticated redirect to app page
  if (localStorage.getItem("userInfo")) return <Navigate to={"/app"} />

  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="Jobify" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            <span>TAYBA</span>SOFT
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio animi
            reprehenderit, ratione esse in ducimus facilis rerum ex aliquid
            tempore, provident consequatur veritatis molestias nihil magni
            voluptates. Molestiae, eius itaque?
          </p>
          <Link to="/login" className="btn register-link">
            Login
          </Link>
        </div>
        <img src={main} alt="main image" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing

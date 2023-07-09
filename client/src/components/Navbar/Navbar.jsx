import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash === "") {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // await newRequest.post("/auth/logout");
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">HireMe</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <Link to="/#exp" className="link">
            <span>Explore</span>
          </Link>

          <Link to="/#about" className="link">
            <span>About</span>
          </Link>
          {!currentUser?.result?.isSeller && (
            <Link to="/register" className="link">
              <span>Create a Seller Account</span>
            </Link>
          )}
          {currentUser?.result ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.result.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser.result.username}</span>
              {open && (
                <div className="options">
                  {currentUser.result.isSeller && (
                    <>
                      <Link className="link" to="/myservices">
                        Services
                      </Link>
                      <Link className="link" to="/addservice">
                        Add New Service
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/services?cat=design">
              Graphics & Design
            </Link>
            <Link className="link" to="/services?cat=animation">
              Video & Animation
            </Link>
            <Link className="link" to="/services?cat=write">
              Writing & Translation
            </Link>
            <Link className="link" to="/services?cat=ai">
              AI Services
            </Link>
            <Link className="link" to="/services?cat=digmarket">
              Digital Marketing
            </Link>
            <Link className="link" to="/services?cat=music">
              Music & Audio
            </Link>
            <Link className="link" to="/services?cat=web">
              Web Dev
            </Link>
            <Link className="link" to="/services?cat=business">
              Business
            </Link>
            <Link className="link" to="/services?cat=lifestyle">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Featured.scss";
const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/services?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>Find perfect freelance services for you</h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder="Search here"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <Link to="/services?cat=design" className="link">
              <button>Logo Design</button>
            </Link>
            <Link to="/services?cat=write" className="link">
              <button>Writing</button>
            </Link>
            <Link to="/services?cat=web" className="link">
              <button>Web Dev</button>
            </Link>
            <Link to="/services?cat=ai" className="link">
              <button>AI Services</button>
            </Link>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;

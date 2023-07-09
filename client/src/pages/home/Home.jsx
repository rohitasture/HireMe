import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/Slide/Slide";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { cards } from "../../data";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Home = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["home"],
    queryFn: () =>
      newRequest.get(`/services?lim=8`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="home">
      <Featured />
      <Slide slidesToShow={5} arrowsScroll={1}>
        {cards.map((card) => (
          <Link to={card.lnk} key={card.id}>
            <CategoryCard item={card} />
          </Link>
        ))}
      </Slide>
      <div className="features" id="about">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Payments available using stripe
            </div>
            <p>Always know what you'll pay upfront. You payment is secured.</p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              24/7 support using messages
            </div>
            <p>Use messages to contact the seller and make deals</p>
          </div>
          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="explore" id="exp">
        <div className="container">
          <h1>Explore the marketplace</h1>
          <div className="items">
            <Link to="services?cat=design" className="link">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Graphics & Design</span>
              </div>
            </Link>
            <Link to="services?cat=digmarket" className="link">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                  alt=""
                />
                <div className="line"></div>

                <span>Digital Marketing</span>
              </div>
            </Link>
            <Link to="services?cat=write" className="link">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Writing & Translation</span>
              </div>
            </Link>
            <Link to="services?cat=animation" className="link">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Video & Animation</span>
              </div>
            </Link>
            <Link to="services?cat=music" className="link">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Music & Audio</span>
              </div>
            </Link>
            <Link to="services?cat=web" className="link">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Web Dev</span>
              </div>
            </Link>
            <Link to="services?cat=business" className="link">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Business</span>
              </div>
            </Link>
            <Link to="services?cat=lifestyle" className="link">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Lifestyle</span>
              </div>
            </Link>
            <Link to="services?cat=ai" className="link">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>AI and Data</span>
              </div>
            </Link>
            <Link to="services?cat=photo" className="link">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Photography</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something Went Wrong!!"
      ) : (
        <Slide slidesToShow={4} arrowsScroll={1}>
          {data.map((card) => (
            <ProjectCard key={card._id} card={card} />
          ))}
        </Slide>
      )}
    </div>
  );
};

export default Home;

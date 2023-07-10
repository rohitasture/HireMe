import React from "react";
import "./Service.scss";
import Reviews from "../../components/reviews/Reviews";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { getCategories } from "../../utils/getCategories";
const Service = () => {
  const { id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { isLoading, error, data } = useQuery({
    queryKey: [id],
    queryFn: () =>
      newRequest.get(`/services/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const {
    isLoading: isUserLoading,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`users/${data?.userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!data,
  });
  return (
    <div className="gig">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something Went Wrong!!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              <Link to="/" className="link">
                HireMe
              </Link>{" "}
              {">"}{" "}
              <Link to={`/services?cat=${data.cat}`} className="link">
                {getCategories(data.cat)}
              </Link>
              {">"}
            </span>
            <h1>{data.title}</h1>
            {isUserLoading ? (
              "Loading"
            ) : errorUser ? (
              `Something went wrong!! ${errorUser}`
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>
                      {" "}
                      {Math.round(data.totalStars / data.starNumber)}
                    </span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slides">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {isUserLoading ? (
              "Loading"
            ) : errorUser ? (
              "Something went wrong!!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {" "}
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">
                        {moment(dataUser.createdAt).fromNow()}
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Email ID</span>
                      <span className="desc">{dataUser?.email}</span>
                    </div>
                    <div className="item">
                      <span className="title">Phone Number</span>
                      <span className="desc">{dataUser?.phone}</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews serviceId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {!currentUser?.result?.isSeller && currentUser?.result ? (
              <Link to={`/pay/${id}`}>
                <button>Continue</button>
              </Link>
            ) : (
              <h3>Create a buyer account to buy a service</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;

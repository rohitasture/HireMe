import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./ServiceCard.scss";
const ServiceCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/service/${item._id}`} className="link">
      <div className="serviceCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "Loading"
          ) : error ? (
            "Something went Wrong"
          ) : (
            <div className="user">
              <img src={data.img || "./img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>
            <strong>{item.title}</strong>: {item.desc.substr(0, 20)}
            {item.desc.length > 20 && "..."}
          </p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="./img/heart.png" alt="" />
          <span>STARTING AT</span>
          <h2>${item.price}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;

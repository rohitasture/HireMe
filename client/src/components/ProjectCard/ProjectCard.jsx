import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.scss";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../utils/getCategories";
import newRequest from "../../utils/newRequest";
const ProjectCard = ({ card }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [card.userId],
    queryFn: () =>
      newRequest.get(`/users/${card.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/service/${card._id}`} className="link">
      <div className="projectCard">
        <img src={card.cover} alt="" />
        {isLoading ? (
          "Loading"
        ) : error ? (
          "Something went Wrong"
        ) : (
          <div className="info">
            <img src={data.img || "./img/noavatar.jpg"} alt="" />
            <div className="texts">
              <h2>Category : {getCategories(card.cat)}</h2>
              <span>{card.title}</span>
              <br />
              <span>{data.username}</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProjectCard;

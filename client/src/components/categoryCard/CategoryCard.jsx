import React from "react";
import "./CategoryCard.scss";

const CategoryCard = ({ item }) => {
  return (
    <div className="categoryCard">
      <img src={item.img} alt="" />
      <span className="desc">{item.desc}</span>
      <span className="title">{item.title}</span>
    </div>
  );
};

export default CategoryCard;

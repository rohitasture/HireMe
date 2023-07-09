import React, { useState, useEffect } from "react";
import ServiceCard from "../../components/serviceCard/ServiceCard";
import "./Services.scss";
import { getCategories } from "../../utils/getCategories";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router-dom";

const Services = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState("Services");
  const [state, setState] = useState({
    min: undefined,
    max: undefined,
    cat: searchParams.get("cat") || "all",
    sorttype: "price",
  });

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: () =>
      newRequest
        .get(
          `/services?search=${searchParams.get("search") || ""}&min=${
            state?.min || ""
          }&max=${state?.max || ""}&sort=${state.sorttype}&cat=${
            searchParams.get("cat") === "all"
              ? ""
              : searchParams.get("cat") || ""
          }`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const apply = () => {
    setSearchParams({ ...searchParams, cat: state?.cat || "" });
    setTitle(getCategories(state.cat));
  };
  useEffect(() => {
    refetch();
  }, [apply]);

  useEffect(() => {
    setState((prev) => {
      return {
        ...prev,
        cat: searchParams.get("cat"),
      };
    });
    setTitle(getCategories(searchParams.get("cat")));
  }, [searchParams]);

  return (
    <div className="services">
      <div className="container">
        <span className="currCategory">
          <Link to="/">HireMe</Link> &gt; {title} &gt;
        </span>
        <h1>{title}</h1>
        <p>Explore the boundaries of Art and Technology</p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input
              type="number"
              placeholder="min"
              name="min"
              onChange={(e) =>
                setState((prev) => {
                  return {
                    ...prev,
                    min: e.target.value,
                  };
                })
              }
            />
            <input
              type="number"
              placeholder="max"
              name="max"
              onChange={(e) =>
                setState((prev) => {
                  return {
                    ...prev,
                    max: e.target.value,
                  };
                })
              }
            />
            <span>Category</span>
            <select
              name="cat"
              id="cat"
              onChange={(e) =>
                setState((prev) => {
                  return {
                    ...prev,
                    cat: e.target.value,
                  };
                })
              }
              value={state?.cat || "all"}
            >
              <option value="all">All services</option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
              <option value="ai">AI</option>
              <option value="business">Business</option>
              <option value="lifsetyle">Lifestyle</option>
              <option value="write">Writing</option>
              <option value="digmarket">Digital Marketing</option>
              <option value="photo">Photography</option>
            </select>
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">SortBy</span>
            <span className="sortType">
              {state.sorttype === "price" ? "Best selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                <span
                  onClick={(e) =>
                    setState((prev) => {
                      setOpen(false);
                      return {
                        ...prev,
                        sorttype: "createdAt",
                      };
                    })
                  }
                >
                  Newest
                </span>
                <span
                  onClick={(e) =>
                    setState((prev) => {
                      setOpen(false);
                      return {
                        ...prev,
                        sorttype: "price",
                      };
                    })
                  }
                >
                  Best Selling
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "Loading..."
            : error
            ? console.log(error)
            : data.map((service) => (
                <ServiceCard key={service._id} item={service} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

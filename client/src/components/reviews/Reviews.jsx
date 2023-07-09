import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
const Reviews = ({ serviceId }) => {
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [errorMsg, setErrorMsg] = useState("");
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${serviceId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      //refetch();
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (error, variables, context) => {
      setErrorMsg(error.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ serviceId, desc, star });
    e.target[0].value = "";
    e.target[1].value = 1;
  };
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading..."
        : error
        ? "Something Went Wrong!!!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <hr />
      {currentUser?.result ? (
        <div>
          <div className="add">
            <h3>Add a new Review</h3>
            <form action="" onSubmit={handleSubmit} className="addForm">
              <input type="text" placeholder="Write your review" />
              <select name="" id="">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button>Send</button>
            </form>
          </div>
          <h4 style={{ color: "red" }}>{errorMsg}</h4>
        </div>
      ) : (
        <div className="add">
          <h3>Sign In to Add reviews</h3>
        </div>
      )}
    </div>
  );
};

export default Reviews;

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages/`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"} Conversation {">"}
        </span>
        {isLoading ? (
          "Loading"
        ) : error ? (
          "Something went wrong!!"
        ) : (
          <div className="messages">
            {data.map((message) => (
              <div
                className={
                  message.userId === currentUser.result._id
                    ? "item owner"
                    : "item"
                }
                key={message._id}
              >
                {currentUser.result.isSeller &&
                message.userId === currentUser.result._id ? (
                  <img
                    src={currentUser.result.img || "/img/noavatar.jpg"}
                    alt="seller"
                    title="seller"
                  />
                ) : currentUser.result.isSeller ? (
                  <img src="/img/buyer.png" alt="buyer" title="buyer" />
                ) : !currentUser.result.isSeller &&
                  message.userId === currentUser.result._id ? (
                  <img
                    src={currentUser.result.img || "/img/noavatar.jpg"}
                    alt="buyer"
                    title="buyer"
                  />
                ) : (
                  <img src="/img/agent.png" alt="seller" title="seller" />
                )}
                <p>{message.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form onSubmit={handleSubmit} className="write">
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;

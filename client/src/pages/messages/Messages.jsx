import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import moment from "moment";
import "./Messages.scss";

const Messages = () => {
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      //refetch();
      queryClient.invalidateQueries(["conversations"]);
    },
  });
  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong!!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser?.result.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((conversation) => (
              <tr
                className={
                  ((currentUser?.result.isSeller &&
                    !conversation.readbySeller) ||
                    (!currentUser?.result.isSeller &&
                      !conversation.readbyBuyer)) &&
                  "active"
                }
                key={conversation.id}
              >
                <td>
                  {currentUser?.result.isSeller
                    ? conversation.buyerId
                    : conversation.sellerId}
                </td>
                <td>
                  <Link to={`/message/${conversation.id}`} className="link">
                    {conversation?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(conversation.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser?.result.isSeller &&
                    !conversation.readbySeller) ||
                    (!currentUser?.result.isSeller &&
                      !conversation.readbyBuyer)) && (
                    <button onClick={() => handleRead(conversation.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;

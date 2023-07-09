import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./MyServices.scss";
const MyServices = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["myServices"],
    queryFn: () =>
      newRequest
        .get(`/services?userId=${currentUser?.result._id}`)
        .then((res) => {
          return res.data;
        }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/services/${id}`);
    },
    onSuccess: () => {
      //refetch();
      queryClient.invalidateQueries(["myServices"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };
  return (
    <div className="myservices">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something Went Wrong!!!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>MyServices</h1>
            {currentUser?.result.isSeller && (
              <Link to="/addservice">
                <button>Add New Service</button>
              </Link>
            )}
          </div>
          <table>
            <tbody>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
              {data.map((service) => (
                <tr key={service._id}>
                  <td>
                    <img className="image" src={service.cover} alt="" />
                  </td>
                  <td>{service.title}</td>
                  <td>{service.price}</td>
                  <td>{service.sales}</td>
                  <td>
                    <img
                      className="delete"
                      src="./img/delete.png"
                      alt=""
                      onClick={() => handleDelete(service._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyServices;

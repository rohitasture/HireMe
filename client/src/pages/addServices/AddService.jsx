import React, { useReducer, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./AddService.scss";
import { INITIAL_STATE, serviceReducer } from "../../reducers/serviceReducer";
import upload from "../../utils/upload";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const [coverImage, setCoverImage] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(serviceReducer, INITIAL_STATE);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (service) => {
      return newRequest.post(`/services`, service);
    },
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries(["myServices"]);
    },
    onError: (err) => {
      setError(err);
    },
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state, {
      onSuccess: () => {
        navigate("/myservices");
      },
    });
  };

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };
  const handleUpload = async (e) => {
    setUploading(true);
    try {
      const cover = await upload(coverImage);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Service</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="e.g. I will do something I'm really good at"
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
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
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
            <h3>{error && error.response.data}</h3>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              onChange={handleChange}
              placeholder="e.g. One-page web design"
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((feature) => (
                <div className="item" key={feature}>
                  <button
                    onClick={() => {
                      dispatch({ type: "REMOVE_FEATURE", payload: feature });
                    }}
                  >
                    {feature}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;

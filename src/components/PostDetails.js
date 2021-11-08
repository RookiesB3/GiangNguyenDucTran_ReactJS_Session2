import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deletePostByID } from "../store/posts/postsSlice";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery(["post", id], () =>
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.data)
  );
  console.log(post);
  if (isLoading) {
    return (
      <Spinner
        animation="border"
        style={{
          margin: "0",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <h1>Post Details - {id}</h1>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Button
        variant="danger"
        onClick={() => {
          dispatch(deletePostByID(id));
          navigate(-1);
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default PostDetails;

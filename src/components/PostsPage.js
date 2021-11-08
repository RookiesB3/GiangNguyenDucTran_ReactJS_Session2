import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  setPosts,
  selectState,
  sortPostsByAZ,
  sortPostsByZA,
  sortPostsByID,
  sortPostsByIDReverse,
} from "../store/posts/postsSlice";

import { getPosts } from "../store/posts/thunk/getPostsThunk";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare as Neutral,
  faCaretSquareUp as Up,
  faCaretSquareDown as Down,
} from "@fortawesome/free-solid-svg-icons";

const cursorStyle = {
  cursor: "pointer",
};

const iconStyle = {
  float: "right",
  marginTop: "4px",
};

const PostsPage = () => {
  const [sortPostsCount, setSortPostsCount] = useState(0);
  const [sortIDCount, setSortIDCount] = useState(0);
  const [oldState, setOldState] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector(selectState.posts);
  const loading = useSelector(selectState.loading);
  const error = useSelector(selectState.error);

  useEffect(() => {
    if (posts.length === 0) dispatch(getPosts());
  }, [dispatch, posts]);

  const sortPosts = () => {
    if (sortPostsCount === 0) {
      setOldState(posts);
      dispatch(sortPostsByAZ());
      setSortPostsCount(1);
    }
    if (sortPostsCount === 1) {
      dispatch(sortPostsByZA());
      setSortPostsCount(2);
    }
    if (sortPostsCount === 2) {
      setSortPostsCount(0);
      dispatch(setPosts(oldState));
    }
  };

  const sortID = () => {
    if (sortIDCount === 0) {
      setOldState(posts);
      dispatch(sortPostsByID());
      setSortIDCount(1);
    }
    if (sortIDCount === 1) {
      dispatch(sortPostsByIDReverse());
      setSortIDCount(2);
    }
    if (sortIDCount === 2) {
      setSortIDCount(0);
      dispatch(setPosts(oldState));
    }
  };

  const icon = {
    posts: sortPostsCount === 0 ? Neutral : sortPostsCount === 1 ? Up : Down,
    id: sortIDCount === 0 ? Neutral : sortIDCount === 1 ? Up : Down,
  };

  if (error) {
    return <div>{error.message}</div>;
  }
  if (loading) {
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

  return (
    <div>
      <h1>Posts Page</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th style={cursorStyle} onClick={() => sortID()}>
              #
              <Icon style={iconStyle} icon={icon.id} />
            </th>
            <th style={cursorStyle} onClick={() => sortPosts()}>
              Title
              <Icon style={iconStyle} icon={icon.posts} />
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              onClick={() => navigate(`${post.id}`)}
              style={cursorStyle}
            >
              <td>{post.id}</td>
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostsPage;

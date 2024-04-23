import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../post/Post.js";
import User from "../user/User.js";
import toast from "react-hot-toast";

import "./Home.css";
import {
  clearAllUsersError,
  clearPostsOfFollowingError,
  getAllUsers,
  getPostsOfFollowing,
  getPostsByNameAndSkill,
} from "../../store/actions/userActions.js";
import { Typography } from "@mui/material";
import Loader from "../loader/Loader.js";
import {
  clearPostError,
  clearPostMessage,
} from "../../store/actions/postActions.js";

const Home = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { error, loading, posts } = useSelector(
    (state) => state.postOfFollowing
  );
  const {
    error: allUsersError,
    loading: allUsersLoading,
    users,
  } = useSelector((state) => state.allUser);

  const { message, error: postError } = useSelector((state) => state.post);

  const searchHandler = (e) => {
    console.log(searchValue);
    dispatch(getPostsByNameAndSkill(searchValue));
  };

  console.log(posts);

  useEffect(() => {
    if (error || allUsersError) {
      toast.error("something went wrong");
      dispatch(clearPostsOfFollowingError());
      dispatch(clearAllUsersError());
    }
    dispatch(getPostsOfFollowing());
    dispatch(getAllUsers());
  }, [dispatch, error, allUsersError]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearPostMessage());
    }
    if (postError) {
      toast.error(postError);
      dispatch(clearPostError());
    }
  }, [dispatch, postError, message]);

  return loading === true || allUsersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        <div className="post-search">
          <div className="Card-search">
            <div className="CardInner-search">
              <label htmlFor="search-input" className="label-search">
                Search any user or post
              </label>
              <div className="container-search">
                <div className="Icon-search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#657789"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-search"
                    onClick={searchHandler}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <div className="InputContainer-search">
                  <input
                    id="search-input"
                    className="input-search"
                    placeholder="Search any user post and with their skills..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner?.avatar?.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              owner={post.owner}
              ownerSkills={post.owner?.skills}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        {users && User.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
              skills={user?.skills}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;

import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";

import ChatIcon from "@mui/icons-material/Chat";

import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPostError,
  clearPostMessage,
  deletePost,
  getAllMyPosts,
  getAllPostOfUser,
  postComment,
  postLikeAndDislike,
  updateCaption,
} from "../../store/actions/postActions";
import {
  followAndUnfollowUser,
  getPostsOfFollowing,
  getUserProfile,
  userLoad,
} from "../../store/actions/userActions";
import User from "../user/User";
import CommentCard from "../commentCard/CommentCard.js";
import toast from "react-hot-toast";
import useConversation from "../../zhustand/useConversation.js";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  owner,
  ownerSkills,
  isDelete = false,
  isAccount = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userID: userProfileId } = useParams();
  const { user } = useSelector((state) => state.user);
  const { error, message } = useSelector((state) => state.myPost);
  const { loading: userProfileLoading, user: userProfile } = useSelector(
    (state) => state.userProfile
  );

  const [liked, setLiked] = useState(false);
  const [openLikeUser, setOpenLikeUser] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [captionToggle, setCaptionToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const { selectedConversation, setSelectedConversation } = useConversation();

  const [following, setFollowing] = useState(false);
  const [followed, setFollowed] = useState(false);

  const followHandler = async (userId) => {
    // setFollowing(!following);
    await dispatch(followAndUnfollowUser(userId));
    dispatch(userLoad());
  };

  useEffect(() => {
    if (user) {
      const isFollowing = user.following.find(
        (follower) => follower._id === ownerId
      );
      const isFollowed = user.followers.find(
        (follower) => follower._id === ownerId
      );
      if (isFollowing) setFollowing(true);
      else setFollowing(false);
      if (isFollowed) setFollowed(true);
      else setFollowed(false);
      // user.followers.forEach((item) => {
      //   if (item._id === LoggedInUser._id) {
      //     setFollowing(true);
      //   } else {
      //     setFollowing(false);
      //   }
      // });
    }
  }, [user, ownerId]);

  let connectName = "";
  if (following && followed) {
    connectName = "Connected";
  } else if (following) {
    connectName = "Requested";
  } else {
    connectName = "Follow Back";
  }

  const handleLike = async () => {
    setLiked((prev) => !prev);
    await dispatch(postLikeAndDislike(postId));
    if (userProfileId) {
      dispatch(getAllPostOfUser(userProfileId));
    } else if (isAccount) {
      dispatch(getAllMyPosts());
    } else {
      dispatch(getPostsOfFollowing());
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(postComment(postId, commentValue));
    if (userProfileId) {
      dispatch(getAllPostOfUser(userProfileId));
    } else if (isAccount) {
      dispatch(getAllMyPosts());
    } else {
      dispatch(getPostsOfFollowing());
    }
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getAllMyPosts());
    dispatch(userLoad());
  };

  const updateCaptionHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateCaption(postId, captionValue));
    dispatch(getAllMyPosts());
  };

  const commentHandler = () => {
    setCommentToggle((prev) => !prev);
  };

  const chatHandlerPost = () => {
    setSelectedConversation(owner);
  };
  useEffect(() => {
    if (selectedConversation) {
      navigate("/chat");
    }
  }, [navigate, selectedConversation]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearPostMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearPostError());
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    likes.forEach((like) => {
      if (like._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <>
      <div className="post">
        <div className="postDetails-container">
          <div className="postDetails">
            <Avatar
              className="post-Details-avatar"
              src={ownerImage}
              alt="User"
              sx={{
                height: "3vmax",
                width: "3vmax",
              }}
            />
            <div className="post-Details-name">
              <Link to={`/user/${ownerId}`}>
                <Typography className="post-Details-username" fontWeight={700}>
                  {ownerName}
                </Typography>
              </Link>
              <h3>
                {ownerSkills?.length > 0 &&
                  ownerSkills.map((skill, idx) => `${skill}, `)}
              </h3>
            </div>
          </div>

          <Button
            variant="contained"
            className={`${connectName === "Requested" ? "send-requested" : ""}`}
            onClick={() => followHandler(ownerId)}
          >
            {connectName}
          </Button>
        </div>

        {isAccount ? (
          <div className="postHeader">
            <Button onClick={() => setCaptionToggle(!captionToggle)}>
              <MoreVert />
            </Button>
          </div>
        ) : null}

        <img src={postImage} alt="Post" />

        <Typography className="caption-name" style={{ alignSelf: "center" }}>
          {caption}
        </Typography>

        <button
          style={{
            border: "none",
            backgroundColor: "white",
            cursor: "pointer",
            margin: "1vmax 2vmax",
          }}
          onClick={() => setOpenLikeUser((prev) => !prev)}
          disabled={likes.length === 0 ? true : false}
        >
          <Typography>{likes.length} Likes</Typography>
        </button>

        <div className="postFooter">
          <Button onClick={handleLike}>
            {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
          </Button>

          <Button onClick={commentHandler}>
            <ChatBubbleOutline />
          </Button>

          <Button
            onClick={chatHandlerPost}
            disabled={connectName === "Connected" ? false : true}
          >
            <ChatIcon />
          </Button>

          {isDelete ? (
            <Button onClick={deletePostHandler}>
              <DeleteOutline />
            </Button>
          ) : null}
        </div>

        <Dialog
          open={openLikeUser}
          onClose={() => setOpenLikeUser((prev) => !prev)}
        >
          <div className="DialogBox">
            <Typography variant="h6">Liked By</Typography>

            {likes.map((like) => (
              <User
                key={like._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar.url}
              />
            ))}
          </div>
        </Dialog>

        <Dialog
          open={commentToggle}
          onClose={() => setCommentToggle((prev) => !prev)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Comments</Typography>

            <div className="comments-container">
              <div className="comment-form">
                <form onSubmit={addCommentHandler}>
                  <div className="textarea-container">
                    <textarea
                      placeholder="Write your comment here..."
                      rows="4"
                      value={commentValue}
                      onChange={(e) => setCommentValue(e.target.value)}
                    ></textarea>
                    <button type="button" className="generate-button">
                      Generate
                    </button>
                  </div>
                  <button type="submit" className="submit-button">
                    Post Comment
                  </button>
                </form>
              </div>

              {comments && comments.length > 0 ? (
                comments.map((item) => (
                  <CommentCard
                    userId={item.user._id}
                    name={item.user.name}
                    avatar={item.user.avatar.url}
                    comment={item.comment}
                    commentId={item._id}
                    key={item._id}
                    postId={postId}
                    isAccount={isAccount}
                  />
                ))
              ) : (
                <Typography>No comments Yet</Typography>
              )}
            </div>
          </div>
        </Dialog>

        <Dialog
          open={captionToggle}
          onClose={() => setCaptionToggle(!captionToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Update Caption</Typography>

            <form className="commentForm" onSubmit={updateCaptionHandler}>
              <input
                type="text"
                value={captionValue}
                onChange={(e) => setCaptionValue(e.target.value)}
                placeholder="Caption Here..."
                required
              />
              <Button type="submit" variant="contained">
                Update
              </Button>
            </form>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Post;

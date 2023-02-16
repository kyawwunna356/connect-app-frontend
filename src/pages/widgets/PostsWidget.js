import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PostLoader from "../../components/PostLoader";
import { fetchFeedPosts, fetchUserPosts } from "../../redux/features/postSlice";
import { getToken } from "../../redux/features/userSlice";
import PostWidget from "./PostWidget";
import SessionExpireModal from "./SessionExpireModal";

function PostsWidget({ userId, profile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector(getToken);
  const [showModal,setShowModal] = useState(false)

  useEffect(() => {
    if (profile) {
      dispatch(fetchUserPosts({ token, userId }));
    } else {
      dispatch(fetchFeedPosts({ token }));
    }
  }, [token, dispatch, userId]);

  useEffect(() => {
    if (posts.status === "error") {
      setShowModal(true)
    }
  },[showModal])

  if (posts.status === "loading") return <PostLoader />;  //loading
  
  if(showModal){
    return <SessionExpireModal setShowModal={setShowModal}/>   //error
  }
 
  if (posts.status === "success") {           //success
    return (
      <>
        {posts.postData.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            location,
            description,
            imagePath,
            profilePath,
            likes,
            comments,
            createdAt,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              userId={userId}
              name={firstName + lastName}
              location={location}
              description={description}
              imagePath={imagePath}
              profilePath={profilePath}
              likes={likes}
              comments={comments}
              createdAt={createdAt}
            />
          )
        )}
      </>
    );
  }
}

export default PostsWidget;

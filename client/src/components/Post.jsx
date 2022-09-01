import { useEffect, useState } from "react";
import moment from "moment";
import axios from "../auth/Axios";
//assets
import { PostPlaceholder } from "../assets";
import { CgProfile } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { IoMdPaperPlane } from "react-icons/io";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineSmile } from "react-icons/ai";
import CommentsModal from "./CommentsModal";

export default function Post({ post }) {
  const [comments, setComments] = useState([]);
  const [file, setFile] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [image, setImage] = useState(true);
  const [like, setLike] = useState(
    post.likes.find((item) => {
      return item == "tester2";
    })
      ? true
      : false
  );
  const [save, setSave] = useState(
    post.saves.find((item) => {
      return item == "tester2";
    })
      ? true
      : false
  );
  const getCommentsByPostId = async () => {
    await axios.get(`comments/${post.postId}`).then((res) => {
      setComments(res.data.data);
    });
  };
  // const getPostImage = async () => {
  //   await axios.get(`image/${post.image}`).then((res) => {
  //     setImage(true);
  //   });
  // };

  const postComment = async () => {
    await axios
      .patch(`posts/add-comment/${post.postId}`, {
        commentBy: "tester2",
        comment: newComment,
      })
      .then(() => {
        setNewComment("");
      })
      .then(() => {
        getCommentsByPostId();
      });
  };

  const onLikeClick = async () => {
    if (!like) {
      await axios
        .patch(`posts/like/${post.postId}`, {
          username: "tester2",
        })
        .then(() => {
          setLike(true);
        });
    } else if (like) {
      await axios
        .patch(`posts/dislike/${post.postId}`, {
          username: "tester2",
        })
        .then(() => {
          setLike(false);
        });
    }
  };
  const onSaveClick = async () => {
    if (!save) {
      await axios
        .patch(`posts/save/${post.postId}`, {
          username: "tester2",
        })
        .then(() => {
          setSave(true);
        });
    } else if (save) {
      await axios
        .patch(`posts/unsave/${post.postId}`, {
          username: "tester2",
        })
        .then(() => {
          setSave(false);
        });
    }
  };

  function toggleModal(modalID) {
    document.getElementById(modalID).classList.toggle("hidden");
    // document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
    // document.getElementById(modalID).classList.toggle("flex");
    // document.getElementById(modalID + "-backdrop").classList.toggle("flex");
  }
  useEffect(() => {
    getCommentsByPostId();
  }, []);

  return (
    <div className="shadow-md border-[0.25px] border-slate-200 my-4 rounded-md">
      {/* <input onChange={uploadFile} id="file" type="file" /> */}
      <div className="py-4 flex bg-[#fff] space-x-4 w-full items-center px-6">
        <CgProfile size={32} className="cursor-pointer" />
        <h4 className="font-semibold cursor-pointer w-full">{post.postedBy}</h4>
        <HiOutlineDotsHorizontal className="cursor-pointer" size={24} />
      </div>
      <img
        src={`http://localhost:4002/image/${post.image}` || PostPlaceholder}
        className="max-h-[100vh] w-[100%]"
      />
      <div className="px-6 ">
        <div className="py-2 flex justify-between">
          <div className="flex space-x-6">
            {like ? (
              <FcLike
                onClick={onLikeClick}
                size={32}
                className="hover:text-slate-400 cursor-pointer"
              />
            ) : (
              <FiHeart
                onClick={onLikeClick}
                size={32}
                className="hover:text-slate-400 cursor-pointer"
              />
            )}
            <FiMessageCircle
              size={32}
              onClick={() => toggleModal(`large-modal-${post.postId}`)}
              className="hover:text-slate-400 cursor-pointer"
            />
            <IoMdPaperPlane
              size={32}
              className="hover:text-slate-400 cursor-pointer"
            />
          </div>
          {save ? (
            <MdOutlineBookmark
              onClick={onSaveClick}
              size={32}
              className="hover:text-slate-400 cursor-pointer"
            />
          ) : (
            <MdOutlineBookmarkBorder
              onClick={onSaveClick}
              size={32}
              className="hover:text-slate-400 cursor-pointer"
            />
          )}
        </div>

        <div className="flex space-x-2 py-2">
          <h4 className="font-semibold cursor-pointer">{post.postedBy}</h4>
          <h4>{post.body}</h4>
        </div>
        <h4
          onClick={() => toggleModal(`large-modal-${post.postId}`)}
          className="text-slate-400 cursor-pointer"
        >
          View all {post.comments.length} comments
        </h4>
        <h4 className="text-slate-400 py-1">
          {moment(post.createdAt).fromNow()}
        </h4>
        <div className="border-t-[1px] border-slate-200 flex py-2 items-center">
          <AiOutlineSmile size={30} className="cursor-pointer" />
          <input
            className="bg-transparent px-2 w-full outline-none"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />{" "}
          <h4
            onClick={postComment}
            className={`font-bold ${
              newComment.length !== 0
                ? "text-[#47afff]  cursor-pointer"
                : "text-[#8bcbfc] cursor-not-allowed"
            } `}
          >
            Post
          </h4>
        </div>
      </div>
      <CommentsModal
        comments={comments}
        post={post}
        postPlaceholder={PostPlaceholder}
        image={`http://localhost:4002/image/${post.image}`}
        toggleModal={toggleModal}
        postComment={postComment}
        newComment={newComment}
        setNewComment={setNewComment}
        save={save}
        onSaveClick={onSaveClick}
        like={like}
        onLikeClick={onLikeClick}
      />
    </div>
  );
}

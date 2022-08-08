import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { IoMdPaperPlane } from "react-icons/io";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import moment from "moment";
import { AiOutlineSmile } from "react-icons/ai";

export default function CommentsModal({
  comments,
  post,
  toggleModal,
  postComment,
  newComment,
  setNewComment,
  save,
  onSaveClick,
  onLikeClick,
  like,
}) {
  const [commentsLiked, setCommentsLiked] = useState([]);
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  const commentLikeClick = (id) => {
    if (commentsLiked.indexOf(id) === -1) {
      setCommentsLiked((prev) => [...prev, id]);
    } else {
      let i = commentsLiked[commentsLiked.indexOf(id)];
      setCommentsLiked([...arrayRemove(commentsLiked, id)]);
    }
  };

  return (
    <div
      className="hidden w-full bg-slate-900/70 fixed z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full"
      onKeyDown={(e) => {
        if (e.key === "Escape")
          document
            .getElementById(`large-modal-${post.postId}`)
            .classList.toggle("hidden");
      }}
      id={`large-modal-${post.postId}`}
    >
      <AiOutlineClose
        size={22}
        color="white"
        onClick={() =>
          document
            .getElementById(`large-modal-${post.postId}`)
            .classList.toggle("hidden")
        }
        className="cursor-pointer absolute right-4 top-4"
      />
      <div className="relative px-4 w-full max-w-[85rem] h-full md:h-auto">
        <div className="relative bg-[#fff] max-w-[85rem] flex rounded-lg shadow-xl">
          <img
            className="rounded-l-lg w-full h-full max-w-[40rem]"
            src="https://images.unsplash.com/photo-1659946633870-102a2dd18a77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          />
          <div className="w-1/2 p-4 ">
            <div className="flex space-x-3 border-b-[0.25px] pb-3 border-slate-200 text-sm w-full items-center">
              <CgProfile size={36} className="cursor-pointer" />
              <h4 className="font-semibold cursor-pointer w-full">
                {post.postedBy} • Following
              </h4>
            </div>
            <div className="flex-col justify-around ">
              <div className="py-2 overflow-y-scroll h-[37.4rem] no-scrollbar">
                {comments.length === 0 ? (
                  <div className="h-[37.4rem] flex items-center justify-center">
                    <h4 className="font-semibold text-center text-slate-300">
                      {" "}
                      No Comments{" "}
                    </h4>
                  </div>
                ) : null}
                {comments.map((comment) => {
                  return (
                    <div
                      key={comment.commentId}
                      className="flex space-x-3 py-2 text-sm w-full items-center"
                    >
                      <CgProfile size={36} className="cursor-pointer" />
                      <div className="w-full">
                        <div className="flex space-x-2">
                          <h4 className="font-semibold cursor-pointer">
                            {comment.commentBy}
                          </h4>
                          <h4>{comment.body}</h4>
                        </div>
                        <h4 className="text-slate-400 py-1">
                          {moment(post.createdAt).fromNow()}
                        </h4>
                      </div>
                      {commentsLiked.indexOf(comment.commentId) === -1 ? (
                        <FiHeart
                          onClick={() => commentLikeClick(comment.commentId)}
                          size={16}
                          className="hover:text-slate-400 cursor-pointer"
                        />
                      ) : (
                        <FcLike
                          onClick={() => commentLikeClick(comment.commentId)}
                          size={16}
                          className="hover:text-slate-400 cursor-pointer"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="">
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
                      onClick={() => toggleModal("large-modal")}
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

                <div className="flex space-x-2 py-1">
                  <h4 className="font-semibold cursor-pointer">
                    {post.postedBy}
                  </h4>
                  <h4>{post.body}</h4>
                </div>

                <h4 className="text-slate-400 py-1">
                  {moment(post.createdAt).fromNow()}
                </h4>
                <div className="border-t-[1px] border-slate-200 flex py-4 items-center">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

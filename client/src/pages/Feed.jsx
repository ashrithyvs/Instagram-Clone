import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "../components";
import moment from "moment";
function Feed() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    await axios.get("http://localhost:4002/posts").then((res) => {
      setPosts(res.data.data);
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="bg-[#fefefe] py-6">
      <div data-testid="posts" className="w-1/3 mx-auto">
        {posts.map((post) => {
          return <Post key={post.postId} post={post} />;
        })}
      </div>
    </div>
  );
}

export default Feed;

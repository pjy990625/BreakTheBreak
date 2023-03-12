import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ReadPost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  
  const categories = ["All", "Free", "Job"];
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const loadPosts = async () => {
      let response;

      switch (category) {
        case "All":
          response = await fetch(`http://localhost:2023/api/post`);
          break;
        case "Free":
          response = await fetch(`http://localhost:2023/api/post/free`);
          break;
        case "Job":
          response = await fetch(`http://localhost:2023/api/post/job`);
          break;
        default:
          response = null;
      }

      const result = await response.json();
      setPosts(result.data);
    };

    loadPosts();
  }, [category]);
  
  return (
    <div className="max-w-3xl">
      <h2 className="text-blue-900 text-xl font-bold">Read Posts</h2>
      
      <div className="flex justify-between mb-3">
        <select className="bg-slate-300 px-3 rounded-lg" onChange={(e) => setCategory(e.target.value)}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <Link to={`/write/${id}`} className="font-inter font-base bg-blue-900 text-white px-4 py-[6px] rounded-lg">Write</Link>
      </div>
      
      <div className="flex flex-col gap-3">
        {posts.map((post, index) => {
          return (
            <div key={index} className="bg-slate-300 rounded-lg p-3">
              <h3 className="font-bold">{post.title}</h3>
              <div>{post.body}</div>
              <div>{post.type}</div>
              <div>
                {post.keywords.map((keyword, index) => {
                  return (
                    <span key={index}>{keyword}</span>
                  );
                })}
              </div>
              <div>{new Date(post.timestamp).toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadPost;

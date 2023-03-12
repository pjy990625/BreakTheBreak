import React, { useState, useEffect } from "react";

const ReadPost = () => {
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
    <div>
      <h1>Read Posts</h1>
      
      <select onChange={(e) => setCategory(e.target.value)}>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      
      {posts.map((post, index) => {
        return (
          <div key={index}>
            <h3>{post.title}</h3>
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
  );
};

export default ReadPost;

import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch(`http://localhost:2023/api/post`);
      const result = await response.json();

      setPosts(result);
    };

    loadPosts();
  }, [posts]);
  
  return (
    <div>
      <h1>Dashboard</h1>
      {posts.map((post) => {
        return (
          <div>{post.title}</div>
        );
      })}
    </div>
  );
};

export default Dashboard;

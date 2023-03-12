import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ReadPost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  
  const categories = ["All", "Free", "Job"];
  const [category, setCategory] = useState("All");

  const searchCategories = ["Title and Content", "Title", "Content", "Keywords"];
  const [searchCategory, setSearchCategory] = useState("Title and Content");

  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      let response;

      response = await fetch(`http://localhost:2023/api/post/search?show=${category}&searchMethod=${searchCategory}&searchKeyword=${searchKeyword}`);

      const result = await response.json();
      setPosts(result.data);
    };

    loadPosts();
  }, [category, searchCategory, searchKeyword]);
  
  return (
    <div>
      <h1>Read Posts</h1>
      
      <select onChange={(e) => setCategory(e.target.value)}>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      <input type="text" placeholder="Title" onChange={(e) => setSearchKeyword(e.target.value)} />
      <select onChange={(e) => setSearchCategory(e.target.value)}>
        {searchCategories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      <Link to={`/write/${id}`}>Write</Link>
      
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

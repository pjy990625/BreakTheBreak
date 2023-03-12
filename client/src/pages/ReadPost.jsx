import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from '../components/Navbar';

const ReadPost = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  
  const categories = ["All", "General", "Hiring", "Seeking"];
  const [category, setCategory] = useState("All");

  const searchCategories = ["Title and Content", "Title", "Content", "Keywords"];
  const [searchCategory, setSearchCategory] = useState("Title and Content");

  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:2023/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      }).then((resObject) => {
        setUser(resObject.user);
      }).catch((err) => {
        console.log(err);
      });
    };
    getUser();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch(`http://localhost:2023/api/post/search?show=${category}&searchMethod=${searchCategory}&searchKeyword=${searchKeyword}`);
      const result = await response.json();
      setPosts(result.data);
    };

    loadPosts();
  }, [category, searchCategory, searchKeyword]);

  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar user={user} />
        <div className="main">
          <h2 className="text-bice-blue text-2xl font-bold mb-5">Read Posts</h2>

          <div className="flex justify-between mb-5">
            <select className="bg-bice-blue text-white px-3 py-1 rounded-lg" onChange={(e) => setCategory(e.target.value)}>
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

            <Link to={`/write/${id}`} className="font-inter font-base bg-bice-blue text-white px-3 py-1 rounded-lg">Write</Link>
          </div>

          <div className="flex flex-col gap-3">
            {posts
              .sort((p1, p2) => new Date(p2.timestamp) - new Date(p1.timestamp))
              .map((post, index) => {
                const htmlString = post.content;

                return (
                  <div key={index} className="bg-slate-50 shadow-lg rounded-lg p-3">
                    <div className="flex justify-between">
                      <div className="flex gap-5">
                        <h3 className="font-bold text-bice-blue text-lg mb-3">{post.title}</h3>
                        <div className="mb-3 mt-1 text-sm px-1 rounded-lg text-slate-500 font-semibold">{post.type.toUpperCase()}</div>
                      </div>
                      <div className="text-sm mt-1 font-semibold text-slate-500">{new Date(post.timestamp).toLocaleString()}</div>
                    </div>

                    <div className="mb-3" dangerouslySetInnerHTML={{ __html: htmlString }} />
                    <div className="flex gap-3">
                      {post.keywords.map((keyword, index) => {
                        return (
                          <span className="text-sm font-semibold text-slate-500 p-1 rounded-lg" key={index}>#{keyword}</span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadPost;
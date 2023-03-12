import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../src/index.css";


const JobBoard = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch(`http://localhost:2023/api/post/job`);
      const result = await response.json();

      setPosts(result.data);
    };

    loadPosts();
  }, []);

  return (
    <div className="max-w-3xl">
      <h2 className="text-bice-blue text-2xl font-bold mb-5">Job Board</h2>

      <div className="flex flex-col gap-3">
        {posts
          .sort((p1, p2) => new Date(p2.timestamp) - new Date(p1.timestamp))
          .map((post, index) => {
            const htmlString = post.content;

            return (
              <div
                key={index}
                className={`shadow-lg rounded-lg p-3 ${
                  index % 2 !== 0 ? "bg-slate-100" : "bg-slate-200"
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex gap-5">
                    <h3 className="font-bold text-bice-blue text-lg mb-3">
                      {post.title}
                    </h3>
                    <div className="mb-3 mt-1 text-sm px-1 rounded-lg text-slate-500 font-semibold">
                      {post.type.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-sm mt-1 font-semibold text-slate-500">
                    {new Date(post.timestamp).toLocaleString()}
                  </div>
                </div>

                <div
                  className="mb-3"
                  dangerouslySetInnerHTML={{ __html: htmlString }}
                />
                <div className="flex gap-3">
                  {post.keywords.map((keyword, index) => {
                    return (
                      <span
                        className="text-sm font-semibold text-slate-500 p-1 rounded-lg"
                        key={index}
                      >
                        #{keyword}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default JobBoard;

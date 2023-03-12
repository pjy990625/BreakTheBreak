import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import KeywordBlock from "../components/keyword_block";
import Sidebar from "../components/Sidebar";
import Navbar from '../components/Navbar';
import "../index.css";

const WritePost = () => {

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const categories = ["General", "Hiring", "Seeking"];
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywords, setKeywords] = useState([]);

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
        throw new Error("authentication has failed!");
      }).then((resObject) => {
        setUser(resObject.user);
      }).catch((err) => {
        console.log(err);
      });
    };
    getUser();
  }, []);

  const post = async () => {
    const timestamp = { timestamp: new Date() };
    const response = await fetch(`http://localhost:2023/api/post/write/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content, category, timestamp, selectedKeywords }),
    });

    await response.json();
    if (response.status === 200) {
      window.location.href = `/home/${id}`;
    }
  };

  useEffect(() => {
    const loadKeywords = async () => {
      const response = await fetch(`http://localhost:2023/api/keyword/all`);
      const result = await response.json();
      return result.data.map((keyword) => keyword.name);
    };

    loadKeywords().then((loaded) => {
      setKeywords(loaded.sort());
    });
  }, []);

  const selectKeyword = (keyword, selecting) => {
    if (selecting) setSelectedKeywords([...selectedKeywords, keyword]);
    else setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
    filterKeywords(search);
  };

  const filterKeywords = (search) => {
    return keywords.filter((keyword) => {
      return keyword.toLowerCase().includes(search.toLowerCase()) && !selectedKeywords.includes(keyword);
    });
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar user={user} />
        <div className="main ml-5">
          <h1 className="text-bice-blue text-2xl font-bold mb-5">Write a Post</h1>
          <div className="flex gab-3">
            <select className="w-30 bg-bice-blue text-white px-3 py-1 rounded-lg mb-3 mr-3" onChange={(e) => setCategory(e.target.value)}>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <input className="w-full border-2 border-slate-500 p-1 rounded-lg mb-3" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => setContent(editor.getData())}
          />
          <div>
            <h1 className="mt-5 mb-3 text-bice-blue font-semibold text-lg">Skill Keywords</h1>
            <input className="border-slate-500 border-2 p-1 rounded-lg mb-3" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <button className="bg-bice-blue text-white p-1 px-2 rounded-lg ml-5" onClick={() => setSelectedKeywords([...selectedKeywords, search])}>Add Your Own!</button>
            <div className="bg-slate-100 border rounded-lg h-fit p-3">
              {filterKeywords(search).map((keyword, index) => (
                <KeywordBlock style={{ color: 'lightgray' }} key={index} content={keyword} selected={false} onClick={selectKeyword} />
              ))}
            </div>
          </div>
          <div>
            <h1 className="mt-5 mb-3 text-bice-blue font-semibold text-lg">Selected Keywords</h1>
            <div className="bg-slate-100 border rounded-lg h-fit p-3 min-h-[50px]">
              {selectedKeywords.map((keyword, index) => (
                <KeywordBlock key={index} content={keyword} selected={true} onClick={selectKeyword}></KeywordBlock>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <button className="mt-3 bg-bice-blue text-white px-2.5 py-2 rounded-lg" onClick={post}>Post</button>
          </div>
        </div>
      </div></>
  )
}

export default WritePost;

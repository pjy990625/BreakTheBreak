import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import KeywordBlock from "../components/keyword_block";

const keyword_viewport = {
  width: "200px",
  height: "200px",
  border: "1px solid black",
  overflowY: "scroll",
}

const WritePost = () => {

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const keywords = ["hello", "world", "this", "is", "a", "test", "of", "the", "emergency", "broadcast", "system"];

  const post = async () => {
    const timestamp = { timestamp: new Date() };
    const response = await fetch(`http://localhost:2023/api/post/write/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content, timestamp, selectedKeywords }),
    });

    await response.json();
    if (response.status === 200) {
      window.location.href = `/read/${id}`;
    }
  };

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
    <div>
      <h1>Write Post</h1>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <CKEditor
        editor={ ClassicEditor }
        onChange={( event, editor ) => setContent(editor.getData())}
      />
      <button onClick={post}>Post</button>
      <div>
        <h1>Keywords</h1>
        <input type="text" placeholder="Keywords" onChange={(e) => setSearch(e.target.value)} />
        <div style={keyword_viewport}>
          {filterKeywords(search).map((keyword, index) => (
            <KeywordBlock key={index} content={keyword} selected={false} onClick={selectKeyword}></KeywordBlock>
          ))}
        </div>
      </div>
      <div>
        <h1>Selected Keywords</h1>
        <div style={keyword_viewport}>
          {selectedKeywords.map((keyword, index) => (
            <KeywordBlock key={index} content={keyword} selected={true} onClick={selectKeyword}></KeywordBlock>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WritePost;

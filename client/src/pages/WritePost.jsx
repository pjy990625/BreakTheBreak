import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const WritePost = () => {

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const post = async () => {
    const timestamp = { timestamp: new Date() };
    const response = await fetch(`http://localhost:2023/api/post/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content, timestamp }),
    });

    await response.json();
    console.log(response);
  };

  return (
    <div>
      <h1>Write Post</h1>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <CKEditor
        editor={ ClassicEditor }
        onChange={ ( event, editor ) => {
          setContent(editor.getData());
        } }
      />
      <button onClick={post}>Post</button>
    </div>
  )
}

export default WritePost;

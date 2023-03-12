import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import KeywordBlock from "../components/keyword_block";

const keyword_viewport = {
  width: "200px",
  height: "200px",
  border: "1px solid black",
  overflowY: "scroll",
}

const Profile = () => {
  const { id } = useParams();
  
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const loadKeywords = async () => {
      const response = await fetch(`http://localhost:2023/api/keyword/all`);
      const result = await response.json();
      return result.data.map((keyword) => keyword.name);
    };

    const loadUserKeywords = async () => {
      const response = await fetch(`http://localhost:2023/api/keyword/all_from_user/${id}`);
      const result = await response.json();
      return result.data.keywords;
    };

    loadKeywords().then((loaded) => {
      setKeywords(loaded.sort());
    }).then(() => {
      loadUserKeywords().then((loaded) => {
        setSelectedKeywords(loaded);
      });
    });
  }, []);

  const selectKeyword = (keyword, selecting) => {
    if (!edit) return;
    if (selecting) setSelectedKeywords([...selectedKeywords, keyword]);
    else setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
    filterKeywords(search);
  };

  const filterKeywords = (search) => {
    return keywords.filter((keyword) => {
      return keyword.toLowerCase().includes(search.toLowerCase()) && !selectedKeywords.includes(keyword);
    });
  };

  const saveProfile = async () => {
    await fetch(`http://localhost:2023/api/keyword/update_user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, selectedKeywords }),
    });
  };

  const toggleEdit = (toggle) => {
    setEdit(toggle);
    Array.from(document.querySelectorAll('.editable')).forEach((e) => {
      e.style.display = toggle ? "none" : "block";
    });
    Array.from(document.querySelectorAll('.savable')).forEach((e) => {
      e.style.display = toggle ? "block" : "none";
    });
    if (!toggle) {
      setEmail(document.querySelector('.savable').value);
      saveProfile();
    }
  };
  
  return (
    <div>
      <h1 className=''>Profile</h1>
      <span className="editable block">{email}</span>
      <input className="savable hidden" type="text" placeholder={email} />
      <div className="savable hidden">
        <h1>Keywords</h1>
        <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => setSelectedKeywords([...selectedKeywords, search])}>Add Your Own!</button>
        <div style={keyword_viewport}>
          {filterKeywords(search).map((keyword, index) => (
            <KeywordBlock key={index} content={keyword} selected={false} onClick={selectKeyword}></KeywordBlock>
          ))}
        </div>
      </div>
      <div className="block">
        <h1>Selected Keywords</h1>
        <div style={keyword_viewport}>
          {selectedKeywords.map((keyword, index) => (
            <KeywordBlock key={index} content={keyword} selected={true} onClick={selectKeyword}></KeywordBlock>
          ))}
        </div>
      </div>
      <button className="editable block" onClick={() => toggleEdit(true)}>Edit</button>
      <button className="savable hidden" onClick={() => toggleEdit(false)}>Save</button>
    </div>
  );
};

export default Profile;

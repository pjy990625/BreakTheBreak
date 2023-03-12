import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KeywordBlock from "../components/keyword_block";
import Sidebar from "../components/Sidebar";
import Navbar from '../components/Navbar';

const Profile = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("We don't have your email address!");
  const [search, setSearch] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null);

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
    console.log(email);
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
      if (document.querySelector('.savable').value === "") return;
      else setEmail(document.querySelector('.savable').value);
      saveProfile();
    }
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar user={user} />
        <div className="main">
          <h1 className="text-bice-blue text-2xl font-bold mb-5">Profile</h1>
          <span className="mt-3 text-bice-blue font-semibold">Email Address</span>
          <span className="editable block text-slate-700 font-semibold bg-slate-100 border rounded-lg h-fit p-3">{email}</span>
          <input className="savable hidden border-slate-500 border-2 p-1 rounded-lg mb-3" type="text" placeholder="Email Address" />
          <div className="savable hidden">
            <h1 className="mt-3 text-bice-blue font-semibold">Keywords</h1>
            <input className="border-slate-500 border-2 p-1 rounded-lg mb-3" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <button className="bg-bice-blue text-white p-1 px-2 rounded-lg ml-5" onClick={() => setSelectedKeywords([...selectedKeywords, search])}>Add Your Own!</button>
            <div className="bg-slate-100 border rounded-lg h-fit p-3">
              {filterKeywords(search).map((keyword, index) => (
                <KeywordBlock key={index} content={keyword} selected={false} onClick={selectKeyword}></KeywordBlock>
              ))}
            </div>
          </div>
          <div className="block">
            <h1 className="mt-3 text-bice-blue font-semibold">Your Skills</h1>
            <div className="bg-slate-100 border rounded-lg h-fit p-3">
              {selectedKeywords.map((keyword, index) => (
                <KeywordBlock key={index} content={keyword} selected={true} onClick={selectKeyword}></KeywordBlock>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center mt-10">
            <button className="editable mt-3 bg-bice-blue text-white p-2 px-3  rounded-lg" onClick={() => toggleEdit(true)}>Edit</button>
            <button className="savable hidden mt-3 bg-bice-blue text-white px-2.5 py-2  rounded-lg" onClick={() => toggleEdit(false)}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

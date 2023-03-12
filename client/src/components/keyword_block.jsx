import React from 'react'
import "../index.css";

const keyword_styles = {
    display: "inline-block",
    position: "relative",
    background: "",
    border: "1px solid black",
    width: "fit-content",
    margin: "5px",
    padding: "1px 7px",
}

const KeywordBlock = (props) => {

    return (
        <div className='inline-block bg-slate-500 m-1 px-2 text-white rounded-lg cursor-pointer' onClick={() => props.onClick(props.content, !props.selected)}>
            <span>{props.content}</span>
        </div>
    )
}

export default KeywordBlock
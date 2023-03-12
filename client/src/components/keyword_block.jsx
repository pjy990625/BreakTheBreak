import React from 'react'

const keyword_styles = {
    display: "inline-block",
    position: "relative",
    border: "1px solid black",
    width: "fit-content",
    margin: "5px",
    padding: "5px",
}

const KeywordBlock = (props) => {

    return (
        <div style={keyword_styles} onClick={() => props.onClick(props.content, !props.selected)}>
            <span>{props.content}</span>
        </div>
    )
}

export default KeywordBlock
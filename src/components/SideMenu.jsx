import React from "react";

export default (props) => {
    const {src, alt, content, onClick, value} = props
    return (
        <button onClick={onClick} value={value}>
            <img src={src} alt={alt} width={16} height={16}/>
            {content}
        </button>
    );
}
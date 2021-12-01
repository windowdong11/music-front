import React from "react";

export default (props) => {
    const {src, alt, content,href} = props
    return (
        <a href={href || "#"}>
            <img src={src} alt={alt} width={16} height={16}/>
            {content}
        </a>
    );
}
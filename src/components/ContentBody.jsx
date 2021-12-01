import React, {useEffect, useRef} from 'react';

export default (props) => {
    // TODO : props 에 포함될 것들 [Title, li]
    const { title, Component, options } = props;
    return (
        <div className="content-section">
            <div className="content-section-title">{title}</div>
            <ul>
                {Component && options?.map((option, index) => <Component key={index} {...option} />)}
            </ul>
        </div>
    );
}
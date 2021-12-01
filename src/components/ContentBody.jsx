import React, {useEffect, useRef} from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChevronRight } from '@mui/icons-material';

export default (props) => {
    // TODO : props 에 포함될 것들 [Title, li]
    const { title, Component, options, onclickPrevBtn, onclickNextBtn } = props;
    return (
        <div className="content-section">
            <div className="content-section-title">{title}
            <div className='content-section-btn'>
                {onclickPrevBtn
                    && <ChevronLeftIcon className="btn btn-prev" onClick={onclickPrevBtn}/>}
                {onclickNextBtn
                 && <ChevronRight className="btn btn-next" onClick={onclickNextBtn}/>}
            </div>
            </div>
            <ul>
                {Component && options?.map((option, index) => <Component key={index} {...option} />)}
            </ul>
        </div>
    );
}
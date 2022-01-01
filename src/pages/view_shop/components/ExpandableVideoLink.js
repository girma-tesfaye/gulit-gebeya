import React, {useState, useCallback} from 'react';
import * as AiIcons from 'react-icons/ai';
import { IoLogoYoutube } from 'react-icons/io';
import YoutubeEmbed from './YoutubeEmbed';
import {Collapse} from 'react-collapse';
import "./style.scss";

const Accessible = ()=> {

  const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(false);

  const onClick = useCallback(
    () => setIsButtonCollapseOpen(!isButtonCollapseOpen),
    [isButtonCollapseOpen]
  );

  return (
    <div className="accessible">
      <div className="video-link-wraper">
        <button
          className = "video-collapse-button"
          aria-expanded={isButtonCollapseOpen}
          onClick={onClick}
          type="button">
          {isButtonCollapseOpen? <AiIcons.AiOutlineClose style={{color: "white"}}/> : <IoLogoYoutube className="icon-expand"/>} 
        </button>
      </div>
      <Collapse
        className="video-content"
        isOpened={isButtonCollapseOpen}>
          <YoutubeEmbed />
      </Collapse>
    </div>
  );
}

export default Accessible;
import React, { useState } from 'react';
//import { MenuItems } from './MenuItems';
import './Dropdown.css';
import { Link , useHistory} from 'react-router-dom';

function Dropdown(props) {
  const history = useHistory();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const onCategoryClicked = (ItemName) => {
    setClick(false);    
    history.push(`/category_search/${ItemName}`);
  }

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {/* <div className="top-overlay"></div> */}
        {props.MenuItems.map((item, index) => {
          return (
            <li key={index}>
              {/* <Link
                className='dropdown-link' 
                to={item.label}
                onClick={() => onCategoryClicked(item.value)}
              >
                {item.value}
              </Link> */} 
              <a
                className='dropdown-link'                
                onClick={() => onCategoryClicked(item.value)}
              >
                {item.value}
              </a>            
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
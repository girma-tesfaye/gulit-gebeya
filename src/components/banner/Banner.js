import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { SHOP } from '../../constants/routes';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import i1 from '../../images/i1.jpg';
import i2 from '../../images/i2.jpg';
import i3 from '../../images/i3.jpg';
import i6 from '../../images/i6.jpg';

/* 
import i1 from '../../images/bannera.jpg';
import i2 from '../../images/bannerb.jpg';
import i3 from '../../images/bannerc.jpg';
import i6 from '../../images/bannerd.jpg';
import i4 from '../../images/bannere.png'; */

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Banner = () => {

  let sliderArr = [
    {
      image: i1,
      current: true
    },{
      image: i2,
      current: false
    },{
      image: i3,
      current: false
    },{
      image: i6,
      current: false
    }
  ]
  const [x, setX] = useState(0);
  const [displayTime, setDisplayTime] = useState(5000);
  const [banners, setbanners] = useState(sliderArr);
	const [currentImageId, setCurrentImageId] = useState(0);

  const goLeft = () => {
    console.log(x);
    x=== 0? setX(-100*(sliderArr.length-1)):setX(x + 100);
  };
  const goRight = () => {
    console.log(x);
    (x=== -100*(sliderArr.length-1))? setX(0): setX(x - 100);
  };

  const changeImage = (id) => {		
		
		setCurrentImageId(id);
	}

	useEffect(() => {
		let i = 0;
		let timerId = setInterval(() => {

			changeImage(i);
			i = (i >= (banners.length-1))? 0:(i + 1);
		}, displayTime);
		return () => {clearInterval(timerId);}
	}, []);

  const classes = useStyles();

  return (
    <div container className="banner-slider">
      {sliderArr.map((item, index) => {
          return (
            <div 
              key={index} 
              className="banner-slide"
              style={{transform:`translateX(${x}%)`}}
            >
              <img src={banners[currentImageId].image} alt="" />
                {/* <div>
                  {(goRight && goLeft)? (
                    <  img src={ item.image }  />
                  ):(
                    <img src={banners[currentImageId].image} alt="" />)
                  }
                </div> */}  
            </div>
          )
      })} 
      <Link to={SHOP} className="button banner-shop-button">
					Shop Now
				</Link>
      <button 
        id="go-left" 
        onClick={goLeft}
      >
        <FiChevronLeft className="go-left-right-buttons"/>
      </button>
      <button 
        id="go-right"
        onClick={goRight}
      >
        <FiChevronRight className="go-left-right-buttons"/>
      </button>
    </div>
  );
}

export default Banner;
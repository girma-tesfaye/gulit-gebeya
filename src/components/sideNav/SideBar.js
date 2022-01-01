import React, {useEffect, useState, useCallback } from 'react';
import * as AiIcons from 'react-icons/ai';
import SideBarToggle from './SideBarToggle';
import Boundary from '../../helpers/Boundary';
import { getUiUtills } from '../../redux/actions/helperActions';
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useHistory} from 'react-router-dom';
import { setLoading } from '../../redux/actions/miscActions';
import {IoIosArrowForward} from 'react-icons/io';
//import FiltersCollapse from './FiltersCollapse';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
//import {Collapse} from 'react-collapse';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
	/* root: {
	  maxWidth: 345,
	},
	media: {
	  height: 0,
	  paddingTop: '56.25%', // 16:9
	}, */
	expand: {
	  transform: 'rotate(0deg)',
	  marginLeft: 'auto',
	  transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	  }),
	},
	expandOpen: {
	  transform: 'rotate(180deg)',
	}
  }));

const SideBar = (props) => {

	const utills = useSelector(state => state.utills);  
	
	const dispatch = useDispatch();
    const history = useHistory(); 
  	const [click, setClick] = useState(false);

  	const handleClick = () => setClick(!click);

  	const onCategoryClicked = (ItemName) => {
		setClick(false);    
		history.push(`/category_search/${ItemName}`);
	}

    const [isFetching, setFetching] = useState(false);    

    const fetchUtills = (ui, categories, main, sub) => {
		setFetching(true);
		dispatch(getUiUtills({ui:ui ,categories: categories, main: main, sub: sub }));
	};

	useEffect(() => {
		if (utills) {
			fetchUtills(1, null, null);
		}
			return () => dispatch(setLoading(false));
	}, []);

	const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(false);

	const onClickDropDown = useCallback(
		() => setIsButtonCollapseOpen(!isButtonCollapseOpen),
		[isButtonCollapseOpen]
	);

	

	return (
		<Boundary>	
			<div className="overlay"></div>					
			<div className="sidebar">     
				<div className="sidebar-header">
					<h3 className="sidebar-header-title">Search by Category</h3>
					<SideBarToggle>
						{({ onClickToggle }) => (
							<span
								className="side-nav-toggle button-link button button-border button-border-gray button-small"
								onClick={onClickToggle}
							>
							<AiIcons.AiOutlineClose style={{color: "#000", fontSize: 'x-large', position: 'relative', left: -10}}/>
							</span>
						)}
					</SideBarToggle>
				</div> 
				<div className="sidebar-contents">
					<div className="sidebar-categorys-main" onClick={handleClick}>
						{utills.ui.categories.map((categorys, index) => {
						return ( 
							<>  
								{ (window.screen.width < 700) ? (
									<div className="drop-to-side" key={index}>
										<div style={{width:'100%', display: 'flex' }}>
											<div style={{width:'95%'}}>
												<a onClick={() => onCategoryClicked(categorys.value)}>{categorys.main}</a>
											</div>
											<div style={{width:'5%'}}>
												<button
													className = "collapse-expand-arrow"
													aria-expanded={isButtonCollapseOpen}
													onClick={onClickDropDown}
													type="button">
													{isButtonCollapseOpen? <IoIosArrowUp className="expand-slideup"/> : <IoIosArrowDown className="expand-dropdown"/>} 
												</button>
											</div>
										</div>
										<div className="dropdown-sub-categories">
											{isButtonCollapseOpen? <a>{categorys.sub}</a> : ''}
										</div>
										
									</div>
								  ):(
									<div className="drop-to-side" key={index}>
										<a onClick={() => onCategoryClicked(categorys.value)}>
											{categorys.main}
											<IoIosArrowForward className="arrow-forward"/>
										</a>
										<div className="sub-categories"> 
											<a>{categorys.sub}</a>
										</div>
									</div>
								)}
						  </>);
						})}
					</div>					
				</div>
				
			</div>        	
		</Boundary>
	);
};

export default SideBar;
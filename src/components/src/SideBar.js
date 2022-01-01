import React, {useEffect, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import SideBarToggle from './SideBarToggle';
import Boundary from '../../helpers/Boundary';
import { getUiUtills } from '../../redux/actions/helperActions';
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useHistory} from 'react-router-dom';
import { setLoading } from '../../redux/actions/miscActions';

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

    const [Fetching, setFetching] = useState(false);    

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

	return (
		<Boundary>						
			<div className="sidebar">     
				<div className="sidebar-header">
					<h3 className="sidebar-header-title">Search by Category</h3>
					<SideBarToggle>
						{({ onClickToggle }) => (
							<span
								className="side-nav-toggle button-link button button-border button-border-gray button-small"
								onClick={onClickToggle}
							>
							<AiIcons.AiOutlineClose style={{color: "white"}}/>
							</span>
						)}
					</SideBarToggle>
				</div> 
				<div className="sidebar-contents">
					<div className="sidebar-categorys-links" onClick={handleClick}>
						{utills.ui.categories.map((categorys, index) => {
						return (
							<div className="drop-to-side" key={index}>
								<a className="category-link" onClick={() => onCategoryClicked(categorys.value)}>
									{categorys.main}
								</a>
								<div className="sub-categories"> 
									<div>
										<a className="sub-category-link">
											{categorys.sub}
										</a>
									</div> 
								</div>
							</div>
						);
						})} 
					</div>					
				</div>
			</div>        	
		</Boundary>
	);
};

export default SideBar;
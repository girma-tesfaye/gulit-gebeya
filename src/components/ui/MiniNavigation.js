
import React, { useState } from 'react';
import SideBarToggle from '../sideNav/SideBarToggle';
import { IoIosMenu } from 'react-icons/io';
import {Link } from 'react-router-dom';
import * as ROUTE from '../../constants/routes';
import LanguageSellector from './LanguageSelector';


const MiniNavigation = () => {

    return window.screen.width > 640 &&  (
        <nav className="miniNavigation">
            <div className='mini-nav-wraper'> 
                <ul className="mini-nav-menu">
                    <li className="mini-nav-first-item mini-nav-action">
						<SideBarToggle>
							{({ onClickToggle }) => (
								<button
									className="button-link mini-nav-menu-link side-nav-toggle"
									onClick={onClickToggle}
								>
									<IoIosMenu icon='shopping-bag' style={{ fontSize: '2rem' }}/> 
									<span>Categories</span>  
								</button>
							)}
						</SideBarToggle>
					</li>    
				</ul>  	
				<div className="mini-nav-item-wraper">
					<li className="mini-nav-item">
						<Link 
							className="mini-nav-items-link"
							to={ROUTE.HOME}
						>
							Home
						</Link>
					</li>
					<li className="mini-nav-item">
						<Link 
							className="mini-nav-items-link"
							to={ROUTE.SHOP}
						>
							Shops
						</Link>
					</li>
				</div>
				<div className="mini-nav-last-item">
					<li className="mini-nav-item">Get the app</li>
					<li className="mini-nav-item">
						<Link
							className="mini-nav-items-link"  
							to={ROUTE.WISH_LIST} 
						>Wish list
						</Link>
							
						
					</li>
					<li className="mini-nav-item"><LanguageSellector /></li>
				</div>                 
            </div>            
        </nav>
    );
}

export default MiniNavigation

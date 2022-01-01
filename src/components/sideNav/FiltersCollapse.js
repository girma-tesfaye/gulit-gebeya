import React, {useState, useCallback} from 'react';
import { useSelector } from 'react-redux';
import * as ROUTE from '../../constants/routes';
import { VscExpandAll, VscCollapseAll } from 'react-icons/vsc';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Filters from '../ui/components/Filters';
import {Collapse} from 'react-collapse';
import { useLocation } from 'react-router-dom';

const Accessible = ()=> {

  const { pathname } = useLocation();
  const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(false);

  const onClick = useCallback(
    () => setIsButtonCollapseOpen(!isButtonCollapseOpen),
    [isButtonCollapseOpen]
  );

  const store = useSelector(state => ({
    filter: state.filter,
    products: state.products.items,
    basketLength: state.basket.length,
    profile: state.profile,
    isLoading: state.app.loading,
    isAuthenticating: state.app.isAuthenticating,
    productsLength: state.products.items.length
}));


  return (
    <div className="accessible">
      <div className="config">
        <h5 className="sidebar-filter-button">Filter products</h5>
        <button
          className = "collapse-expand"
          aria-expanded={isButtonCollapseOpen}
          onClick={onClick}
          type="button">
          {isButtonCollapseOpen? <VscCollapseAll className="icon-expand"/> : <VscExpandAll className="icon-expand"/>} 
        </button>
      </div>
      <Collapse
        className="sidebar-filter-content"
        isOpened={isButtonCollapseOpen}>
        {(pathname === ROUTE.SHOP || pathname === ROUTE.SEARCH || pathname === ROUTE.SEARCH || pathname === ROUTE.CATEGORY_SEARCH || pathname === ROUTE.VIEW_SHOP) && (
          <Filters
            className="sidebar-filters-wrapper"
            filter={store.filter}
            isLoading={store.isLoading}
            products={store.products}
            productsCount={store.productsLength}
          >
            <button className="button-small-filter button-filter">
              Filters &nbsp;
              <FontAwesomeIcon icon='filter' style={{ fontSize: '12px' }}/>
            </button>
          </Filters>
        )}
      </Collapse>
    </div>
  );
}

export default Accessible;
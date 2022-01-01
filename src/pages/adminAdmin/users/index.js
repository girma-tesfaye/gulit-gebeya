import React, {  useEffect, useState} from 'react';
import {getAdminAdminUsers, clearAdminAdminUsers} from '../../../redux/actions/adminAdminActions';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '../../../helpers/CircularProgress';
//import './index.css';
import { useHistory} from 'react-router-dom';
import { displayDate } from '../../../helpers/utils';
import { setLoading } from '../../../redux/actions/miscActions';
import MessageDisplay from '../../../helpers/MessageDisplay';


const Users = () => {    
    const users = useSelector(state => state.adminAdmin.users); 
    const isLoading = useSelector(state => state.app.loading);
    const requestStatus = useSelector(state => state.app.requestStatus);
     
    const dispatch = useDispatch();
    const history = useHistory(); 
    
    const [isFetching, setFetching] = useState(false);    

    const fetchUsers = (lastkey, role, sort) => {
		setFetching(true);
        const lastRefKey = lastkey === 1? users.lastRefKey: null;
		dispatch(getAdminAdminUsers({lastRefKey:lastRefKey ,userRole: role,sort: sort }));
	};

    useEffect(() => {
		if (users.items.length === 0 || !users.lastRefKey) {
			fetchUsers(1, null, null);
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));
	}, []); 

    useEffect(() => {
		setFetching(false);
	}, [users.lastRefKey]);
    //console.log(orders)



    const defaultFilter = {
		roles: '',		
		sortBy: '',
	}
    const [field, setFilter] = useState(defaultFilter);
	
	const onRoleFilterChange = (e) => {
		const val = e.target.value;
		setFilter({ ...field, roles: val });
	};

	const onSortFilterChange = (e) => {
		setFilter({ ...field, sortBy: e.target.value });
	};


	const onApplyFilter = () => {
        dispatch(clearAdminAdminUsers());
        const Role = field.roles === '' || field.roles === 'ALL'?null:field.roles;
        const Sort = field.sortBy;        
        fetchUsers(2, Role, Sort)
	};

	const onResetFilter = () => {
		setFilter(defaultFilter);
	};

    const fetchMoreUsers = () =>{
        const Role = field.roles === '' || field.roles === 'ALL'?null:field.roles;
        const Sort = field.sortBy;
        fetchUsers(1, Role, Sort);
    }

    
    
    return users.items.length === 0 && !isLoading && !users.lastRefKey ? (
                <MessageDisplay
                    message={requestStatus ? requestStatus : 'Failed to fetch items.'}
                />
            ) : requestStatus ? (
                <MessageDisplay
                    message={requestStatus}
                    action={fetchUsers}
                    buttonLabel="Try Again"
                />
            ):
            (
                <div className='content_tabel'>                    
                    <h1 className='custom_table_title'>Users</h1>
                    <div className='admin_filter_button_content'>
                        <div className='admin_filter_content'>
                            <div className="filters-field">
                                <span>Role</span>                                
                                {isFetching ? (
                                    <h5 className="text-subtle">Loading Users</h5>
                                ) : (
                                        <select
                                            className="filters-brand"
                                            value={field.roles}
                                            disabled={isFetching}
                                            onChange={onRoleFilterChange}
                                        >
                                            <option value="ALL">All</option>
                                            <option value="USER">Users</option>
                                            <option value="ADMIN">Admins</option>
                                            <option value="PROMOTER">Promoters</option>
                                            <option value="ADMIN_ADMIN">Admin Admins</option>                                    
                                        </select>
                                    )}
                            </div>
                            <div className="filters-field">                                
                                <span>Sort By</span>                                
                                {isFetching ? (
                                    <h5 className="text-subtle">Loading Users</h5>
                                ) : (
                                    <select
                                        className="filters-sort-by d-block"
                                        value={field.sortBy}
                                        disabled={isFetching}
                                        onChange={onSortFilterChange}
                                    >
                                        <option value="">None</option>
                                        <option value="date-asc">Date Joined Ascending</option>
                                        <option value="date-desc">Date Joined Descending</option>
                                        <option value="name-asc">Name Ascending</option>
                                        <option value="name-desc">Name Descending</option>
                                    </select>
                                )}                                
                            </div>
                        </div>
                        <div className='admin_filter_content_buttons'>
                            <div>
                                <label className="review_form_label"/>
                                <button className="primary" type="submit" onClick={onApplyFilter}>
                                    Load Users
                                </button>
                            </div>
                            <div>
                                <label className="review_form_label"/>
                                <button className="primary" type="submit" onClick={onResetFilter}>
                                    Reset Filter
                                </button>
                            </div>
                        </div>
                    </div>
                    {users.items.length === 0 ? (
                        <CircularProgress></CircularProgress>
                    ) /* : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) */ : (
                        <table className="custom_table">
                        <thead>
                            <tr>
                            <th>USER ID</th>
                            <th>FULL NAME</th>
                            <th>EMAIL</th>
                            <th>MOBILE</th>
                            <th>ADDRESS</th>
                            <th>ROLE</th>
                            <th>DATE JOINED</th>  
                            <th>DETAIL</th>                                                       
                            </tr>
                        </thead>
                        <tbody>
                            {users.items.map((user) => (
                                <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile.data.num ? user.mobile.data.num : '+251'}</td>
                                <td>{user.address}</td>
                                <td>{user.role}</td>
                                <td>{displayDate(user.dateJoined)/* .substring(0, 10) */}</td>
                                
                                <td>
                                <button
                                    type="button"
                                    className="small"
                                    /* onClick={() => {
                                        history.push(`/order/${order.orderId}`);
                                    }} */
                                >
                                    Details
                                </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    )
                    }

                    {users.total > users.items.length && (
                            <div className="d-flex-center padding-l">
                                <button
                                    className="button button-small"
                                    disabled={isFetching}
                                    onClick={fetchMoreUsers}
                                >
                                    {isFetching ? 'Fetching Users...' : 'Show More Orders'}
                                </button>
                            </div>
                        )
                    }
                </div>
            
            );
};

export default Users;
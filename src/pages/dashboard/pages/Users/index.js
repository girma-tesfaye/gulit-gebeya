import React, { useEffect, useState } from 'react';
import { getAdminAdminUsers, clearAdminAdminUsers } from '../../../../redux/actions/adminAdminActions';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '../../../../helpers/CircularProgress';
//import './index.css';
import { useHistory } from 'react-router-dom';
import { displayDate } from '../../../../helpers/utils';
import { setLoading } from '../../../../redux/actions/miscActions';
import MessageDisplay from '../../../../helpers/MessageDisplay';

/* import UserTable from '../../components/userTable'; */

import TableComponent from '../../components/TableComponent';


const Users = () => {
    const { users, isLoading, requestStatus } = useSelector((state) => ({
        users: state.adminAdmin.users,
        isLoading: state.app.loading,
        requestStatus: state.app.requestStatus
    }));

    const dispatch = useDispatch();
    const history = useHistory();

    const [isFetching, setFetching] = useState(false);

    const fetchUsers = (resetLastKey, role, sort) => {
        setFetching(true);
        const lastRefKey = resetLastKey === false ? users.lastRefKey : null;
        dispatch(getAdminAdminUsers({ lastRefKey: lastRefKey, userRole: role, sort: sort }));
    };

    useEffect(() => {
        if (users.items.length === 0 || !users.lastRefKey) {
            fetchUsers(false, null, null);
        }

        window.scrollTo(0, 0);
        return () => dispatch(setLoading(false));
    }, []);

    useEffect(() => {
        setFetching(false);
    }, [users.lastRefKey]);

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
        const Role = field.roles === '' || field.roles === 'ALL' ? null : field.roles;
        const Sort = field.sortBy;
        fetchUsers(true, Role, Sort)
    };

    const onResetFilter = () => {
        setFilter(defaultFilter);
    };

    const fetchMoreUsers = () => {
        const Role = field.roles === '' || field.roles === 'ALL' ? null : field.roles;
        const Sort = field.sortBy;
        fetchUsers(false, Role, Sort);
    }

    const onSelectUser = (id) => {
        console.log('User Id : ', id);
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
    ) :
        (<>
            <div>
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
                            <label className="review_form_label" />
                            <button className="primary" type="submit" onClick={onApplyFilter}>
                                Load Users
                                </button>
                        </div>
                        <div>
                            <label className="review_form_label" />
                            <button className="primary" type="submit" onClick={onResetFilter}>
                                Reset Filter
                                </button>
                        </div>
                    </div>
                </div>
                {users.items.length === 0 ? (
                    <CircularProgress></CircularProgress>
                ) : (
                    <TableComponent
                        title='User'
                        cols={['User Id', 'Name', 'Email', 'Phone', 'Role', 'Date Joined', 'Detail']}
                        rows={users.items.map((row) => (
                            {
                                id: row.id,
                                data: [row.id, row.fullname, row.email ? row.email : '----', row.phoneNumber ? row.phoneNumber : '----',
                                row.role, row.dateJoined.seconds ? displayDate(row.dateJoined.toDate()) : displayDate(row.dateJoined),
                                <button
                                    type="button"
                                    className="small button-primary"
                                    onClick={() => {
                                        onSelectUser(row.id);
                                    }}
                                >
                                    Details
                                    </button>]
                            }
                        ))}
                        SeeMore={{ title: 'See more users', finished: users.finished, onSeeMore: fetchMoreUsers, isFetching: isFetching}}
                    />
                )
                }

                {/* {users.total > users.items.length && (
                    <div className="d-flex-center padding-l">
                        <button
                            className="button button-small"
                            disabled={isFetching}
                            onClick={fetchMoreUsers}
                        >
                            {isFetching ? 'Fetching Users...' : 'Show More Users'}
                        </button>
                    </div>
                )} */}
            </div>
        </>

        );
};

export default Users;
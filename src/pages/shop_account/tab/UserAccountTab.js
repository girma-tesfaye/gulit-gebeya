/* eslint-disable indent */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { displayDate } from '../../../helpers/utils';
import { SHOP_ACCOUNT_EDIT } from '../../../constants/routes';
import ImageLoader from '../../../helpers/ImageLoader';

const UserProfile = (props) => {
	const profile = useSelector(state => state.shopProfile);
	return (
		<div className="user-profile">
			<div className="user-profile-block">
				<div className="user-profile-banner">
					<div className="user-profile-banner-wrapper">
						<ImageLoader
							alt="Banner"
							className="user-profile-banner-img"
							src={profile.shopBanner}
						/>
					</div>
					<div className="user-profile-avatar-wrapper">
						<ImageLoader
							alt="Avatar"
							className="user-profile-img"
							src={profile.shopAvatar}
						/>
					</div>
					<button
						className="button button-small user-profile-edit"
						onClick={() => props.history.push(SHOP_ACCOUNT_EDIT)}
					>
						Edit Account
						</button>
				</div>
				<div className="user-profile-details">
					<h2 className="user-profile-name">{profile.shopName?profile.shopName:'name no found'}</h2>
					<span>Email</span>
					<br />
					<h5>{profile.shopEmail ? profile.shopEmail : 'email no found'}</h5>
					<span>Address</span>
					<br />
					{profile.shopAddress ? (
						<h5>{profile.shopAddress}</h5>
					) : (
						<h5 className="text-subtle text-italic">Address not set</h5>
					)}
					<span>Mobile</span>
					<br />
					{profile.shopMobile ? (
						profile.shopMobile.data ? (
							<h5>{profile.shopMobile.data.num ? profile.shopMobile.data.num : '+251'}</h5>
						) : (
							<h5 className="text-subtle text-italic">Mobile not set</h5>
						)
					) : (<div />)}
					<span>Date Joined</span>
					<br />
					{profile.shopDateCreated ? (
						<h5>{ profile.shopDateCreated && (profile.shopDateCreated.seconds ? displayDate(profile.shopDateCreated.toDate())  : displayDate(profile.shopDateCreated))}</h5>
					) : (
						<h5 className="text-subtle text-italic">Not available</h5>
					)}
				</div>
			</div>
		</div>
	);
};

export default withRouter(UserProfile);

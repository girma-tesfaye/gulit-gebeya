/* eslint-disable indent */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-input-2';

import Modal from '../../../helpers/Modal';
import Boundary from '../../../helpers/Boundary';
import Input from '../../../helpers/Input';
import CircularProgress from '../../../helpers/CircularProgress';
import ImageLoader from '../../../helpers/ImageLoader';

import { setLoading } from '../../../redux/actions/miscActions';
import { updateShopProfile } from '../../../redux/actions/shopProfileActions';
import useFileHandler from '../../../hooks/useFileHandler';
import { SHOP_ACCOUNT } from '../../../constants/routes';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const EditProfile = (props) => {
	const dispatch = useDispatch();

	useDocumentTitle('Edit SHOP Account | Gullit Gebeya');
	useScrollTop();

	useEffect(() => {
		return () => {
			dispatch(setLoading(false));
		};
	}, []);

	const { profile, auth, isLoading, uiUtills } = useSelector(state => ({
		profile: state.shopProfile,
		auth: state.auth,
		isLoading: state.app.loading,
		uiUtills: state.utills.ui
	}));

	const [field, setField] = useState({
		shopName: { value: profile.shopName ? profile.shopName : '' },
		shopEmail: { value: profile.shopEmail ? profile.shopEmail : '' },
		shopAddress: { value: profile.shopAddress ? profile.shopAddress : '' },
		shopMobile: profile.shopMobile ? (profile.shopMobile.value ? profile.shopMobile : {
			value: '',
			data: {}
		}) : ({
			value: '',
			data: {}
		}),
		shopAvatar: profile.shopAvatar ? profile.shopAvatar : '',
		shopBanner: profile.shopBanner ? profile.shopBanner : '',
		shopDisplay: profile.shopDisplay ? profile.shopDisplay : '',
		shopCategories: { value: profile.shopCategories ? profile.shopCategories : [] },
		shopCitys: { value: profile.shopCitys ? profile.shopCitys : [] },
		shopKeywords: { value: profile.shopKeywords ? profile.shopKeywords : [] },
		shopDetail: { value: profile.shopDetail ? profile.shopDetail : '' },
	});

	const [isOpenModal, setModalOpen] = useState(false);
	const [password, setPassword] = useState(null);
	console.log(field)

	const {
		imageFile,
		isFileLoading,
		onFileChange
	} = useFileHandler({ shopAvatar: {}, shopBanner: {}, shopDisplay: {} });

	const areFieldsChanged = () => {
		const fieldsChanged = Object.keys(field).some((key) => {
			if (typeof profile[key] === 'object' && typeof field[key] === 'object') {
				return profile[key].value !== field[key].value;
			} else if (typeof field[key] === 'object') {
				return field[key].value !== profile[key];
			} else {
				return field[key] !== profile[key];
			}
		});
		const filesUpdated = imageFile.shopBanner.file || imageFile.shopAvatar.file || imageFile.shopDisplay.file;

		return fieldsChanged || filesUpdated;
	};

	const onshopEmailChange = (value, error) => {
		setField({ ...field, shopEmail: { value, error } });
	};

	const onshopNameChange = (value, error) => {
		setField({ ...field, shopName: { value, error } });
	};

	const onshopAddressChange = (value, error) => {
		setField({ ...field, shopAddress: { value, error } });
	};

	const onProductDescriptionInput = (value, error) => {
		setField({ ...field, shopDetail: { value, error } });
	};

	const onshopMobileChange = (value, data) => {
		const obj = {
			dialCode: data.dialCode,
			countryCode: data.countryCode,
			num: value
		};

		setField({
			...field,
			shopMobile: {
				value: value.replace(/[^0-9]+/g, '').slice(data.dialCode.length),
				data: obj
			}
		});
	};

	const onShopCategoriesChange = (newValue) => {
		const shopCategories = newValue.map(word => word.value);

		setField({ ...field, shopCategories: { value: shopCategories } });
	};

	const onShopCitysChange = (newValue) => {
		const shopCitys = newValue.map(word => word.value);

		setField({ ...field, shopCitys: { value: shopCitys } });
	};

	const onShopKeywordsChange = (newValue) => {
		const shopKeywords = newValue.map(word => word.value);

		setField({ ...field, shopKeywords: { value: shopKeywords } });
	};

	const onCloseModal = () => setModalOpen(false);

	const onPasswordInput = (e) => {
		setPassword(e.target.value.trim());
	};

	const update = (credentials = {}) => {
		dispatch(updateShopProfile({
			updates: {
				shopName: field.shopName.value,
				shopEmail: field.shopEmail.value,
				shopAddress: field.shopAddress.value,
				shopMobile: field.shopMobile,
				shopAvatar: field.shopAvatar,
				shopBanner: field.shopBanner,
				shopDisplay: field.shopDisplay,
				shopCategories: field.shopCategories.value,
				shopCitys: field.shopCitys.value,
				shopKeywords: field.shopKeywords.value,
				shopDetail: field.shopDetail.value,
			},
			files: {
				shopBannerFile: imageFile.shopBanner.file,
				shopAvatarFile: imageFile.shopAvatar.file,
				shopDisplayFile: imageFile.shopDisplay.file
			},
			credentials
		}));
	};

	const onConfirmUpdate = () => {
		if (password) {
			update({ email: profile.email, password });
			setModalOpen(false);
		}
	};

	const onSubmitUpdate = () => {
		const noError = Object.keys(field).every(key => !!!field[key].error);

		if (noError) {
			setModalOpen(true);
		}
	};


	return (
		<Boundary>
			<div className="edit-user">
				<h3 className="text-center">Edit Account Details</h3>
				<div className="user-profile-banner">
					<div className="user-profile-banner-wrapper">
						<ImageLoader
							alt="banner"
							className="user-profile-banner-img"
							src={imageFile.shopBanner.url || field.shopBanner}
						/>
						<input
							accept="image/x-png,image/jpeg"
							disabled={isLoading}
							hidden
							id="edit-shopBanner"
							onChange={e => onFileChange(e, { name: 'shopBanner', type: 'single' })}
							type="file"
						/>
						{isFileLoading ? (
							<div className="loading-wrapper">
								<CircularProgress visible={true} theme="light" />
							</div>
						) : (
							<label
								className="edit-button edit-banner-button"
								htmlFor="edit-shopBanner"
							>
								<FontAwesomeIcon icon='pen' />
							</label>
						)}
					</div>
					<div className="user-profile-avatar-wrapper">
						<ImageLoader
							alt="avatar"
							className="user-profile-img"
							src={imageFile.shopAvatar.url || field.shopAvatar}
						/>
						<input
							accept="image/x-png,image/jpeg"
							disabled={isLoading}
							hidden
							id="edit-shopAvatar"
							onChange={e => onFileChange(e, { name: 'shopAvatar', type: 'single' })}
							type="file"
						/>
						{isFileLoading ? (
							<div className="loading-wrapper">
								<CircularProgress visible={true} theme="light" />
							</div>
						) : (
							<label
								className="edit-button edit-avatar-button"
								htmlFor="edit-shopAvatar"
							>
								<FontAwesomeIcon icon='pen' />
							</label>
						)}
					</div>
				</div>
				<div className="user-profile-details">
					<Input
						label="* Shop Name"
						maxLength={40}
						readOnly={isLoading}
						placeholder="Shop Name"
						onInputChange={onshopNameChange}
						isRequired={true}
						field="shopName"
						style={{ textTransform: 'capitalize' }}
						type="text"
						value={field.shopName.value}
					/>
					<Input
						label="* shopEmail"
						maxLength={40}
						readOnly={isLoading}
						placeholder="test@example.com"
						onInputChange={onshopEmailChange}
						isRequired={true}
						field="shopEmail"
						type="email"
						value={field.shopEmail.value}
					/>
					<Input
						label="shopAddress"
						maxLength={120}
						readOnly={isLoading}
						placeholder="eg: #245 Brgy. Maligalig, Arayat Pampanga, Philippines"
						onInputChange={onshopAddressChange}
						isRequired={false}
						field="shopAddress"
						style={{ textTransform: 'capitalize' }}
						type="text"
						value={field.shopAddress.value}
					/>
					{field.shopMobile.error ? <span className="input-message">{field.shopMobile.error}</span> : (
						<span className="d-block padding-s">Shop Mobile</span>
					)}
					<PhoneInput
						country={'et'}
						disabled={isLoading}
						inputClass={`input-form d-block ${field.shopMobile.error ? 'input-error' : ''}`}
						inputExtraProps={{ required: true }}
						// eslint-disable-next-line quote-props
						masks={{ 'et': '+.. .... ... ....' }}
						onChange={onshopMobileChange}
						placeholder="Enter your Shop Mobile number"
						readOnly={isLoading}
						value={field.shopMobile.data.num}
					/>
					<div className="product-form-field">
						<span className="d-block padding-s">Shop Product Categories</span>
						<Select
							isMulti
							placeholder="Input Shop Categories"
							onChange={onShopCategoriesChange}
							defaultValue={profile.shopCategories ? profile.shopCategories.map(category => ({ value: category, label: category })) : []}
							options={uiUtills.categories ? uiUtills.categories.map(category => ({ value: category.main, label: category.main })) : []}
							styles={{
								menu: provided => ({ ...provided, zIndex: 10 })
							}}
						/>
					</div>
					<div className="product-form-field">
						<span className="d-block padding-s">Shop City</span>
						<CreatableSelect
							isMulti
							placeholder="Input Shop City"
							onChange={onShopCitysChange}
							defaultValue={profile.shopCitys ? profile.shopCitys.map(city => ({ value: city, label: city })) : []}
							options={['addis ababa', 'hawasa', 'jima', 'bahir dar', 'adama'].map(city => ({ value: city, label: city }))}
							styles={{
								menu: provided => ({ ...provided, zIndex: 10 })
							}}
						/>
					</div>
					<Input
						label="Shop Name"
						cols={37}
						field="description"
						maxLength={500}
						readOnly={isLoading}
						placeholder="Nice Description of the shop"
						onInputChange={onProductDescriptionInput}
						isRequired={false}
						rows={5}
						type="textarea"
						value={field.shopDetail.value}
					/>
					<div className="product-form-field">
						<span className="d-block padding-s">Keywords</span>
						<CreatableSelect
							isMulti
							placeholder="Input Keywords"
							onChange={onShopKeywordsChange}
							defaultValue={profile.shopKeywords ? profile.shopKeywords.map(keyword => ({ value: keyword, label: keyword })) : []}
							options={['best', 'brand', 'cheep'].map(keyword => ({ value: keyword, label: keyword }))}
							styles={{
								menu: provided => ({ ...provided, zIndex: 10 })
							}}
						/>
					</div>
					<input
						accept="image/x-png,image/jpeg"
						disabled={isLoading}
						hidden
						id="edit-shopDisplay"
						onChange={e => onFileChange(e, { name: 'shopDisplay', type: 'single' })}
						type="file"
					/>
					{isFileLoading ? (
						<div className="loading-wrapper">
							<CircularProgress visible={true} theme="light" />
						</div>
					) : (
						<label
							htmlFor="edit-shopDisplay"
						>
							<span > Change Shop Display Image</span>
						</label>
					)}
					<br />
					<br />
					<div className="edit-user-action">
						<button
							className="button button-muted w-100-mobile"
							disabled={isLoading}
							onClick={() => props.history.push(SHOP_ACCOUNT)}
						>
							Back to Profile
            			</button>
						<button
							className="button w-100-mobile"
							disabled={isLoading || !areFieldsChanged()}
							onClick={onSubmitUpdate}
						>
							<CircularProgress visible={isLoading} theme="light" />
							{isLoading ? 'Updating Profile' : 'Update Profile'}
						</button>
					</div>
				</div>
			</div>
			<Modal
				isOpen={isOpenModal}
				onRequestClose={onCloseModal}
			>
				<div className="text-center padding-l">
					<h4>Confirm Update</h4>
					<p>
						To continue updating shop profile,
                    <br />
                        please confirm by entering your password
                    </p>
					<input
						className="input-form d-block"
						onChange={onPasswordInput}
						placeholder="Enter your password"
						type="password"
					/>
				</div>
				<br />
				<div className="d-flex-center">
					<button
						className="button"
						onClick={onConfirmUpdate}
					>
						Confirm
        			</button>
				</div>
				<button
					className="modal-close-button button button-border button-border-gray button-small"
					onClick={onCloseModal}
				>
					X
        		</button>
			</Modal>
		</Boundary>
	);
};

export default EditProfile;

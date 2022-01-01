import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Input from '../../../helpers/Input';

const ShippingForm = ({ setField, field }) => {
	const [errorMobile, setErrorMobile] = useState('');

	const onFullNameInput = (value, error) => {
		setField({ ...field, fullname: { value, error } });
	};

	const onEmailInput = (value, error) => {
		setField({ ...field, email: { value, error } });
	};

	const onRegionInput = (value, error) => {
		setField({ ...field, region: { value, error } });
	};

	const onZoneInput = (value, error) => {
		setField({ ...field, zone: { value, error } });
	};

	const onWeredaInput = (value, error) => {
		setField({ ...field, wereda: { value, error } });
	};

	const onKebeleInput = (value, error) => {
		setField({ ...field, kebele: { value, error } });
	};

	const onNoteInput = (value, error) => {
		setField({ ...field, note: { value, error } });
	};

	const onAddressInput = (value, error) => {
		setField({ ...field, postaAddress: { value, error } });
	};

	const onMobileInput = (value, data) => {
		const obj = {
			dialCode: data.dialCode,
			countryCode: data.countryCode,
			num: value
		};

		if (value.length === 0) {
			setErrorMobile('Mobile number is required.');
		} else {
			setErrorMobile('');
		}

		setField({
			...field,
			mobile: {
				value: value.replace(/[^0-9]+/g, '').slice(data.dialCode.length),
				error: errorMobile,
				data: obj
			}
		});
	};

	const errorClassName = () => {
		return errorMobile ? 'input-error' : '';
	};

	const onShippingOptionChange = () => setField({ ...field, isInternational: !field.isInternational });

	return (
		<div className="checkout-shipping-wrapper">
			<div className="checkout-shipping-form">
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						<Input
							field="fullname"
							isRequired
							label="* Full Name"
							maxLength={40}
							onInputChange={onFullNameInput}
							placeholder="Your Full Name"
							style={{ textTransform: 'capitalize' }}
							type="text"
							value={field.fullname.value}
						/>
					</div>
				</div>
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						<Input
							field="email"
							isRequired
							label="* Email"
							maxLength={40}
							onInputChange={onEmailInput}
							placeholder="Your Email"
							type="email"
							value={field.email.value}
						/>
					</div>
				</div>
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						<Input
							field="postaAddress"
							isRequired = {field.isInternational ? true : false}
							label={field.isInternational ? '* Posta Address' : 'Posta Address (required only for reginal shipping'}
							maxLength={120}
							onInputChange={onAddressInput}
							placeholder="Shipping Posta Address e.g 810"
							type="text"
							value={field.postaAddress.value}
						/>
					</div>
				</div>
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						{errorMobile ? <span className="input-message">{errorMobile}</span> : (
							<span className="d-block padding-s">* Mobile Number</span>
						)}
						<PhoneInput
							country={'et'}
							inputClass={`input-form d-block ${errorClassName('mobile')}`}
							inputExtraProps={{ required: true }}
							// eslint-disable-next-line quote-props
							masks={{ 'et': '. .. .. .. ..' }}
							onChange={onMobileInput}
							placeholder="0911121314"
							value={field.mobile.data.num}
						/>
					</div>
				</div>
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						<Input
							field="region"
							isRequired
							label="* Region"
							maxLength={40}
							onInputChange={onRegionInput}
							placeholder="Your Region"
							style={{ textTransform: 'capitalize' }}
							type="text"
							value={field.region.value}
						/>
					</div>
				</div>
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						<Input
							field="zone"
							isRequired
							label="* Zone or Kifle Ketema"
							maxLength={40}
							onInputChange={onZoneInput}
							placeholder="Your Zone"
							style={{ textTransform: 'capitalize' }}
							type="text"
							value={field.zone.value}
						/>
					</div>
				</div>
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						<Input
							field="wereda"
							isRequired
							label="* Wereda"
							maxLength={40}
							onInputChange={onWeredaInput}
							placeholder="Your Wereda"
							style={{ textTransform: 'capitalize' }}
							type="text"
							value={field.wereda.value}
						/>
					</div>
				</div>
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						<Input
							field="kebele"
							isRequired
							label="* Kebele"
							maxLength={40}
							onInputChange={onKebeleInput}
							placeholder="Your Kebele"
							style={{ textTransform: 'capitalize' }}
							type="text"
							value={field.kebele.value}
						/>
					</div>
				</div>
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						<Input
							field="note"							
							label="Order Notes (optional)"
							maxLength={150}
							onInputChange={onNoteInput}
							placeholder="Notes about your order e.g. special note for delivery."							
							type="textarea"
							value={field.note.value}
						/>
					</div>					
				</div>
				<div className="checkout-fieldset">
					<div className="checkout-field">
						<span className="d-block padding-s">Shipping Option</span>
						<div className="checkout-checkbox-field">
							<input
								checked={field.isInternational}
								className=""
								id="shipping-option-checkbox"
								onChange={onShippingOptionChange}
								type="checkbox"
							/>
							<label className="d-flex w-100" htmlFor="shipping-option-checkbox">
								<h5 className="d-flex-grow-1 margin-0">
									&nbsp; Reginal Shipping &nbsp;
									<span className="text-subtle">1-2 days</span>
									{field.isInternational && <span className="text-subtle"> (for reginal shipping posta code is required!!)</span>}
								</h5>
								<h4 className="margin-0">50.00 Birr</h4>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShippingForm;

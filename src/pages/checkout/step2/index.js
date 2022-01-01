/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { CHECKOUT_STEP_1, CHECKOUT_STEP_3 } from '../../../constants/routes';
import { setShippingDetails } from '../../../redux/actions/checkoutActions';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';
import withAuth from '../hoc/withAuth';
import StepTracker from '../components/StepTracker';
import Pagination from '../components/Pagination';
import ShippingForm from './ShippingForm';
import ShippingTotal from './ShippingTotal';


const ShippingDetails = ({
	profile,
	shipping,
	subtotal,
	history
}) => {
	useDocumentTitle('Check Out Step 2 | Gullit Gebeya');
	useScrollTop();

	const [field, setField] = useState({
		fullname: { value: profile.fullname ? profile.fullname : '' },
		email: { value: profile.email ? profile.email : '' },
		region: {value: shipping.region ? shipping.region : ''}, 
		zone: {value: shipping.zone ? shipping.zone : ''}, 
		wereda: {value: shipping.wereda ? shipping.wereda : ''}, 
		kebele: {value: shipping.kebele ? shipping.kebele : ''},
		note: {value: shipping.note ? shipping.note : ''}, 
		postaAddress: { value: shipping.postaAddress ? shipping.postaAddress : '' },
		mobile: profile.mobile.value ? profile.mobile : shipping.mobile ? shipping.mobile : {
			value: '',
			data: {}
		},
		isInternational: !!shipping.isInternational ? shipping.isInternational : false,
		isDone: false
	});
	const dispatch = useDispatch();
	const noError = Object.keys(field).every((key) => {	
			if(!field.isInternational && key == 'postaAddress'){
				return true;
			}	
			if(key === 'note'){
				return true;
			} 
			if (typeof field[key] === 'object') {
				// eslint-disable-next-line no-extra-boolean-cast				
				return !!field[key].value && !!!field[key].error;
				// eslint-disable-next-line no-else-return
			} else {
				return true;
			}		
	});

	const saveShippingDetails = () => {
		const isChanged = true; // TODO save only if changed

		if (isChanged) {
			dispatch(setShippingDetails({
				fullname: field.fullname.value,
				email: field.email.value,
				region: field.region.value,
				zone: field.zone.value,
				wereda: field.wereda.value,
				kebele: field.kebele.value,
				note: field.note.value,
				postaAddress: field.postaAddress.value,
				mobile: field.mobile,
				isInternational: field.isInternational,
				isDone: true
			}));
		}
	};

	const onClickNext = () => {
		
		if (noError) {
			saveShippingDetails();
			history.push(CHECKOUT_STEP_3);
		}
	};

	return (
		<div className="checkout">
			<StepTracker current={2} />
			<div className="checkout-step-2">
				<h3 className="text-center">
					Shipping Details
				</h3>
				<ShippingForm
					field={field}
					history={history}
					profile={profile}
					setField={setField}
					shipping={shipping}
					subtotal={subtotal}
				/>
				<br />
				<ShippingTotal subtotal={subtotal} field={field} />
				<br />
				<Pagination
					disabledNext={!noError}
					history={history}
					onClickNext={onClickNext}
					onClickPrevious={() => history.push(CHECKOUT_STEP_1)}

				/>
			</div>
		</div>
	);
};

export default withAuth(ShippingDetails);

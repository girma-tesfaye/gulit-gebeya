import React, { useState } from 'react';
import Modal from '../../helpers/Modal';
import Input from '../../helpers/Input';
import firebase from '../../firebase/firebase';

function GetProductUrl(props) {

	const onCloseModal = () => setModalOpen(false);
	const onOpenModal = () => setModalOpen(true);
	const [isOpenModal, setModalOpen] = useState(false);

	const [field, setFilter] = useState({
		channel: 'channel_1',
	});

	const onchannelChange = (e) => {
		setFilter({ ...field, channel: e.target.value });
	};

	return (
		<>
			<button
				type="button"
				className="small button-primary"
				onClick={onOpenModal}
			>
				Get Url
            </button>
			{/* <div className="product-modal-action">
				<button
					className='button button-small'
					onClick={onOpenModal}
				>
					Get Product Url
                </button>
			</div> */}
			<Modal
				isOpen={isOpenModal}
				onRequestClose={onCloseModal}
			>
				<div className="text-center padding-l">
					<h4>Confirm Update</h4>
					<p>
						copy the url below and then palce on your social media platform.
                        <br />
                        when user get in to out web app though your link and
                        <br />
                        perchese product with in 4 hours you get commission
                        <br />
                        thank you.

                    </p>
					<div className="filters-field">
						<span>channel</span>
						<br />
						<br />
						<select
							className="filters-sort-by d-block"
							value={field.channel}														
							onChange={onchannelChange}
						>
							<option value="channel_1">Channel 1</option>
							<option value="channel_2">Channel 2</option>
							<option value="channel_3">Channel 3</option>
							<option value="channel_4">Channel 4</option>
							<option value="channel_5">Channel 5</option>
							<option value="channel_6">Channel 6</option>
							<option value="channel_7">Channel 7</option>
							<option value="channel_8">Channel 8</option>
							<option value="channel_9">Channel 9</option>
							<option value="channel_10">Channel 10</option>
						</select>
					</div>					
					<div className="product-form-field product-textarea">
						<Input
							cols={37}
							//field="description"
							//isRequired={false}
							label="Product Url"
							maxLength={200}
							//onInputChange={onProductDescriptionInput}
							//placeholder={`https://gullit-gebeya.web.app/product/${props.productId}?promoId=${props.promoterId}&productId=${props.productId}`}
							readOnly={false}
							rows={5}
							type="textarea"
							value={`https://gullit-gebeya.web.app/product/${props.productId}?promoterProductId=${props.promoterProductId}&promoterId=${firebase.auth.currentUser.uid}&fromWhere=${field.channel ? field.channel : 'channel_1'}`}
						/>
					</div>
				</div>
				<br />

				<button
					className="modal-close-button button button-border button-border-gray button-small button-danger"
					onClick={onCloseModal}
				>
					X
                </button>
			</Modal>
		</>
	);
}

export default GetProductUrl;
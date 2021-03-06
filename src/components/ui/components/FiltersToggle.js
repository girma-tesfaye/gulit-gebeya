import React from 'react';
import { useDispatch } from 'react-redux';
import useModal from '../../../hooks/useModal';
import Filters from './Filters';
import Modal from '../../../helpers/Modal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const FiltersToggle = ({
	filter,
	isLoading,
	products,
	productsCount,
	children
}) => {
	const { isOpenModal, onOpenModal, onCloseModal } = useModal();
	const dispatch = useDispatch();

	return (
		<>
			<div
				className="filters-toggle"
				onClick={onOpenModal}
			>
				{children}
			</div>
			<Modal
				isOpen={isOpenModal}
				onRequestClose={onCloseModal}
			>
				<div className="filters-toggle-sub">
                    <Filters
						closeModal={onCloseModal}
						dispatch={dispatch}
						filter={filter}
						isLoading={isLoading}
						products={products}
						productsCount={productsCount}
					/>
				</div>
				<button
					className="modal-close-button"
					onClick={onCloseModal}
				>					
                    <FontAwesomeIcon icon='times-circle' />
				</button>
			</Modal>
		</>
	);
};

export default FiltersToggle;

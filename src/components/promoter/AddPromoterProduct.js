import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placePromoterProduct } from '../../redux/actions/promoterActions';

function AddPromoterProduct({ product }) {

    const dispatch = useDispatch();

    const { isLoading } = useSelector(state => ({		
		isLoading: state.app.loading
	}));

    const onAddPromoterProduct = () => {
        const promoterProduct = {
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            productPrice: product.price,
        }
        dispatch(placePromoterProduct(promoterProduct));
    }

    return (
        <div>
            <div className="product-modal-action">
                <button
                    className='button button-small button-primary'
                    onClick={onAddPromoterProduct}
                    disabled={isLoading}
                >
                    {isLoading?'please wait...':'Promote Product'}
                </button>
            </div>
        </div>
    );
}

export default AddPromoterProduct;
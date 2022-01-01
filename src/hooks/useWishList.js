import { displayActionMessage } from '../helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList as dispatchAddToWishList, removeFromWishList } from '../redux/actions/wishListActions';

const useWishList = () => {
    const { wishList } = useSelector(state => ({ wishList: state.wishList }));
    const dispatch = useDispatch();

    const isItemOnWishList = (id) => !!wishList.find(item => item.id === id);

    const addToWishList = (product) => {
        if (isItemOnWishList(product.id)) {
            dispatch(removeFromWishList(product.id));
            displayActionMessage('Item removed from Wish List', 'info');
        } else {
            dispatch(dispatchAddToWishList(product));
            displayActionMessage('Item added to Wish List', 'success');
        }
    };

    return { wishList, isItemOnWishList, addToWishList };
};

export default useWishList;
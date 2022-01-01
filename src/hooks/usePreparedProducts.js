import { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';

const usePreparedProducts = (itemsCount) => {
    const [preparedProducts, setPreparedProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (preparedProducts.length === 0) {
            fetchPreparedProducts();
        }
    }, []);

    const fetchPreparedProducts = async () => {
        try {
            setLoading(true);
            setError('');

            const docs = await firebase.getPreparedProducts(itemsCount);

            if (docs.empty) {
                setError('No featured products found.');
            } else {
                const items = [];

                docs.forEach((snap) => {
                    const data = snap.data();
                    items.push({ id: snap.ref.id, ...data });
                });

                setPreparedProducts(items);
                setLoading(false);
            }
        } catch (e) {
            setError('Failed to fetch featured products');
            setLoading(false);
        }
    };

    return { preparedProducts, fetchPreparedProducts, isLoading, error };
};

export default usePreparedProducts;

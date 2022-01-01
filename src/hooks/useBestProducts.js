import { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';

const useBestProducts = (itemsCount) => {
    const [bestProducts, setBestProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (bestProducts.length === 0) {
            fetchBestProducts();
        }
    }, []);

    const fetchBestProducts = async () => {
        try {
            setLoading(true);
            setError('');

            const docs = await firebase.getBestProducts(itemsCount);

            if (docs.empty) {
                setError('No featured products found.');
            } else {
                const items = [];

                docs.forEach((snap) => {
                    const data = snap.data();
                    items.push({ id: snap.ref.id, ...data });
                });

                setBestProducts(items);
                setLoading(false);
            }
        } catch (e) {
            setError('Failed to fetch featured products');
            setLoading(false);
        }
    };

    return { bestProducts, fetchBestProducts, isLoading, error };
};

export default useBestProducts;

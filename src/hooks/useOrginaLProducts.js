import { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';

const useOrginalProducts = (itemsCount) => {
    const [orginalProducts, setOrginalProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (orginalProducts.length === 0) {
            fetchOrginalProducts();
        }
    }, []);

    const fetchOrginalProducts = async () => {
        try {
            setLoading(true);
            setError('');

            const docs = await firebase.getOrginalProducts(itemsCount);

            if (docs.empty) {
                setError('No featured products found.');
            } else {
                const items = [];

                docs.forEach((snap) => {
                    const data = snap.data();
                    items.push({ id: snap.ref.id, ...data });
                });

                setOrginalProducts(items);
                setLoading(false);
            }
        } catch (e) {
            setError('Failed to fetch featured products');
            setLoading(false);
        }
    };

    return { orginalProducts, fetchOrginalProducts, isLoading, error };
};

export default useOrginalProducts;

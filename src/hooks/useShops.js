import { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';

const useShops = (itemsCount) => {
    const [Shops, setShops] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (Shops.length === 0) {
            fetchShops();
        }
    }, []);

    const fetchShops = async () => {
        try {
            setLoading(true);
            setError('');  

            const docs = await firebase.getShops();          
            
            if (docs.empty) {                
                setError('No shops found.');
            } else {
                const items = [];

                docs.forEach((snap) => {
                    const data = snap.data();
                    items.push({ id: snap.ref.id, ...data });
                });  

                setShops(items);
                setLoading(false);
            }
        } catch (e) {
            setError('Failed to fetch featured products');
            console.log(e);
            setLoading(false);
        }
    };

    return { Shops, fetchShops, isLoading, error };
};

export default useShops;

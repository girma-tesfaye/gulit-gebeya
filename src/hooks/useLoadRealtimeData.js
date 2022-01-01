import { CodeSandboxCircleFilled } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

//const field = 'username';
//const defaultPageSize = 3;

const useGetUtils = ({ ref, field, pageSize }) => {

    //var [query, setQuery] = useState(ref.orderBy(field).limit(pageSize));
    var [unsubscribeRef, setUnsubscribeRef] = useState(null);

    const [isFeaching, setIsFeaching] = useState(false);
    const [feachError, setFeachError] = useState(null);
    const [docs, setDocs] = useState([]);

    var [lastVisible, setLastVisible] = useState(null);
    var [firstVisible, setFirstVisible] = useState(null);
    var [isFinished, setIsFinished] = useState(false);


    function fitchDocs(query) {        
        if (unsubscribeRef) {
            unsubscribeRef();
        }        
        query.onSnapshot((querySnapshot) => {
            console.log('load');
            var docsRef = [];
            if(querySnapshot.docs.length < pageSize){
                setIsFinished(true);
                if(querySnapshot.docs.length === 0){
                    setIsFeaching(false);
                }else{
                    querySnapshot.forEach((doc) => {
                        docsRef.push(doc.data());
                    });
                    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
                    setFirstVisible(querySnapshot.docs[0]);
                    setDocs(docsRef);
                    setIsFeaching(false);
                }
            }else{
                setIsFinished(false);
                querySnapshot.forEach((doc) => {
                    docsRef.push(doc.data());
                });
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
                setFirstVisible(querySnapshot.docs[0]);
                setDocs(docsRef);
                setIsFeaching(false);
            }                      
        }, (error) => {
            console.log('error', error)            
            setFeachError(error);
            setIsFeaching(false);
        });    
    }    

    useEffect(() => {        
        setIsFeaching(true);
        fitchDocs(ref.orderBy(field).limit(pageSize));                  
    }, []);

    function nextPage() {        
        setIsFeaching(true);
        fitchDocs(ref.orderBy(field).startAfter(lastVisible).limit(pageSize));        
    }

    function prevPage() {        
        setIsFeaching(true);
        fitchDocs(ref.orderBy(field).endBefore(firstVisible).limitToLast(pageSize));        
    }

    return {docs, isFeaching, feachError, unsubscribeRef, nextPage, prevPage}
}

export default useGetUtils;
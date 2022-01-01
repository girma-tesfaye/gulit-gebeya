import React, { useState, useEffect } from 'react';
import CircularProgress from '../../../helpers/CircularProgress';
import ImageLoader from '../../../helpers/ImageLoader';
import Input from '../../../helpers/Input';

import useFileHandler from '../../../hooks/useFileHandler';
import firebase from '../../../firebase/firebase';

const ProductForm = () => {

    const [field, setField] = useState({
        name: { value: '' },
        description: { value: '' },
        imageUrl: { value: '' },
    });

    const [isLoading,setIsLoading] = useState(false);

    const {
        imageFile,
        isFileLoading,
        onFileChange,
        removeImage,
    } = useFileHandler({ image: {}});



    const onProductNameInput = (value, error) => {
        setField({ ...field, name: { value, error } });
    };



    const onProductDescriptionInput = (value, error) => {
        setField({ ...field, description: { value, error } });
    };


    const onSubmitForm = (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-extra-boolean-cast
        const noError = Object.keys(field).every(key => !!!field[key].error);

        if (field.name.value
            && field.description.value
            && (imageFile.image.file || field.imageUrl.value)
            && noError
        ) {
            const request = {};
            Object.keys(field).forEach((i) => {
                request[i] = field[i].value;
            });
            const updates = {applied:true, application:{type:'UPGRADE_TO_PROMOTER_ACCOUNT',data:{...request, /* image: imageFile.image.file ? imageFile.image.file : field.imageUrl.value, */}} }
            setIsLoading(true);
            console.log('updates', updates);
            console.log('user id',firebase.auth.currentUser.uid);
            const userRef = firebase.db.collection('users').doc(firebase.auth.currentUser.uid).update(updates)
                .then(() => {
                    setIsLoading(false);
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    setIsLoading(false);
                    console.error("Error updating document: ", error);
                });

        }
    };

    return (

        <div>
            <form
                className="product-form"
                onSubmit={onSubmitForm}
            >
                <div className="product-form-inputs">
                    <div className="d-flex">
                        <div className="product-form-field">
                            <Input
                                field="name"
                                isRequired
                                label="* Product Name"
                                maxLength={60}
                                onInputChange={onProductNameInput}
                                placeholder="Abebe"
                                readOnly={isLoading}
                                style={{ textTransform: 'capitalize' }}
                                type="text"
                                value={field.name.value}
                            />
                        </div>
                    </div>
                    <div className="product-form-field product-textarea">
                        <Input
                            cols={37}
                            field="description"
                            isRequired={false}
                            label="Product Description"
                            maxLength={200}
                            onInputChange={onProductDescriptionInput}
                            placeholder="Nice Description (include detail spesfications and delivery details)"
                            readOnly={isLoading}
                            rows={5}
                            type="textarea"
                            value={field.description.value}
                        />
                    </div>
                    <div className="product-form-field product-form-submit">
                        <button
                            className="button"
                            disabled={isLoading}
                            type="submit"
                        >
                            <CircularProgress
                                theme="light"
                                visible={isLoading}
                            />
                            {isLoading ? 'Saving Product' : 'Save Product'}
                        </button>
                    </div>
                </div>
                <div className="product-form-file">
                    <div className="product-form-field">
                        <span className="d-block padding-s">* Thumbnail</span>
                        <input
                            disabled={isLoading}
                            hidden
                            id="product-input-file"
                            onChange={e => onFileChange(e, { name: 'image', type: 'single' })}
                            readOnly={isLoading}
                            type="file"
                        />
                        {!isFileLoading && (
                            <label htmlFor="product-input-file">
                                Choose Image
                            </label>
                        )}
                    </div>
                    <div className="product-form-image-wrapper">
                        {(imageFile.image.url || field.imageUrl.value) && (
                            <ImageLoader
                                alt=""
                                className="product-form-image-preview"
                                src={imageFile.image.url || field.imageUrl.value}
                            />
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;


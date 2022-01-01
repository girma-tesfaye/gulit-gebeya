import React, {useState, useEffect} from 'react'
import { useParams, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Slider.css'
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'
import ImageLoader from '../../../../helpers/ImageLoader';
import firebase from '../../../../firebase/firebase';
import { SHOP } from '../../../../constants/routes';

import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import ReactStars from "react-rating-stars-component";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    productImageCollection: {
        width: '100%',
        height: '100%',
        padding: 0,
        position: 'relative',
    },
    containerSlider: {
        maxWidth: '100%',
        height: 300,
        position: 'relative',
        overFlow: 'hidden',
        boxShadow: 'none',
        borderBottom: '1px solid #e1e1e1',
        borderRadius: 0
    }
    
  }));

export default function Slider() {

    const classes = useStyles();

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();


    const initProduct = useSelector(state => state.products.items.find(item => item.id === id));
    const [product, setProduct] = useState(initProduct || null);
    const [loadingProduct, setLoadingProduct] = useState(false);

    useEffect(() => {
        if (!product) {
            setLoadingProduct(true);
            firebase.getProduct(id)
                .then((doc) => {
                    if (doc.exists) {
                        const data = {...doc.data(),id: doc.ref.id };
                        setProduct(data);
                        setLoadingProduct(false);                        
                    } else {
                        history.push(SHOP);
                        setLoadingProduct(false); 
                    }
                })
                .catch((e) => {
                    history.push(SHOP);
                    setLoadingProduct(false); 
                });
        }
    }, []);

    const [selectedImage, setSelectedImage] = useState(product?.image || '');

    useEffect(() => {        
        setSelectedImage(product?.image);
    }, [product]);

    return (
        <>
            {(product && !loadingProduct) && (
                <Card className={classes.containerSlider}>
                    {product.imageCollection.length !== 0 && (
                        <CardMedia className={classes.productImageCollection}>
                            {product.imageCollection.map((image, index) => (
                                <div
                                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                                    key={image.id}
                                    onClick={() => setSelectedImage(image.url)}
                                >
                                    <ImageLoader
                                        className="product-modal-image-collection-img"
                                        src={image.url}
                                    />
                                </div>
                            ))}
                        </CardMedia>
                    )}
                    <BtnSlider moveSlide={nextSlide} direction={"next"} />
                    <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

                    <div className="container-dots">
                        {Array.from({length: 5}).map((item, index) => (
                            <div 
                            onClick={() => moveDot(index + 1)}
                            className={slideIndex === index + 1 ? "dot active" : "dot"}
                            ></div>
                        ))}
                    </div>
                </Card>
            )}
        </>
    )
}


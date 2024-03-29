import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import { listProductDetail, updateProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader';
import { USER_UPDATE_RESET, USER_DETAILS_RESET } from '../constants/userConstant'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';

const ProductEditScreen = () => {
    const productId = useParams().id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();
    const productDetail = useSelector(state => state.productDetail);
    const {loading, error, product} = productDetail;
    const productUpdate = useSelector(state => state.productUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success:successUpdate} = productUpdate;
    const navigate = useNavigate()
    // console.log('loading' , product);
   
    const submitHandler = (e) => {
        console.log('vijay');
        e.preventDefault()
        dispatch(updateProduct({_id: product._id, name, price, image, brand, category, countInStock, description}))
        dispatch(listProductDetail(productId))
    };
    const uploadFileHandeler = async(e) => {
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch(err) {
            console.log(err)
            setUploading(false)
        }
    }
    useEffect(() => {
        if(successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        } else {
            if(product === undefined || ((!product.name || product.name === undefined) || ((product._id === undefined) || product._id !== productId))) {
                dispatch(listProductDetail(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setImage(product.image)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [product, productId, dispatch, successUpdate, dispatch, productUpdate, productDetail])

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3">Go Back</Link>
            <FormContainer>
                <h1>Edit product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                 {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter the name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter the price" value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" placeholder="Enter the url" value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>  
                        <Form.File id="image-file" label="Choose file" custom onChange={uploadFileHandeler}></Form.File> 
                        {loading && <Loader />}
                    </Form.Group>
                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" placeholder="Enter the brand" value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>   
                    </Form.Group>
                    <Form.Group controlId="countInStock">
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control type="number" placeholder="Enter the stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter the category" value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>   
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter the description" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>   
                    </Form.Group>
                    <Button className="my-3" type="submit" variant="primary">Update</Button>
                </Form>
                )} 
                
            </FormContainer>
        </> 
    )
}

export default ProductEditScreen;
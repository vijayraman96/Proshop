import React, {useState, useEffect} from 'react'
import {useRef, useNavigate} from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux';

const ProductCarousel = () => {
    const dispatch = useDispatch();
    const productTopRated = useSelector(state => state.productTopRated)
    const {loading, error, products} = productTopRated;
    const navigate = useNavigate()
    const navigateHandeler = (val) => {
        navigate(val)
    }
    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])
  return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
    <Carousel pause="hover" className="bg-dark">
        {products.map(product => (
            <Carousel.Item key={product._id}>
                <div className='d-flex justify-content-center align-items-center' onClick={() => {navigateHandeler(`/product/${product._id}`)}}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                    <Carousel.Caption className='carousel-caption'> 
                        <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default ProductCarousel

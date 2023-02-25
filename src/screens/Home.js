import React, {useState, useEffect} from 'react';
import Product from '../components/Product'
import products from '../products'
import {Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(listProducts())
  }, [dispatch])
  return (
    <div>
        <h3>Latest Products</h3>
        {
          loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) : (
            <Row>
            {products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} ></Product>
                </Col>
            ))}
          </Row>
          )
        }
     
    </div>
  )
}

export default Home

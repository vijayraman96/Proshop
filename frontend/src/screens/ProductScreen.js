import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import {Col, Row, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap';
import Ratings from '../components/Ratings';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import { listProductDetail } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {  useNavigate } from 'react-router-dom';
const ProductScreen = () => {
    const {id} = useParams();
    // const product = products.find(p => p._id === id)
    const productDetail = useSelector((state) => state.productDetail)
    const { loading, error, product } = productDetail
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch();
    console.log(id);
    useEffect(() => {
        dispatch(listProductDetail(id))
      }, [dispatch, id])
      const navigate = useNavigate();
      const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty))
        console.log(product._id)
        navigate('/cart')
      }
  return (
    <>
        <Link className='btn btn-light my-3' to="/">Go Back</Link>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>: (
            <Row className="no-wrap">
            <Col md={6}>
                <Image src={product.image} alt={product.image } fluid/>
            </Col>
            <Col md={3}>
                <ListGroup>
                    <ListGroupItem>
                        <h3>{product.name}</h3>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Ratings value={product.rating} text={`${product.numReviews} Reviews`}></Ratings>
                    </ListGroupItem>
                    <ListGroupItem>Price: ${product.price}</ListGroupItem>
                    <ListGroupItem>Description: {product.description}</ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Price: 
                                </Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Status: 
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroupItem>
                        {product.countInStock > 0 && (
                            <ListGroupItem>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                             {
                                                [...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))
                                             }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )}
                        <ListGroupItem>
                            <div className="d-grid">
                                <Button className='btn-block' type="button" disabled={product.countInStock === 0 } onClick={addToCartHandler}>Add to Cart</Button>
                            </div>
                            
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        )} 
        
    </>
  )
}

export default ProductScreen

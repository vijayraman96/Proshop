import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import {Col, Row, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap';
import Ratings from '../components/Ratings';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import { listProductDetail, createProductReview } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {  useNavigate } from 'react-router-dom';
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS } from '../constants/productConstants';
import Meta from '../components/Meta'
const ProductScreen = () => {
    const {id} = useParams();
    
    const productDetail = useSelector((state) => state.productDetail)
    const { loading, error, product } = productDetail
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo} = userLogin
    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview} = productReviewCreate
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch();
    console.log(id, 'id');
    useEffect(() => {
        if(successProductReview) {
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetail(id))
        console.log('vijay')
      }, [dispatch, id, successProductReview])
      const navigate = useNavigate();
      const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty))
        console.log(product._id)
        navigate('/cart')
      }
      const submitHandeler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, {rating, comment}))
      }
  return (
    <>
        <Link className='btn btn-light my-3' to="/">Go Back</Link>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>: (
            <>
                <Meta title={product.name} />
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
                <Row>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {console.log(product)}
                        {console.log(Array.isArray(product.review))}
                        {product && (Array.isArray(product.review) && product.review.length == 0) && <Message>No Reviews</Message>}
                        <ListGroup variant="flush">
                            {product && Array.isArray(product.review) && product.review.map(review => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Ratings value={review.rating}></Ratings>
                                    <p>{review.createdAt.substring(0, 0)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                               
                            ))}
                             <ListGroup.Item>
                                <h2>Write a customer Review</h2>
                                {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandeler}>
                                        <Form.Group controlId="rating">
                                            <Form.Label>
                                                Rating
                                            </Form.Label>
                                            <Form.Control as="select" value={rating} onChange={(e) =>setRating(e.target.value)}>
                                                <option value="">Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="1">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment">
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control as="textarea" row="3" value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Button type="submit" variant="primary">Submit</Button>
                                    </Form>
                                ): (
                                    <Message>
                                        please <Link to="/login">Sign In</Link>to write a Review{' '}
                                    </Message>
                                )}
                             </ListGroup.Item>
                        </ListGroup>
                        
                    </Col>
                </Row>
        </>
        )} 
    </>
  )
}

export default ProductScreen

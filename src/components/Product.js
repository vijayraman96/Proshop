import React from 'react'
import Card from 'react-bootstrap/Card';
import Ratings from './Ratings'
import {Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const Product = ({product}) => {
  const navigate = useNavigate()
  const navigateHandeler = (val) => {
    navigate(val)
  }
  return (
    <div >
      <Card className="my-3 p-3 rounded">
        <div onClick={() => {navigateHandeler(`/product/${product._id}/`)}}>
            <Card.Img src={product.image} variant="top" />
        </div>
        <Card.Body>
            <div onClick={() => {navigateHandeler(`/product/${product._id}/`)}} >
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </div>
            <Card.Text as="div">
                <Ratings value={product.rating} text={`${product.numReviews} reviews`} ></Ratings>
            </Card.Text>
            <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Product

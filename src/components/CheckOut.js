import React from 'react'
import { Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router';

const CheckOut = ({step1, step2, step3, step4}) => {
    const navigate = useNavigate()
    const navigateHandeler = (val) => {
        navigate(val)
      }
  return (
    <Nav className="justify-content-center mb-4">
        <Nav.Item>
            {
                step1 ? 
                (
                <div onClick={() => {navigateHandeler('/login')}} >
                    <Nav.Link>Sign In</Nav.Link>
                </div>
                ) 
                : (
                    <Nav.Link disabled>Sign In</Nav.Link>
                )
            }
        </Nav.Item>      
        <Nav.Item>
            {
                step2 ? 
                (
                <div  onClick={() => {navigateHandeler('/shipping')}} >
                    <Nav.Link>Shipping</Nav.Link>
                </div>
                ) 
                : (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )
            }
        </Nav.Item>      
        <Nav.Item>
            {
                step3 ? 
                (
                <div onClick={() => {navigateHandeler('/payment')}} >
                    <Nav.Link>Payment</Nav.Link>
                </div>
                ) 
                : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )
            }
        </Nav.Item>      
        <Nav.Item>
            {
                step4 ? 
                (
                <div onClick={() => {navigateHandeler('/placeholder')}}>
                    <Nav.Link>Place Order</Nav.Link>
                </div>
                ) 
                : (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )
            }
        </Nav.Item>      
    </Nav>
  )
}

export default CheckOut

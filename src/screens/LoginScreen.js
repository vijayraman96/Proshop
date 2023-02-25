import React, {useState, useEffect} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    
    const {loading, error, userInfo} = userLogin
    console.log(error, loading, userInfo);
  
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    // const redirect = searchParams ? searchParams.get('redirect') : '/home';
    // console.log(redirect, [...searchParams]);
    useEffect(() => {
        if(userInfo) {
            navigate('/home')
        }
    }, [userInfo])
    console.log(userInfo)
   
    const submitHandler = (e) => {
        e.preventDefault();
        try {
            dispatch(login(email, password))
        } catch(err) {
            // navigate('/login')
            console.log(err)
        }
        
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter the email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter the password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className="my-3" type="Submit" variant="primary">Sign In</Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen;
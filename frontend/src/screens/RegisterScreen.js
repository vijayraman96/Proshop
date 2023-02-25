import React, {useState, useEffect} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader';

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    
    const {loading, error, userInfo} = userRegister;
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
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter the name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter the email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter the password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className="my-3" type="Submit" variant="primary">Register</Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Already have an account? <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen;
import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader';
import { USER_UPDATE_RESET, USER_DETAILS_RESET } from '../constants/userConstant'

const UserEditScreen = () => {
    const userId = useParams().id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const {loading: loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate;


    const navigate = useNavigate()
   
    const submitHandler = (e) => {
        console.log('vijay');
        e.preventDefault()
        dispatch(updateUser({_id: userId, name, email, IsAdmin: isAdmin}))
    };
    useEffect(() => {
        if(successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            dispatch({type: USER_DETAILS_RESET})
            navigate('/admin/userlist')
        } else {
            if(!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.IsAdmin)
            }
        }
        
    }, [user, userId, dispatch, successUpdate,])

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3"></Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter the name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter the email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="isadmin">
                        <Form.Check
                        type="checkbox"
                        label="Is Admin"
                        checked={isAdmin}
                        onChange={(e) => {console.log(e.target.checked); setIsAdmin(e.target.checked)}}>

                        </Form.Check>
                    </Form.Group>
                    <Button className="my-3" type="submit" variant="primary">Update</Button>
                </Form>
                )}
                
            </FormContainer>
        </> 
    )
}

export default UserEditScreen;
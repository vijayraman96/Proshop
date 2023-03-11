import React, { useEffect } from 'react'
import {Table, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const UserListScreen = () => {
    console.log('vijay')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const userDelete = useSelector(state => state.userDelete)
    const {success:successDelete} = userDelete
    const navigateHandeler = (val) => {
        navigate(val)
      }
    const deleteHandler = (val) => {
        if(window.confirm('Are you sure')) {
            dispatch(deleteUser(val))
        }
    }
    useEffect(()=> {
        if(userInfo && userInfo.IsAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
        
    }, [dispatch, navigate, successDelete, userInfo])
  return (
    <>
      <h1>Users</h1>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>: (
        <Table striped bordered hover responsive className="table-sm">
            <thead>
                <tr>
                    <th colSpan={3}>ID</th>
                    <th colSpan={2}>NAME</th>
                    <th colSpan={2}>EMAIL</th>
                    <th colSpan={2}>ADMIN</th>
                    <th colSpan={3}></th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => (
                        <tr key={user._id}>
                            <td colSpan={3}>{user._id}</td>
                            <td colSpan={2}>{user.name}</td>
                            <td colSpan={2}><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td colSpan={2}>{user.IsAdmin ? (<i className="fas fa-check" style={{'color': 'green'}}></i>): (
                                <i className="fas fa-close" style={{'color': 'red'}}></i>
                            )}</td>
                            <td colSpan={3} style={{display: 'flex'}}>
                                <div onClick={() => {navigateHandeler(`/admin/user/${user._id}/edit`)}}>
                                    <Button variant="light" className="btn-sm">
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </div>
                                <Button variant="danger" className="btn-sm" onClick={() => {deleteHandler(user._id)}}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen

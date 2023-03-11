import React, { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Container, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { logout } from "../actions/userActions";
import { useNavigate } from 'react-router';
import Searchbox from "./Searchbox";
import { Route, Routes } from "react-router";
import { useParams } from "react-router";

const Header = () => {
  const [keyValue, setKeyValue] = useState('')
  const id = useParams()
  // console.log('header id', id)
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;
  let navigate = useNavigate();
  // console.log(userInfo)
  const logoutHandler = () => {
    dispatch(logout())
    console.log('logout')
  }
  // console.log(keyValue)
  const getKeyword = (val) => {
    setKeyValue(val)
  }
  const navigateHandeler = (val) => {
    navigate(val)
  }
  // console.log("user info header", userInfo)
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <div onClick={() => {navigateHandeler('/')}} >
            <Navbar.Brand >proshop</Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <Searchbox history={id} />
            <Nav className="me-left">
            <div onClick={() => {navigateHandeler('/cart')}}>
                <Nav.Link > <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              </div>
              {/* {userInfo ? (<NavDropdown  title={name} id="username"> 
                <div to="/profile">
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </div>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>) : (<div to="/login">
                <Nav.Link > <i className="fas fa-user"></i> Sign In</Nav.Link>
              </div>)} */}
              {userInfo === null || userInfo === '' || userInfo === undefined ? (
                <div onClick={() => {navigateHandeler('/login')}}>
                <Nav.Link > <i className="fas fa-user"></i> Sign In</Nav.Link>
              </div>
              ) : (
                <NavDropdown  title={userInfo === null || userInfo === '' || userInfo === undefined ? "Create Account" : userInfo.name} id="username"> 
                <div to="/profile">
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </div>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
              )}
              {userInfo && userInfo.IsAdmin && (
                <NavDropdown  title="Admin" id="adminmenu"> 
                <div onClick={() => {navigateHandeler('/admin/userlist')}} >
                  <NavDropdown.Item>
                    Users
                  </NavDropdown.Item>
                </div>
                <div onClick={() => {navigateHandeler('/admin/productlist')}}>
                  <NavDropdown.Item>
                    Products
                  </NavDropdown.Item>
                </div>
                <div onClick={() => {navigateHandeler('/admin/orderList')}} >
                  <NavDropdown.Item>
                    Orders
                  </NavDropdown.Item>
                </div>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

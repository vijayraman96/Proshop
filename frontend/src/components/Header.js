import React, { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Container, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;
  console.log(userInfo)
  const logoutHandler = () => {
    dispatch(logout())
    console.log('logout')
  }
  console.log("user info header", userInfo)
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="">
            <Navbar.Brand >proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <Nav className="me-left">
            <LinkContainer to="/cart">
                <Nav.Link > <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              </LinkContainer>
              {/* {userInfo ? (<NavDropdown  title={name} id="username"> 
                <LinkContainer to="/profile">
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>) : (<LinkContainer to="/login">
                <Nav.Link > <i className="fas fa-user"></i> Sign In</Nav.Link>
              </LinkContainer>)} */}
              {userInfo === null || userInfo === '' || userInfo === undefined ? (
                <LinkContainer to="/login">
                <Nav.Link > <i className="fas fa-user"></i> Sign In</Nav.Link>
              </LinkContainer>
              ) : (
                <NavDropdown  title={userInfo === null || userInfo === '' || userInfo === undefined ? "Create Account" : userInfo.name} id="username"> 
                <LinkContainer to="/profile">
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
              )}
              {userInfo && userInfo.IsAdmin && (
                <NavDropdown  title="Admin" id="adminmenu"> 
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>
                    Users
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="admin/productlist">
                  <NavDropdown.Item>
                    Products
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="admin/orderList">
                  <NavDropdown.Item>
                    Orders
                  </NavDropdown.Item>
                </LinkContainer>
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

import React from 'react';
import { render } from "react-dom";
import {Container} from 'react-bootstrap';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import CartScreen from './screens/CartScreen';
import ProductScreen from "./screens/ProductScreen";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./index";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen/>} exact/>
            <Route path="/order/:id" element={<OrderScreen/>}/>
            <Route path="/shipping" element={<ShippingScreen/>} />
            <Route path="/placeorder" element={<PlaceOrderScreen/>} />
            <Route path="/payment" element={<PaymentScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path="/profile" element={<ProfileScreen/>} />
            <Route path="/admin/userlist" element={<UserListScreen/>} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen/>} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

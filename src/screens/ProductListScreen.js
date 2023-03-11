import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { useNavigate } from "react-router-dom";
import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
} from "../constants/productConstants";
import Paginate from "../components/Paginate";
// import dele
const ProductListScreen = () => {
  console.log("vijay");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
const keyword = useParams()

  const urlPath = location.pathname
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const productDelete = useSelector((state) => state.productDelete);
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;
  const { userInfo } = userLogin;
  const navigateHandeler = (val) => {
    navigate(val);
  };
  console.log(loadingDelete, "del", loadingCreate, "cre");
  const deleteHandler = (id) => {
    console.log(loadingDelete);
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandeler = () => {
    dispatch(createProduct());
  };
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.IsAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(urlPath));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    productDelete,
    urlPath,
    keyword
  ]);
  return (
    <>
      <Row className="align-items-center">
        <Col md={9}>
          <h1>Products</h1>
        </Col>
        <Col md={3} className="text-right">
          <Button className="my-3" onClick={createProductHandeler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th md={3}>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td md={3}>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Row>
                      <Col>
                        <div
                          onClick={() => {
                            navigateHandeler(
                              `/admin/product/${product._id}/edit`
                            );
                          }}
                        >
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </div>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => {
                            deleteHandler(product._id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} keyword={keyword} isAdmin={true}/>
        </>
      )}
    </>
  );
};

export default ProductListScreen;

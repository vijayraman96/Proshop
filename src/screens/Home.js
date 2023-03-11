import React, {useState, useEffect} from 'react';
import Product from '../components/Product'
import products from '../products'
import {Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useSearchParams, useParams, useLocation, Link } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const Home = () => {
  const [keyPath, setKeyPath] = useState('')
  const [paginPath, setPaginPath] = useState('')
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList
  const keyword = useParams()
  const location = useLocation();
  const urlPath = location.pathname

  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(listProducts(urlPath))
    
  }, [keyword, dispatch])
  // console.log('url', urlPath)
  return (
    <div>
      <Meta />
      {console.log('url', urlPath)}
        { (urlPath === '' || urlPath == '/home')  ?  <ProductCarousel /> : <Link to="/home" className="btn btn-light">Bo Back</Link>}
        <h3>Latest Products</h3>
        {
          loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) : (
            <>
              <Row>
                  {products.map((product) => (
                      <Col sm={12} md={6} lg={4} xl={3}>
                          <Product product={product} ></Product>
                      </Col>
                  ))}
              </Row>
              <Paginate pages={pages} page={page} keyword={ keyword ? keyword : ''}></Paginate>
            </>
            
          )
        }
     
    </div>
  )
}

export default Home

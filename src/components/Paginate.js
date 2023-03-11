import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Paginate = ({pages, page, isAdmin=false, keyword}) => {
    const navigate = useNavigate()
    // console.log('keyword', keyword)
  return pages > 1 && (
    <>
        <Pagination>
            {[...Array(pages).keys()].map(x=> (
                <>
                    <Pagination.Item href={!isAdmin ? (Object.keys(keyword.length === 0)  ? `/page/${x + 1}`: (`/search/${keyword.keyword}/page/${x + 1}`)): `/admin/productlist/${x + 1}`} active={x + 1 === page}>{x + 1} </Pagination.Item>
                </>
            
            ))}
        </Pagination>
        
    </>
    
  )
}

export default Paginate

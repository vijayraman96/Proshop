import { useState } from "react";
import React from "react";
import { Form, Button } from "react-bootstrap";
import {Link, useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Searchbox = (id) => {
    // console.log('id', id)
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()
  const submitHandeler = (e) => {
    e.preventDefault()
    if(keyword.trim()) {
        navigate(`/search/${keyword}`)
    } else {
        navigate('/home')
    }
  }
  return (
    <Form onSubmit={submitHandeler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="search products ..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default Searchbox;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector, connect } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { addTypes } from "../actions/productTypesActions";

const ProductTypesScreen = ({ location, history }) => {
  const [name, setName] = useState("");

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const typesRegister = useSelector((state) => state.typesCreate);

  const { loading, error, typesInfo } = typesRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log(name);
  useEffect(() => {
    if (typesInfo) {
      history.push(redirect);
    }
  }, [history, typesInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Name cannot be blank");
    } else {
      dispatch(addTypes(name));
    }
  };

  return (
    <FormContainer>
      <h4>Product Types</h4>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Add
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProductTypesScreen;

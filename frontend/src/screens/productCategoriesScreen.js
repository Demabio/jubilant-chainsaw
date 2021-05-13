import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector, connect } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { addCats } from "../actions/productCategoryActions";

const ProductCategoriesScreen = ({ location, history }) => {
  const [name, setName] = useState("");

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const catsRegister = useSelector((state) => state.CatCreate);

  const { loading, error, catsInfo } = catsRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log(name);
  useEffect(() => {
    if (catsInfo) {
      history.push(redirect);
    }
  }, [history, catsInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Name cannot be blank");
    } else {
      dispatch(addCats(name));
    }
  };

  return (
    <FormContainer>
      <h1>Product Categories</h1>
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

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ProductCategoriesScreen;

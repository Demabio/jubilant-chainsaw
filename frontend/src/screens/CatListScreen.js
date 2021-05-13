import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listCats,
  deleteCat,
  addCats,
} from "../actions/productCategoryActions";
import { CAT_CREATE_RESET } from "../constants/productConstants";

const CatListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const catList = useSelector((state) => state.catList);
  const { loading, error, cats, page, pages } = catList;

  const CatDelete = useSelector((state) => state.CatDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = CatDelete;

  const catsRegister = useSelector((state) => state.CatCreate);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    cat: catsInfo,
  } = catsRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: CAT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/addCat/${catsRegister._id}/edit`);
    } else {
      dispatch(listCats("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    addCats,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteCat(id));
    }
  };

  const createCatHandler = () => {
    dispatch(addCats());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h6>Categories</h6>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createCatHandler}>
            <i className="fas fa-plus"></i> Create Category
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
                <th>Id</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cats.map((paka) => (
                <tr key={paka._id}>
                  <td>{paka._id}</td>
                  <td>{paka.name}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${paka._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(paka._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default CatListScreen;

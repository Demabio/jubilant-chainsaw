import axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  CATS_REGISTER_SUCCESS,
  CATS_REGISTER_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  CATS_REGISTER_REQUEST,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  CAT_DELETE_REQUEST,
  CAT_DELETE_SUCCESS,
  CAT_DETAILS_SUCCESS,
  CAT_UPDATE_FAIL,
  CAT_LIST_REQUEST,
  CAT_LIST_SUCCESS,
  CAT_LIST_FAIL,
  CAT_UPDATE_REQUEST,
  CAT_UPDATE_SUCCESS,
  CAT_DELETE_FAIL,
} from "../constants/productConstants";
import { logout } from "./userActions";
//Add Cat
export const addTypes = (name) => async (dispatch) => {
  try {
    dispatch({
      type: CATS_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/products/addTypes",
      { name },
      config
    );

    dispatch({
      type: CATS_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("typesInfo ", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CATS_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update Cat
export const updateTypes = (cat) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/updateTypes/${cat._id}`,
      cat,
      config
    );

    dispatch({
      type: CAT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: CAT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CAT_UPDATE_FAIL,
      payload: message,
    });
  }
};
//delete cat
export const deleteTypes = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/deleteTypes/${id}`, config);

    dispatch({
      type: CAT_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CAT_DELETE_FAIL,
      payload: message,
    });
  }
};
//list Cats
export const listTypes =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: CAT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/products/getTypes?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: CAT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CAT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

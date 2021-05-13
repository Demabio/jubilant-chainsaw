import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  CAT_LIST_REQUEST,
  CAT_LIST_SUCCESS,
  CAT_LIST_FAIL,
  CAT_DELETE_REQUEST,
  CAT_DELETE_SUCCESS,
  CAT_DELETE_FAIL,
} from "../constants/productConstants";
import {
  CATS_REGISTER_REQUEST,
  CATS_REGISTER_SUCCESS,
  CATS_REGISTER_FAIL,
  CATS_REGISTER_RESET,
} from "../constants/userConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//categories
export const catCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATS_REGISTER_REQUEST:
      return { loading: true };
    case CATS_REGISTER_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case CATS_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case CATS_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};
//Cats List
export const catListReducer = (state = { cats: [] }, action) => {
  switch (action.type) {
    case CAT_LIST_REQUEST:
      return { loading: true, cats: [] };
    case CAT_LIST_SUCCESS:
      return {
        loading: false,
        cats: action.payload.cats,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case CAT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//cat delete
export const catDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CAT_DELETE_REQUEST:
      return { loading: true };
    case CAT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CAT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Types create
export const TypesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATS_REGISTER_REQUEST:
      return { loading: true };
    case CATS_REGISTER_SUCCESS:
      return { loading: false, success: true, types: action.payload };
    case CATS_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case CATS_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};
//Types List
export const TypesListReducer = (state = { types: [] }, action) => {
  switch (action.type) {
    case CAT_LIST_REQUEST:
      return { loading: true, types: [] };
    case CAT_LIST_SUCCESS:
      return {
        loading: false,
        types: action.payload.types,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case CAT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//Yypes delete
export const TypesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CAT_DELETE_REQUEST:
      return { loading: true };
    case CAT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CAT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

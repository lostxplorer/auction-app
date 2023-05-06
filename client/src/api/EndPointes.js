const REACT_APP_API_URL = "http://localhost:8000/api";

const appApi = (path) => `${REACT_APP_API_URL}/${path}`;

// API call routes
export const endpoints = () => ({
  // User API Routes
  userAPI: appApi("v1/users"),
  userLogin: appApi("v1/login"),
  productAPI: appApi("v1/products"),
  walletAPI: appApi("v1/users"),
  bidAPI: appApi("v2/userProductBidding"),
  userForgotPasswordAPI: appApi("v1/users/forgot-password"),
  resetPasswordAPI: appApi("v1/users/reset-password"),
  userComplaintAPI: appApi("v1/users/random/complaints"),
});

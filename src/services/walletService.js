import axiosConfig from "../utils/axios";

const handleResponse = (error) => {
  console.log(error);
  if (
    error.response &&
    (error.response.status === 500 ||
      error.response.status === 400 ||
      error.response.status === 401 ||
      error.response.status === 422)
  ) {
    return error.response && error.response.data;
  }
  return error.response && error.response.data;
};

export const fetchWalletService = (data) =>
  axiosConfig
    .get(`/wallet/list`, data)
    .then((response) => response.data)
    .catch(handleResponse);
export const createWalletService = (data) =>
  axiosConfig
    .post(`/xrecon/wallet/verify`, data)
    .then((response) => response.data)
    .catch(handleResponse);

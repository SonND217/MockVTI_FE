import axios from "axios";

const apiEndpoint = "https://dummyjson.com/products";

const ProductService = {
  getProducts() {
    return axios.get(apiEndpoint);
  },
  getProductsByID(id) {
    return axios.get(`${apiEndpoint}/${id}`);
  },
  addProduct(product) {
    return axios.post(`${apiEndpoint}/add`, product);
  },
  updateProduct(id, product) {
    return axios.put(`${apiEndpoint}/${id}`, product);
  },
  deleteProduct(id) {
    return axios.delete(`${apiEndpoint}/${id}`);
  },
};

export default ProductService;

// import axios from "axios";

// const apiBaseUrl = "http://localhost:8088/api/v1";

// class ProductService {
//   getProducts(keyword, categoryId, page, limit) {
//     const params = {
//       keyword: keyword,
//       category_id: categoryId.toString(),
//       page: page.toString(),
//       limit: limit.toString(),
//     };
//     return axios
//       .get(`${apiBaseUrl}/products`, { params })
//       .then((response) => response.data)
//       .catch((error) => {
//         throw error;
//       });
//   }

//   getDetailProduct(productId) {
//     return axios
//       .get(`${apiBaseUrl}/products/${productId}`)
//       .then((response) => response.data)
//       .catch((error) => {
//         throw error;
//       });
//   }

//   getProductsByIds(productIds) {
//     const params = { ids: productIds.join(",") };
//     return axios
//       .get(`${apiBaseUrl}/products/by-ids`, { params })
//       .then((response) => response.data)
//       .catch((error) => {
//         throw error;
//       });
//   }

//   deleteProduct(productId) {
//     return axios
//       .delete(`${apiBaseUrl}/products/${productId}`)
//       .then((response) => response.data)
//       .catch((error) => {
//         throw error;
//       });
//   }

//   updateProduct(productId, updatedProduct) {
//     return axios
//       .put(`${apiBaseUrl}/products/${productId}`, updatedProduct)
//       .then((response) => response.data)
//       .catch((error) => {
//         throw error;
//       });
//   }

//   insertProduct(insertProductDTO) {
//     return axios
//       .post(`${apiBaseUrl}/products`, insertProductDTO)
//       .then((response) => response.data)
//       .catch((error) => {
//         throw error;
//       });
//   }

//   uploadImages(productId, files) {
//     const formData = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       formData.append("files", files[i]);
//     }
//     return axios
//       .post(`${apiBaseUrl}/products/uploads/${productId}`, formData)
//       .then((response) => response.data)
//       .catch((error) => {
//         throw error;
//       });
//   }

//   deleteProductImage(id) {
//     return axios
//       .delete(`${apiBaseUrl}/product_images/${id}`)
//       .then((response) => response.data)
//       .catch((error) => {
//         throw error;
//       });
//   }
// }

// export default new ProductService();

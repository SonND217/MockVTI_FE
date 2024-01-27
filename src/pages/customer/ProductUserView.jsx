// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Row, Col, Card, Tag, Button, Space } from "antd";
// import { toast } from "react-toastify";
// import ProductService from "../../services/productService";
// import "../../style/DetailUsers.css";
// import { useSelector, useDispatch } from "react-redux";
// import { setProducts } from "../../redux/actions/productActions";

// const ProductCard = ({ product, onAddToCart, onViewDetails }) => (
//   <Card
//     hoverable
//     cover={
//       <img
//         alt={product.title}
//         src={product.thumbnail}
//         className="product-image"
//       />
//     }
//     actions={[
//       <Space>
//         <Button type="primary" onClick={() => onAddToCart(product)}>
//           Thêm vào giỏ hàng
//         </Button>
//         <Button onClick={() => onViewDetails(product.id)}>Xem chi tiết</Button>
//       </Space>,
//     ]}
//   >
//     <Tag color="red">{product.discountPercentage}% OFF</Tag>
//     <Card.Meta title={product.title} description={`$${product.price}`} />
//   </Card>
// );

// const ProductsGrid = ({ products, onAddToCart, onViewDetails }) => (
//   <Row gutter={16}>
//     {products.map((product) => (
//       <Col span={6} key={product.id} className="product-tab-wrapper">
//         <ProductCard
//           product={product}
//           onAddToCart={onAddToCart}
//           onViewDetails={onViewDetails}
//         />
//       </Col>
//     ))}
//   </Row>
// );

// const ProductUserView = () => {
//   // Không sử dụng redux-thunk
//   // const [products, setProducts] = useState([]);
//   // Sử dụng redux-thunk
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.products);
//   const navigate = useNavigate();
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filterToggle, setFilterToggle] = useState(false);
//   const handleFilterProducts = () => {
//     if (!filterToggle) {
//       const filtered = products.filter((product) => product.price > 1000);
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts(products);
//     }
//     setFilterToggle(!filterToggle);
//   };

//   const handleAddToCart = (product) => {
//     navigate("/cart");
//   };

//   const onViewDetails = (productId) => {
//     navigate(`/ProductUserView/${productId}`);
//   };

//   // Sử dụng redux-thunk
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const response = await ProductService.getProducts();
//         dispatch(setProducts(response.data.products));
//       } catch (error) {
//         toast.error(error.response?.data.message || "An error occurred");
//       }
//     };

//     loadProducts();
//   }, [dispatch]);

//   //Không sử dụng redux-thunk
//   // useEffect(() => {
//   //   const loadProducts = async () => {
//   //     try {
//   //       const response = await ProductService.getProducts();
//   //       setProducts(response.data.products); // Giả sử cấu trúc phản hồi như này
//   //     } catch (error) {
//   //       toast.error(error.response?.data.message || "An error occurred");
//   //     }
//   //   };

//   //   loadProducts();
//   // }, [navigate]); // Thêm navigate vào danh sách dependencies của useEffect

//   return (
//     <>
//       <Button
//         type="primary"
//         onClick={handleFilterProducts}
//         className="button_filter_product_high_than_1000"
//       >
//         {filterToggle ? "Hiển thị Tất Cả Sản Phẩm" : "Hiển thị Sản Phẩm > 1000"}
//       </Button>
//       <ProductsGrid
//         products={filteredProducts.length > 0 ? filteredProducts : products}
//         onAddToCart={handleAddToCart}
//         onViewDetails={onViewDetails}
//       />
//     </>
//   );
// };

// export default ProductUserView;

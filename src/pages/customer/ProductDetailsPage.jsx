// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Spin, Descriptions, Image, Button } from "antd";
// import ProductService from "../../services/productService";
// const ProductDetailsPage = () => {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await ProductService.getProductsByID(id);
//         setProduct(response.data);
//       } catch (error) {
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [id]);

//   if (loading) return <Spin size="large" />;

//   return (
//     product && (
//       <Descriptions title="Thông Tin Sản Phẩm" layout="vertical" bordered>
//         <Descriptions.Item label="Hình ảnh">
//           <Image width={300} src={product.thumbnail} />
//         </Descriptions.Item>
//         <Descriptions.Item label="Tên">{product.title}</Descriptions.Item>
//         <Descriptions.Item label="Giá">{`$${product.price}`}</Descriptions.Item>
//         <Descriptions.Item label="Mô tả">
//           {product.description}
//         </Descriptions.Item>

//         <Button color="blue" type="primary">
//           Thêm vào giỏ hàng
//         </Button>
//       </Descriptions>
//     )
//   );
// };

// export default ProductDetailsPage;

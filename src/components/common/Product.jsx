import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faSyncAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";

function Product() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImagesFromApi = async (products) => {
    const imagePromises = products.map(async (product) => {
      try {
        const response = await fetch(
          `http://localhost:8088/api/v1/products/images/${product.thumbnail}`
        );
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
      } catch (error) {
        console.error(`Error fetching image for ${product.thumbnail}:`, error);
        return "default-image-url";
      }
    });

    try {
      const imageUrls = await Promise.all(imagePromises);
      setProductImages((prevImages) => [...prevImages, ...imageUrls]);
      return imageUrls;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  const fetchData = async (nextPage) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8088/api/v1/products?page=${nextPage}&limit=${itemsPerPage}`
      );
      const newData = await response.json();
      if (newData.products.length > 0) {
        setCurrentPage(nextPage);
        setProducts((prevProducts) => {
          const uniqueProducts = newData.products.filter(
            (newProduct) =>
              !prevProducts.some(
                (existingProduct) => newProduct.id === existingProduct.id
              )
          );
          return [...prevProducts, ...uniqueProducts];
        });
        await fetchImagesFromApi(newData.products);
      } else {
        console.log("No more products to load");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, itemsPerPage]);

  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = currentCart.find(
      (item) => item.product_id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ product_id: product.id, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(currentCart));
  };

  const loadMoreProducts = () => {
    setLoading(true);
    setTimeout(() => {
      fetchData(currentPage + 1);
    }, 3000);
  };

  return (
    <div>
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Mặt hàng có sẵn</span>
        </h2>
        <div className="row px-xl-5">
          {products.map((product, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={product.id}>
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src={productImages[index]}
                    alt={product.name}
                  />
                  <div className="product-action">
                    <button
                      className="btn btn-outline-dark btn-square"
                      onClick={() => addToCart(product)}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                    <button className="btn btn-outline-dark btn-square">
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className="btn btn-outline-dark btn-square">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col text-center">
            <button
              className="btn btn-primary"
              onClick={loadMoreProducts}
              disabled={loading}
            >
              {loading ? <Spin /> : "Hiển thị thêm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;

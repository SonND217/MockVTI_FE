import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import {
  faShoppingCart,
  faHeart,
  faSyncAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "jquery";
import { json } from "react-router-dom";

function Product() {
  // State for products
  const [products, setProducts] = useState([]);

  // State for cart items
  const [cartItems, setCartItems] = useState([]);

  // State for current page and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // State for storing images locally
  const [productImages, setProductImages] = useState([]);

  const [loading, setLoading] = useState(false);

  // Function to fetch images from API
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
      // Use the callback function to ensure the state is updated correctly
      setProductImages((prevImages) => [...prevImages, ...imageUrls]);
      return imageUrls;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  // Function to fetch data (products and images)
  const fetchData = async (nextPage) => {
    try {
      const response = await fetch(
        `http://localhost:8088/api/v1/products?page=${nextPage}&limit=${itemsPerPage}`
      );
      const newData = await response.json();
      if (newData.products.length > 0) {
        setCurrentPage(nextPage);
        setProducts((prevProducts) => {
          // Filter out duplicates based on product id
          const uniqueProducts = newData.products.filter(
            (newProduct) =>
              !prevProducts.some(
                (existingProduct) => newProduct.id === existingProduct.id
              )
          );
          return [...prevProducts, ...uniqueProducts];
        });

        // Fetch and update images for new products
        const imageUrls = await fetchImagesFromApi(newData.products);
        setProductImages((prevImages) => [...prevImages, ...imageUrls]);
      } else {
        // No more products to load
        console.log("No more products to load");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Update UI to display an error message
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch cart items and images
  const fetchCartItemsAndImages = async () => {
    try {
      // Fetch images
      const imageUrls = await fetchImagesFromApi(products);
      setProductImages(imageUrls);

      // Fetch cart data
      const cartResponse = await fetch(
        `http://localhost:3000/cart?_page=${currentPage}&_limit=${itemsPerPage}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const cartData = await cartResponse.json();

      // Map cart items with product details
      const cartItemsWithDetails = cartData.map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId);
        return {
          ...cartItem,
          name: product?.name,
          price: product?.price,
          description: product?.description,
          total: product?.price * cartItem.quantity,
        };
      });

      setCartItems(cartItemsWithDetails);
    } catch (error) {
      console.error("Error fetching cart items and images:", error);
    }
  };

  // UseEffect to fetch products
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, itemsPerPage]);

  // UseEffect to fetch images and cart data
  useEffect(() => {
    if (products.length > 0) {
      fetchCartItemsAndImages();
    }
  }, [products, currentPage, itemsPerPage]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const userId = null;
    const sessionToken = "session_xyz123";

    fetch("http://localhost:3000/cart")
      .then((response) => response.json())
      .then((cartItems) => {
        const existingItem = cartItems.find(
          (item) => item.productId === product.id
        );

        if (existingItem) {
          // Update existing item quantity
          fetch(`http://localhost:3000/cart/${existingItem.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...existingItem,
              quantity: existingItem.quantity + 1,
            }),
          });
        } else {
          // Add new item to the cart
          fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId: product.id,
              quantity: 1,
              userId,
              sessionToken,
            }),
          });
        }
      });
  };

  // Function to load more products
  const loadMoreProducts = () => {
    setLoading(true);
    setTimeout(() => {
      fetchData(currentPage + 1);
    }, 3000);
  };

  // ...

  // UseEffect to fetch products
  useEffect(() => {
    const fetchData = async (nextPage) => {
      try {
        const response = await fetch(
          `http://localhost:8088/api/v1/products?page=${nextPage}&limit=${itemsPerPage}`
        );
        const newData = await response.json();

        if (newData.products.length > 0) {
          setCurrentPage(nextPage);
          setProducts((prevProducts) => {
            // Filter out duplicates based on product id
            const uniqueProducts = newData.products.filter(
              (newProduct) =>
                !prevProducts.some(
                  (existingProduct) => newProduct.id === existingProduct.id
                )
            );
            return [...prevProducts, ...uniqueProducts];
          });

          // Fetch and update images for new products
          const imageUrls = await fetchImagesFromApi(newData.products);
          setProductImages((prevImages) => [...prevImages, ...imageUrls]);

          // Log the new products to the console
          console.log("New Products:", newData.products);
        } else {
          // No more products to load
          console.log("No more products to load");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Update UI to display an error message
      } finally {
        setLoading(false);
      }
    };

    fetchData(currentPage);
  }, [currentPage, itemsPerPage]);

  // ...

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
                    <button className="btn btn-outline-dark btn-square" href="">
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className="btn btn-outline-dark btn-square" href="">
                      <FontAwesomeIcon icon={faSyncAlt} />
                    </button>
                    <button className="btn btn-outline-dark btn-square" href="">
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

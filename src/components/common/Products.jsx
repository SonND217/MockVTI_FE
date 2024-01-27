import React, { useState, useEffect } from "react";
// Import hình ảnh từ tệp tin cục bộ
import product1 from "../../assets/img/product-1.jpg";
import product2 from "../../assets/img/product-2.jpg";

// FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faSyncAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function Product() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // Lấy dữ liệu sản phẩm
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((productData) => {
        setProducts(productData);

        // Lấy dữ liệu giỏ hàng
        return fetch(
          `http://localhost:3000/cart?_page=${currentPage}&_limit=${itemsPerPage}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      })
      .then((response) => response.json())
      .then((cartData) => {
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
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage, itemsPerPage, products, cartItems]);

  // const addToCart = (product) => {
  //   // Xác định userId hoặc sessionToken dựa trên logic xác thực
  //   const userId = null; // Hoặc giá trị tương ứng nếu người dùng đã đăng nhập
  //   const sessionToken = "session_xyz123"; // Hoặc giá trị tương ứng từ session

  //   fetch("http://localhost:3000/cart")
  //     .then((response) => response.json())
  //     .then((cartItems) => {
  //       const existingItem = cartItems.find(
  //         (item) => item.productId === product.id
  //       );

  //       if (existingItem) {
  //         fetch(`http://localhost:3000/cart/${existingItem.id}`, {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             ...existingItem,
  //             quantity: existingItem.quantity + 1,
  //           }),
  //         }).then();
  //       } else {
  //         fetch("http://localhost:3000/cart", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             productId: product.id,
  //             quantity: 1,
  //             userId, // Thêm userId
  //             sessionToken, // Thêm sessionToken
  //           }),
  //         }).then();
  //       }
  //     });
  // };

  const addToCart = debounce((product) => {
    // Xác định userId hoặc sessionToken dựa trên logic xác thực
    const userId = null; // Hoặc giá trị tương ứng nếu người dùng đã đăng nhập
    const sessionToken = "session_xyz123"; // Hoặc giá trị tương ứng từ session

    fetch("http://localhost:3000/cart")
      .then((response) => response.json())
      .then((cartItems) => {
        const existingItem = cartItems.find(
          (item) => item.productId === product.id
        );

        if (existingItem) {
          fetch(`http://localhost:3000/cart/${existingItem.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...existingItem,
              quantity: existingItem.quantity + 1,
            }),
          }).then();
        } else {
          fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId: product.id,
              quantity: 1,
              userId, // Thêm userId
              sessionToken, // Thêm sessionToken
            }),
          }).then();
        }
      });
  }, 300);

  // Debounce function
  function debounce(func, delay) {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  return (
    <div>
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Recent Products</span>
        </h2>
        <div className="row px-xl-5">
          {products.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={product.id}>
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src={product1}
                    alt={product.name}
                  />
                  <div className="product-action">
                    <button
                      className="btn btn-outline-dark btn-square"
                      onClick={() => addToCart(product)}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <FontAwesomeIcon icon={faHeart} />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <FontAwesomeIcon icon={faSyncAlt} />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <FontAwesomeIcon icon={faSearch} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;

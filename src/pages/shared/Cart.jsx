import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Topbar from "../../components/common/Topbar";
import Breadcrumb from "../../components/common/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import imagePlaceholder from "../../assets/img/cat-1.jpg";
import HomeShop from "../Dashboard/HomeLayout";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:3000/cart?_page=${currentPage}&_limit=${itemsPerPage}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((cartData) => {
        const cartItemsWithDetails = cartData.map((cartItem) => {
          const product = products.find((p) => p.id === cartItem.productId);
          return {
            ...cartItem,
            name: product?.name,
            price: product?.price,
            description: product?.description,
          };
        });
        setCartItems(cartItemsWithDetails);
      })
      .catch((error) => console.error("Error fetching cart:", error));
  }, [currentPage, products]);

  console.log(cartItems);

  // const updateQuantity = (productId, newQuantity) => {
  //   // Cập nhật số lượng sản phẩm trên server
  //   fetch(`http://localhost:3000/cart/${productId}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       quantity: newQuantity,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((updatedItem) => {
  //       // Nếu cập nhật trên server thành công, thì cập nhật lại giỏ hàng ở client
  //       const updatedCartItems = cartItems.map((item) => {
  //         if (item.id === productId) {
  //           // Cập nhật số lượng sản phẩm
  //           item.quantity = newQuantity;
  //           // Cập nhật giá tiền cho sản phẩm (Assuming there's a price property)
  //           item.total = item.price * newQuantity;
  //         }
  //         return item;
  //       });

  //       // Cập nhật state với mảng cartItems mới
  //       setCartItems(updatedCartItems);
  //     });
  // };

  const updateQuantity = (productId, newQuantity) => {
    fetch(`http://localhost:3000/cart/${productId}`, {
      method: "PATCH", // Sử dụng PATCH thay vì PUT
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...cartItem,
        name: product?.name,
        price: product?.price,
        description: product?.description,
        quantity: newQuantity,
      }),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === updatedItem.id) {
            return { ...item, quantity: updatedItem.quantity };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      });
  };

  const removeProduct = (productId) => {
    // Xóa sản phẩm khỏi giỏ hàng trên server
    fetch(`http://localhost:3000/cart/${productId}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          // Nếu xóa thành công trên server, thì cập nhật giỏ hàng ở client
          setCartItems(cartItems.filter((item) => item.id !== productId));
        }
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      {/* <HomeShop> */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <p>Tổng số sản phẩm: {cartItems.length}</p>
          </div>
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="align-middle">
                      <img
                        src={imagePlaceholder}
                        alt=""
                        style={{ width: "50px" }}
                      />
                      {item.name}
                    </td>
                    <td className="align-middle">${item.price}</td>
                    <td className="align-middle">
                      <div
                        className="input-group quantity mx-auto"
                        style={{ width: "100px" }}
                      >
                        <div className="input-group-btn">
                          <button
                            className="btn btn-sm btn-primary btn-minus"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm bg-secondary border-0 text-center"
                          value={item.quantity}
                          readOnly
                        />
                        <div className="input-group-btn">
                          <button
                            className="btn btn-sm btn-primary btn-plus"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      ${item.price * item.quantity}
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeProduct(item.id)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <div className="bg-light p-30 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Subtotal</h6>
                  <h6>${calculateTotal()}</h6>
                </div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>${calculateTotal()}</h5>
                </div>
                <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </HomeShop> */}
    </div>
  );
}

export default Cart;

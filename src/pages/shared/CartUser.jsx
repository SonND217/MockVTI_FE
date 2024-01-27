import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function CartUser() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    fetchProductDetails(storedCartItems);
  }, []);

  const fetchProductDetails = async (items) => {
    const productDetails = await Promise.all(
      items.map(async (item) => {
        try {
          const response = await fetch(
            `http://localhost:8088/api/v1/products/${item.product_id}`
          );
          const productData = await response.json();
          return {
            ...productData,
            quantity: item.quantity,
          };
        } catch (error) {
          console.error(
            `Error fetching details for product ${item.product_id}:`,
            error
          );
          return null;
        }
      })
    );
    setCartItems(productDetails.filter((item) => item !== null));
  };

  const navigateToCheckout = () => {
    navigate("/user/checkout");
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        updatedCartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        }))
      )
    );
  };

  const removeProduct = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        updatedCartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        }))
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    history.push("/user/checkout"); // Điều hướng đến trang Checkout
  };

  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <div className="table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Sản Phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng Tiền</th>
                  <th>Xoá</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="align-middle">
                      <img
                        src={`http://localhost:8088/api/v1/products/images/${item.thumbnail}`}
                        alt={item.name}
                        className="img-thumbnail" // Sử dụng class CSS
                      />
                    </td>
                    <td>
                      <div className="align-middle-name"> {item.name}</div>
                    </td>

                    <td className="align-middle">${item.price.toFixed(2)}</td>
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
                      ${(item.price * item.quantity).toFixed(2)}
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
        </div>
        <div className="col-lg-4">
          <div className="border-bottom pb-2">
            <div className="d-flex justify-content-between mb-3">
              <h6>Subtotal</h6>
              <h6>${calculateTotal().toFixed(2)}</h6>
            </div>
          </div>
          <div className="pt-2">
            <div className="d-flex justify-content-between mt-2">
              <h5>Total</h5>
              <h5>${calculateTotal().toFixed(2)}</h5>
            </div>
            <button
              className="btn btn-block btn-primary font-weight-bold my-3 py-3"
              onClick={navigateToCheckout}
            >
              Hoàn tất thông tin đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartUser;

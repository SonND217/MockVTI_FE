import React, { useState, useEffect } from "react";
import axios from "axios";
import instance from "../../services/axiosClient";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Checkout() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(userInfo ? userInfo.username : "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Giao Hàng Nhanh");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cartItems, setCartItems] = useState(storedCartItems);

  useEffect(() => {
    // Lấy thông tin giỏ hàng từ localStorage và cập nhật trạng thái
    setCartItems(storedCartItems);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = {
      user_id: userInfo ? userInfo.id : null,
      fullname: fullName,
      email: email,
      phone_number: phone,
      address: address,
      note: note,
      total_money: calculateTotal(),
      shipping_method: shippingMethod,
      payment_method: paymentMethod,
      cart_items: cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await instance.post(
        "http://localhost:8088/api/v1/orders",
        orderData
      );
      message.success("Order placed successfully");
      localStorage.removeItem("cartItems");
      setTimeout(() => navigate("/user/home"), 1000); // Chuyển hướng sau 3 giây
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
      message.error("Failed to place the order");
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            className="form-control"
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            className="form-control"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Note</label>
          <textarea
            className="form-control"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Shipping Method</label>
          <select
            className="form-control"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          >
            <option value="Giao Hàng Nhanh">Giao Hàng Nhanh</option>
            <option value="Vietnam Post">Vietnam Post</option>
          </select>
        </div>
        <div className="form-group">
          <label>Payment Method</label>
          <select
            className="form-control"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cod">COD</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Đặt Hàng
        </button>
      </form>
    </div>
  );
}

export default Checkout;

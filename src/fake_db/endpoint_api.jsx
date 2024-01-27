// Xem tất cả sản phẩm
fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) => console.log(data));

// Xem chi tiết sản phẩm
fetch("http://localhost:3000/products/1")
  .then((response) => response.json())
  .then((data) => console.log(data));

// Thêm sản phẩm vào giỏ hàng
fetch("http://localhost:3000/cart", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ productId: 1, quantity: 1 }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));

// Xóa sản phẩm khỏi giỏ hàng
fetch("http://localhost:3000/cart/1", { method: "DELETE" })
  .then((response) => response.json())
  .then((data) => console.log(data));

// Mua hàng
fetch("http://localhost:3000/purchase", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ cartItems: [{ productId: 1, quantity: 1 }] }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));

// Thay đổi số lượng sản phẩm trong giỏ hàng
fetch("http://localhost:3000/cart/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ quantity: 2 }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));

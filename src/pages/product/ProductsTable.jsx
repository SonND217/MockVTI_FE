import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import ProductService from "../../services/productService";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    form.resetFields();
    if (currentProduct) {
      form.setFieldsValue({
        ...currentProduct,
        images: currentProduct.images.join(", "),
      });
    }
  }, [currentProduct, form]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getProducts();
      setProducts(response.data.products);
    } catch (error) {
      notification.error({ message: "Error loading products" });
    }
    setLoading(false);
  };

  const addProduct = async (values) => {
    setLoading(true);
    try {
      const response = await ProductService.addProduct(values);
      setProducts([...products, response.data]);
      notification.success({ message: "Product added successfully" });
    } catch (error) {
      console.error("Error when adding product: ", error);
      notification.error({
        message: "Error adding product",
        description:
          error.response?.data?.message || error.message || "Unknown error",
      });
    }
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  const updateProduct = async (values) => {
    setLoading(true);
    try {
      await ProductService.updateProduct(currentProduct.id, values);
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id ? { ...p, ...values } : p
        )
      );
      notification.success({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Error when updating product: ", error);
      notification.error({
        message: "Error updating product",
        description: error.message || "Unknown error",
      });
    }
    setIsModalVisible(false);
    setCurrentProduct(null);
    form.resetFields();
    setLoading(false);
  };

  const handleAddOrUpdateProduct = async (values) => {
    if (currentProduct) {
      updateProduct(values);
    } else {
      addProduct(values);
    }
  };

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      await ProductService.deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      notification.success({ message: "Product deleted successfully" });
    } catch (error) {
      notification.error({ message: "Error deleting product" });
    }
    setLoading(false);
  };

  const openAddProductModal = () => {
    setCurrentProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const openEditProductModal = (product) => {
    setCurrentProduct(product);
    form.setFieldsValue({
      ...product,
      images: product.images.join(", "),
    });
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (!currentProduct) {
      form.resetFields();
    }
  }, [currentProduct, form]);

  const columns = [
    { title: "Name Product", dataIndex: "title", key: "title" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Discount",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            onClick={() => openEditProductModal(record)}
            style={{ marginRight: 8, color: "blue", width: 80 }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteProduct(record.id)}
            style={{ color: "red", width: 80 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Input
          placeholder="Search products by name"
          value={searchText}
          onChange={handleSearch}
          style={{ flex: 1, marginRight: 8 }} // Thêm một chút khoảng cách giữa input và nút
        />
        <Button onClick={openAddProductModal} type="primary">
          Add New Product
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredProducts}
        loading={loading}
      />

      <Modal
        title={`${currentProduct ? "Edit" : "Add"} Product`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddOrUpdateProduct} form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="discountPercentage" label="Discount Percentage">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="rating" label="Rating">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="stock" label="Stock">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="brand" label="Brand">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item
            name="thumbnail"
            label="Thumbnail URL"
            rules={[
              {
                required: true,
                message: "Please input the URL for the thumbnail!",
              },
              {
                pattern: new RegExp(".(jpg|jpeg|png|webp|avif|gif|svg)$"),
                message: "Please enter a valid URL!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="images"
            label="Image URLs"
            rules={[
              {
                required: true,
                message: "Please input the URL for the thumbnail!",
              },
              {
                pattern: new RegExp(".(jpg|jpeg|png|webp|avif|gif|svg)$"),
                message: "Please enter a valid URL!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentProduct ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsTable;

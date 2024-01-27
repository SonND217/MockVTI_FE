import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Upload,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  LoadingOutlined,
  PictureOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import instance from "../../services/axiosClient";
const { Option } = Select;

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [pagination.current, searchText]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:8088/api/v1/products",
        {
          params: {
            page: pagination.current,
            limit: pagination.pageSize,
            search: searchText,
          },
        }
      );
      setProducts(data.products);
      setPagination((prev) => ({
        ...prev,
        total: data.totalPages * pagination.pageSize,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Failed to load products.");
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8088/api/v1/categories",
        {
          params: {
            page: 1,
            limit: 30,
          },
        }
      );
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await instance.delete(`products/${productId}`);
      message.success("Product deleted successfully");
      console.log(response);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product.");
    }
  };
  // const handleDelete = async (productId) => {
  //   try {
  //     const accessToken = localStorage.getItem("token");
  //     console.log(accessToken);
  //     const response = await axios.delete(
  //       `http://localhost:8088/api/v1/products/${productId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     message.success("Product deleted successfully");
  //     console.log(response);
  //     fetchProducts();
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //     message.error("Failed to delete product.");
  //   }
  // };

  const handleAddOrUpdateProduct = async (values) => {
    setLoading(true);
    try {
      let productId;
      if (isEditing) {
        await instance.put(
          `http://localhost:8088/api/v1/products/${values.id}`,
          values
        );
        productId = values.id;
        message.success("Product updated successfully");
      } else {
        const { data } = await instance.post(
          "http://localhost:8088/api/v1/products",
          values
        );
        console.log("API Request - Add Product:", {
          url: "http://localhost:8088/api/v1/products",
          method: "POST",
          data: values,
        }); // Log the API request
        console.log("API Response - Add Product:", data); // Log the API response
        productId = data.id;
        message.success("Product added successfully");
      }

      if (fileList.length > 0) {
        await uploadImages(productId);
      }
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      message.error("Failed to save product.");
    } finally {
      setModalVisible(false);
      setIsEditing(false);
      form.resetFields();
      setFileList([]);
      setLoading(false);
    }
  };

  const uploadImages = async (productId) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    try {
      await instance.post(
        `http://localhost:8088/api/v1/products/uploads/${productId}`,
        formData
      );
      message.success("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error);
      message.error("Failed to upload images");
    }
  };

  const deleteImage = async (imageId) => {
    try {
      await instance.delete(
        `http://localhost:8088/api/v1/products/uploads/${imageId}`
      );
      message.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      message.error("Failed to delete image");
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setIsEditing(false);
    form.resetFields();
    setFileList([]);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category_id",
      key: "category_id",
      render: (category_id) => {
        const category = categories.find((cat) => cat.id === category_id);
        return category ? category.name : "";
      },
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail) => (
        <img src={thumbnail} alt="Thumbnail" style={{ maxWidth: "50px" }} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search products"
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        dataSource={products}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (newPage) => {
            setPagination({ ...pagination, current: newPage });
          },
        }}
      />

      <Button
        type="primary"
        onClick={() => {
          setModalVisible(true);
          setIsEditing(false);
        }}
      >
        Add Product
      </Button>

      <Modal
        title={isEditing ? "Edit Product" : "Add Product"}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddOrUpdateProduct} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please enter the product price" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter the product description",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Category ID"
            rules={[
              { required: true, message: "Please select the product category" },
            ]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Product Images">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
              onPreview={async (file) => {
                const previewUrl = await axios.get(
                  `http://localhost:8088/api/v1/products/uploads/${file.id}`
                );
                window.open(previewUrl, "_blank");
              }}
              onRemove={async (file) => {
                if (file.id) {
                  await deleteImage(file.id);
                }
              }}
            >
              {fileList.length < 5 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductTable;

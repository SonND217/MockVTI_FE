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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
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
      fetchImagesFromApi(data.products);
      setProducts(data.products);
      setPagination((prev) => ({
        ...prev,
        total: data.totalPages * pagination.pageSize,
      }));
    } catch (error) {
      console.error("Lỗi khi tải danh sách sản phẩm:", error);
      message.error("Không thể tải danh sách sản phẩm.");
    }
    setLoading(false);
  };

  const fetchImagesFromApi = async (products) => {
    const imagePromises = products.map(async (product) => {
      try {
        const response = await fetch(
          `http://localhost:8088/api/v1/products/images/${product.thumbnail}`
        );
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        return [product.id, imageUrl];
      } catch (error) {
        console.error(`Lỗi khi tải hình ảnh cho ${product.thumbnail}:`, error);
        return [product.id, "default-image-url"];
      }
    });

    try {
      const imagePairs = await Promise.all(imagePromises);
      const imageMap = Object.fromEntries(imagePairs);
      setProductImages(imageMap);
    } catch (error) {
      console.error("Lỗi khi tải hình ảnh:", error);
    }
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
      console.error("Lỗi khi tải danh mục:", error);
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
      message.success("Sản phẩm đã được xoá thành công");
      console.log(response);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi xoá sản phẩm:", error);
      message.error("Không thể xoá sản phẩm.");
    }
  };

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
        message.success("Sản phẩm đã được cập nhật thành công");
      } else {
        const { data } = await instance.post(
          "http://localhost:8088/api/v1/products",
          values
        );
        console.log("API Request - Thêm sản phẩm:", {
          url: "http://localhost:8088/api/v1/products",
          method: "POST",
          data: values,
        }); // Ghi log cho yêu cầu API
        console.log("API Response - Thêm sản phẩm:", data); // Ghi log cho phản hồi API
        productId = data.id;
        message.success("Sản phẩm đã được thêm thành công");
      }

      if (fileList.length > 0) {
        await uploadImages(productId);
      }
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
      message.error("Không thể lưu sản phẩm.");
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
      message.success("Hình ảnh đã được tải lên thành công");
    } catch (error) {
      console.error("Lỗi khi tải lên hình ảnh:", error);
      message.error("Không thể tải lên hình ảnh");
    }
  };

  const deleteImage = async (imageId) => {
    try {
      await instance.delete(
        `http://localhost:8088/api/v1/products/uploads/${imageId}`
      );
      message.success("Hình ảnh đã được xoá thành công");
    } catch (error) {
      console.error("Lỗi khi xoá hình ảnh:", error);
      message.error("Không thể xoá hình ảnh");
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

  // Sử dụng useEffect để lọc dữ liệu khi nội dung tìm kiếm thay đổi
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchText]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail, record) => {
        const imageUrl = productImages[record.id];
        return (
          <img
            src={imageUrl}
            alt={thumbnail}
            style={{ width: "100px", height: "100px" }}
          />
        );
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Danh mục",
      dataIndex: "category_id",
      key: "category_id",
      render: (category_id) => {
        const category = categories.find((cat) => cat.id === category_id);
        return category ? category.name : "";
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xoá sản phẩm này?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Xoá
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
          placeholder="Tìm sản phẩm"
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        dataSource={filteredProducts}
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
        Thêm sản phẩm
      </Button>

      <Modal
        title={isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
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
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả sản phẩm",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Danh mục"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn danh mục sản phẩm",
              },
            ]}
          >
            <Select placeholder="Chọn một danh mục">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Hình ảnh sản phẩm">
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
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductTable;

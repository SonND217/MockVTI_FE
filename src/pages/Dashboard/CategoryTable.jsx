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
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import instance from "../../services/axiosClient";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [pagination.current]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:8088/api/v1/categories",
        {
          params: {
            page: pagination.current,
            limit: pagination.pageSize,
          },
        }
      );
      setCategories(data);
      setPagination((prev) => ({
        ...prev,
        total: data.totalPages * pagination.pageSize,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Failed to load categories.");
    }
    setLoading(false);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (categoryId) => {
    try {
      await instance.delete(
        `http://localhost:8088/api/v1/categories/${categoryId}`
      );
      message.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Failed to delete category.");
    }
  };

  const handleAddOrUpdateCategory = async (values) => {
    setLoading(true);
    try {
      if (isEditing) {
        await instance.put(
          `http://localhost:8088/api/v1/categories/${values.id}`,
          values
        );
        message.success("Category updated successfully");
      } else {
        await instance.post("http://localhost:8088/api/v1/categories", values);
        message.success("Category added successfully");
      }
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      message.error("Failed to save category.");
    } finally {
      setModalVisible(false);
      setIsEditing(false);
      form.resetFields();
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setIsEditing(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
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
            Sửa danh mục này
          </Button>
          <Popconfirm
            title="Bạn chắc chắn muốn xoá danh mục này chứ?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Xoá danh mục này
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
          placeholder="Nhập tên danh mục cần tìm kiếm"
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        dataSource={categories.filter((category) =>
          category.name.toLowerCase().includes(searchText.toLowerCase())
        )}
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
        Thêm mới danh mục
      </Button>

      <Modal
        title={isEditing ? "Sửa danh mục" : "Thêm mới danh mục"}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleAddOrUpdateCategory}
          layout="vertical"
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[
              { required: true, message: "Hãy nhập tên danh mục vào đây" },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryTable;

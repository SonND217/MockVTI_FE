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
  DatePicker,
  Tag,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import instance from "../../services/axiosClient";

const { Option } = Select;

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 0,
    pageSize: 5,
  });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [pagination.current, searchText]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await instance.get(
        "http://localhost:8088/api/v1/orders/get-orders-by-keyword",
        {
          params: {
            page: pagination.current,
            limit: pagination.pageSize,
            keyword: searchText,
          },
        }
      );
      setOrders(data.orders);
      setPagination((prev) => ({
        ...prev,
        total: data.totalPages * pagination.pageSize - 1,
      }));
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      message.error("Không thể tải danh sách đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setModalVisible(true);
    form.setFieldsValue({
      ...record,
      order_date: moment(record.order_date),
    });
  };

  const handleDelete = async (orderId) => {
    try {
      await instance.delete(`http://localhost:8088/api/v1/orders/${orderId}`);
      message.success("Đơn hàng đã được xóa thành công");
      fetchOrders();
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      message.error("Không thể xóa đơn hàng.");
    }
  };

  const handleAddOrUpdateOrder = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        order_date: values.order_date.format("YYYY-MM-DD"),
      };
      if (isEditing) {
        await instance.put(
          `http://localhost:8088/api/v1/orders/${values.id}`,
          formattedValues
        );
        message.success("Đơn hàng đã được cập nhật thành công");
      }
      fetchOrders();
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error);
      message.error("Không thể lưu đơn hàng.");
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
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Họ và Tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ghi Chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Ngày Đặt Hàng",
      dataIndex: "order_date",
      key: "order_date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total_money",
      key: "total_money",
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Chỉnh Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa đơn hàng này không?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "blue";
      case "shipped":
        return "green";
      case "delivered":
        return "cyan";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm đơn hàng theo số điện thoại, họ tên, email, vv."
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        dataSource={orders}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={pagination}
        onChange={(pagination) => setPagination(pagination)}
      />

      <Modal
        title={isEditing ? "Chỉnh Sửa Đơn Hàng" : "Thêm Đơn Hàng Mới"}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddOrUpdateOrder} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="user_id" label="User ID">
            <Input />
          </Form.Item>
          <Form.Item name="fullname" label="Họ và Tên">
            <Input />
          </Form.Item>
          <Form.Item name="phone_number" label="Số Điện Thoại">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa Chỉ">
            <Input />
          </Form.Item>
          <Form.Item name="note" label="Ghi Chú">
            <Input />
          </Form.Item>
          <Form.Item name="order_date" label="Ngày Đặt Hàng">
            <DatePicker />
          </Form.Item>
          <Form.Item name="status" label="Trạng Thái">
            <Select>
              <Option value="pending">Chờ xử lý</Option>
              <Option value="processing">Đang xử lý</Option>
              <Option value="shipped">Đã giao hàng</Option>
              <Option value="delivered">Đã nhận hàng</Option>
              <Option value="cancelled">Đã hủy</Option>
            </Select>
          </Form.Item>
          <Form.Item name="total_money" label="Tổng Tiền">
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderTable;

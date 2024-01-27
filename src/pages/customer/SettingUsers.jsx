import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, notification } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import instance from "../../services/axiosClient";
import { getUserInfo } from "../../utils/helper";

const userInfo = getUserInfo();

const SettingUsers = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await instance.post(
          `http://localhost:8088/api/v1/users/details`
        );

        // Chuyển đổi giá trị timestamp sang đối tượng Date
        response.date_of_birth = response.date_of_birth
          ? new Date(response.date_of_birth)
          : null;

        setUser(response);
        form.setFieldsValue(response); // Set giá trị mặc định cho biểu mẫu
      } catch (error) {
        notification.error({ message: "Error loading user" });
      }
    };

    if (userInfo.id) {
      getUserDetail();
    }
  }, [userInfo.id, form]);

  const onFinish = async (values) => {
    // Chuyển đổi giá trị ngày tháng năm thành timestamp
    values.date_of_birth = values.date_of_birth
      ? values.date_of_birth.valueOf() // sử dụng `valueOf` để lấy giá trị timestamp
      : null;

    try {
      const response = await instance.put(
        `http://localhost:8088/api/v1/users/details/${userInfo.id}`,
        values
      );
      notification.success({ message: "User details updated successfully" });
    } catch (error) {
      notification.error({ message: "Error updating user details" });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <Card bordered={false} className="user-profile-card">
        <div className="user-details">
          <h3>Chỉnh sửa thông tin tài khoản</h3>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={user} // Truyền giá trị mặc định từ user vào biểu mẫu
          >
            <Form.Item name="date_of_birth" label="Date of Birth">
              <Input type="date" />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input />
            </Form.Item>
            <Form.Item name="phone_number" label="Phone Number">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default SettingUsers;

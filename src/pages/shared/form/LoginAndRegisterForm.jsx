import React, { useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Modal,
  Tabs,
  DatePicker,
} from "antd";
import authService from "../../../services/authService";
import "../../../style/LoginForm.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAccessToken } from "../../../utils/helper";

const { TabPane } = Tabs;

const LoginAndRegisterForm = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const [visible, setVisible] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const datePickerDisplayFormat = "DD/MM/YYYY";

  // nếu có access token thì điều hướng về trang home
  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  const onFinishLogin = async (values) => {
    try {
      const response = await authService.login({
        phone_number: values.phone_number,
        password: values.password,
      });
      // Lưu thông tin người dùng và token vào localStorage
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          id: response.id,
          username: response.username,
          roles: response.roles,
        })
      );
      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refresh_token);

      // Hiển thị thông báo đăng nhập thành công
      toast.success(response.message);
      setVisible(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onFinishRegister = async (values) => {
    try {
      const registrationData = {
        ...values,
        facebook_account_id: 0,
        google_account_id: 0,
        role_id: 1,
      };

      const response = await fetch(
        "http://localhost:8088/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Đăng ký tài khoản thành công");

        // Sử dụng thông tin người dùng từ form đăng ký để đăng nhập
        onFinishLogin({
          phone_number: values.phone_number,
          password: values.password,
        });
      } else {
        throw new Error(data.message || "Đăng ký không thành công");
      }
    } catch (error) {
      toast.error(error.message || "Đăng ký không thành công");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  // nhận dữ liệu và đổi từ DD/MM/YY sang "YYYY-MM-DD"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="container-login">
      <Button type="primary" onClick={showModal}>
        Đăng nhập / Đăng kí
      </Button>
      <Modal
        title="Login/Register"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Tabs activeKey={activeTabKey} onChange={onTabChange}>
          <TabPane tab="Login" key="1">
            {/* Form Login */}
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinishLogin}
            >
              <Form.Item
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Phone Number"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="#">
                  Forgot password
                </a>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Log in
                </Button>{" "}
                Or{" "}
                <Link to="#" onClick={() => onTabChange("2")}>
                  register now!
                </Link>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Register" key="2">
            {/* Form Register */}
            <Form
              name="register"
              onFinish={onFinishRegister}
              scrollToFirstError
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              labelAlign="left"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not a valid email address!",
                  },
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="fullname"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="retype_password"
                label="Retype Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please retype your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="date_of_birth"
                label="Date of Birth"
                rules={[
                  {
                    required: true,
                    message: "Please input your date of birth!",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format={datePickerDisplayFormat}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
                Or{" "}
                <Link to="#" onClick={() => onTabChange("1")}>
                  log in now!
                </Link>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default LoginAndRegisterForm;

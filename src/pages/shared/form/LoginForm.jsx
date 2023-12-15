import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import authService from "../../../services/authService";
import "../../../style/LoginForm.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAcessToken } from "../../../utils/helper";

const Login = () => {
  const navigate = useNavigate();
  const accessToken = getAcessToken();

  // nếu có access token thì điều hướng về trang home
  if (accessToken) {
    return <Navigate to="/" replace />;
  }
  const onFinish = async (values) => {
    try {
      const response = await authService.login({
        username: values.username,
        password: values.password,
      });

      // Hiển thị thông báo thành công
      toast.success("Login successful!");

      // Lưu thông tin người dùng và token vào localStorage
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          gender: response.gender,
          image: response.image,
        })
      );
      localStorage.setItem("token", response.token);

      // Điều hướng người dùng về trang chủ
      navigate("/");
    } catch (error) {
      // Hiển thị thông báo lỗi
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container-login">
      <Card title="LOGIN" bordered={false} className="card-login">
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
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

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;

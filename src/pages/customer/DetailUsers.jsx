import { Card, Avatar, Button, List, notification } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../../style/DetailUsers.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import instance from "../../services/axiosClient";

const DetailUsers = ({ userId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await instance.post(
          `http://localhost:8088/api/v1/users/details`
        );
        console.log(response);
        // setUser(response);
        const formattedDateOfBirth = new Date(
          response.date_of_birth
        ).toLocaleDateString();

        setUser({
          ...response,
          date_of_birth: formattedDateOfBirth,
        });
      } catch (error) {
        notification.error({ message: "Error loading user" });
      }
    };
    if (userId) {
      getUserDetail();
    }
  }, [userId]);

  const logOut = () => {
    localStorage.clear();
    navigate("/home");
  };
  console.log(user);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <Card bordered={false} className="user-profile-card">
        <div className="user-profile-header">
          {/* <Avatar size={120} src={user.image} className="user-profile-avatar" /> */}
        </div>
        <div className="user-details">
          <h3>Hồ sơ tài khoản</h3>
          <div className="user-details-section">
            <List>
              <List.Item>
                <CalendarOutlined
                  style={{ paddingRight: "20px", fontSize: "30px" }}
                />{" "}
                {user.fullname}
              </List.Item>
              <List.Item>
                <CalendarOutlined
                  style={{ paddingRight: "20px", fontSize: "30px" }}
                />{" "}
                {user.date_of_birth}
              </List.Item>
              <List.Item>
                <UserOutlined
                  style={{ paddingRight: "20px", fontSize: "30px" }}
                />{" "}
                {user.address}
              </List.Item>
              <List.Item>
                <PhoneOutlined
                  style={{ paddingRight: "20px", fontSize: "30px" }}
                />{" "}
                {user.phone_number}
              </List.Item>
              <List.Item>
                <HomeOutlined
                  style={{ paddingRight: "20px", fontSize: "30px" }}
                />{" "}
                {user.address}, {user.city}, {user.state} {user.postalCode}{" "}
              </List.Item>
              <List.Item>
                <MailOutlined
                  style={{ paddingRight: "20px", fontSize: "30px" }}
                />{" "}
                {user.email}
              </List.Item>
            </List>
          </div>
        </div>
        <Button className="button_logout" type="primary" onClick={logOut}>
          Log out
        </Button>
      </Card>
    </div>
  );
};

export default DetailUsers;

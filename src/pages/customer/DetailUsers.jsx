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
import userService from "../../services/userService";
import { useState, useEffect } from "react";

const DetailUsers = ({ userId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await userService.getUserByID(userId);
        setUser(response.data);
      } catch (error) {
        notification.error({ message: "Error loading user" });
      }
    };
    if (userId) {
      getUserDetail();
    }
  }, [userId]);

  console.log(userId);
  console.log(user);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <Card bordered={false} className="user-profile-card">
        <div className="user-profile-header">
          <Avatar size={120} src={user.image} className="user-profile-avatar" />
          <h2>
            {user.firstName} {user.lastName}
          </h2>
        </div>
        <div className="user-details">
          <h3>Contact Information</h3>
          <div className="user-details-section">
            <List>
              <List.Item>
                <CalendarOutlined
                  style={{ paddingRight: "20px", fontSize: "30px" }}
                />{" "}
                {user.birthDate}
              </List.Item>
              <List.Item>
                <UserOutlined
                  style={{ paddingRight: "20px", fontSize: "30px" }}
                />{" "}
                {user.gender}
              </List.Item>
              <List.Item>
                <PhoneOutlined
                  style={{ paddingRight: "20px", fontSize: "30px" }}
                />{" "}
                {user.phone}
              </List.Item>
              <List.Item>
                <HomeOutlined
                  style={{ paddingRight: "20px", fontSize: "30px" }}
                />{" "}
                {user.address.address}, {user.address.city},{" "}
                {user.address.state} {user.address.postalCode}
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

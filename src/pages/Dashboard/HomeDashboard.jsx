import { getUserInfo } from "../../utils/helper";
import DetailUsers from "../customer/DetailUsers";
import Topbar from "../../components/common/Topbar";
const HomeDashboard = () => {
  const userInfo = getUserInfo();

  console.log("user", userInfo);
  console.log(userInfo.username);
  return (
    <div>
      <h1>
        Chào mừng <span style={{ color: "blue" }}>{userInfo.username}</span>
      </h1>
      <h3>
        Đây là tài khoản của{" "}
        <span style={{ color: "GrayText" }}>
          {userInfo.roles == "ROLE_ADMIN" ? "Quản trị viên" : "Người dùng"}
        </span>
      </h3>
      <DetailUsers userId={userInfo.id} />
    </div>
  );
};

export default HomeDashboard;

import { getUserInfo } from "../../utils/helper";
import DetailUsers from "../customer/DetailUsers";

const Home = () => {
  const userInfo = getUserInfo();

  console.log("user", userInfo);
  console.log(userInfo.username);
  return (
    <div>
      <h1>
        Welcome <span style={{ color: "blue" }}>{userInfo.username}</span>
      </h1>
      <h3>
        This is account of{" "}
        <span style={{ color: "GrayText" }}>
          {userInfo.username === "kminchelle" ? "Admin" : "User"}
        </span>
      </h3>
      <DetailUsers userId={userInfo.id} />
    </div>
  );
};

export default Home;

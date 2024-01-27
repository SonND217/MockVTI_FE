import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/helper";

/* eslint-disable react/prop-types */
const PrivateRoute = ({ children }) => {
  const accessToken = getAccessToken();

  // nếu không có access token thì điều hướng về trang login
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  // return về trang layout
  return (
    <>
      {children} {/* <Layout /> */}
    </>
  );
};

export default PrivateRoute;
